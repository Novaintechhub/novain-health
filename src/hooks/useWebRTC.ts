"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { useToast } from '@/hooks/use-toast';

type WebRTCOptions = {
  video: boolean;
};

const servers: RTCConfiguration = {
  iceServers: [
    { urls: ['stun:stun.l.google.com:19302'] },
    ...(process.env.NEXT_PUBLIC_TURN_URL
      ? [{
          urls: process.env.NEXT_PUBLIC_TURN_URL as string,
          username: process.env.NEXT_PUBLIC_TURN_USERNAME as string,
          credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL as string,
        } as RTCIceServer]
      : []),
  ],
  iceCandidatePoolSize: 10,
};

export const useWebRTC = (
  appointmentId: string,
  localStream: MediaStream | null,
  callerId: string,
  _options: WebRTCOptions = { video: true }
) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isCaller, setIsCaller] = useState<boolean | null>(null);

  const pc = useRef<RTCPeerConnection | null>(null);
  const cleanupPerformed = useRef(false);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const ensurePC = useCallback(() => {
    if (pc.current) return;

    pc.current = new RTCPeerConnection(servers);

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.current?.addTrack(track, localStream);
      });
    }

    pc.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };
    
    pc.current.onconnectionstatechange = () => {
        const state = pc.current?.connectionState;
        if (state === 'connected') {
            setIsConnected(true);
            // Once connected, stop polling
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        } else if (['disconnected', 'failed', 'closed'].includes(state || '')) {
            setIsConnected(false);
        }
    }

  }, [localStream]);

  const pollForUpdates = useCallback(async (callerPerspective: boolean) => {
    const user = getAuth().currentUser;
    if (!user || !pc.current) return;
    
    try {
        const idToken = await user.getIdToken();
        const res = await fetch(`/api/calls/${appointmentId}/poll`, {
            headers: { 'Authorization': `Bearer ${idToken}` },
            cache: 'no-store',
        });
        if (!res.ok) return;

        const { answer, candidates } = await res.json();
        
        // Caller receives the answer from the callee
        if (callerPerspective && answer && !pc.current.currentRemoteDescription) {
            await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
        }
        
        // Both sides add ICE candidates from the other party
        if (Array.isArray(candidates)) {
            for (const c of candidates) {
                try {
                   await pc.current.addIceCandidate(new RTCIceCandidate(c));
                } catch(e) { console.warn('addIceCandidate failed', e); }
            }
        }

    } catch(e) {
      console.error('pollForUpdates error:', e);
    }
  }, [appointmentId]);


  const startCall = useCallback(async (): Promise<boolean> => {
    if (!localStream || !callerId || !appointmentId) return false;

    ensurePC();
    if (!pc.current) return false;

    const user = getAuth().currentUser;
    if (!user) return false;

    pc.current.onicecandidate = async (event) => {
      if (event.candidate) {
        const idToken = await user.getIdToken();
        await fetch(`/api/calls/${appointmentId}/ice`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
            body: JSON.stringify({ candidate: event.candidate.toJSON(), type: 'caller' }),
        }).catch(() => {});
      }
    };

    try {
        const offerDescription = await pc.current.createOffer();
        await pc.current.setLocalDescription(offerDescription);

        const offer = { sdp: offerDescription.sdp!, type: offerDescription.type };
        
        const idToken = await user.getIdToken();
        const response = await fetch(`/api/calls/${appointmentId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
            body: JSON.stringify({ offer, callerId }),
        });

        if (!response.ok) {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to start the call.' });
            return false;
        }

        setIsCaller(true);
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = setInterval(() => pollForUpdates(true), 3000);
        return true;
    } catch (e) {
        console.error('startCall error:', e);
        return false;
    }

  }, [appointmentId, callerId, ensurePC, localStream, pollForUpdates, toast]);
  
  const joinCall = useCallback(async (): Promise<boolean> => {
    if (!localStream || !appointmentId) return false;

    ensurePC();
    if (!pc.current) return false;
    
    const user = getAuth().currentUser;
    if (!user) return false;

    pc.current.onicecandidate = async (event) => {
      if (event.candidate) {
        const idToken = await user.getIdToken();
        await fetch(`/api/calls/${appointmentId}/ice`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
            body: JSON.stringify({ candidate: event.candidate.toJSON(), type: 'callee' }),
        }).catch(() => {});
      }
    };
    
    try {
        const callDocRef = doc(db, 'calls', appointmentId);
        const callSnapshot = await getDoc(callDocRef);
        
        if (!callSnapshot.exists()) {
            return false;
        }

        const offerDescription = callSnapshot.data().offer;
        if (!offerDescription) return false;

        if (pc.current.signalingState !== 'stable') {
            await pc.current.setLocalDescription(null);
            await pc.current.setRemoteDescription(new RTCSessionDescription(offerDescription));
        } else {
             await pc.current.setRemoteDescription(new RTCSessionDescription(offerDescription));
        }

        if (pc.current.signalingState === 'have-remote-offer') {
            const answerDescription = await pc.current.createAnswer();
            await pc.current.setLocalDescription(answerDescription);

            const answer = { type: answerDescription.type, sdp: answerDescription.sdp! };
            // Update call status to connected to stop notifications
            await updateDoc(callDocRef, { answer, status: 'connected' });
        } else {
             console.warn(`joinCall: Cannot create answer in state ${pc.current.signalingState}`);
             return false;
        }

        setIsCaller(false);
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = setInterval(() => pollForUpdates(false), 3000);
        return true;
    } catch (e) {
        console.error('joinCall error:', e);
        return false;
    }
  }, [appointmentId, ensurePC, localStream, pollForUpdates]);

  const startOrJoin = useCallback(async () => {
    const joined = await joinCall();
    if (joined) return 'joined';
    const started = await startCall();
    if (started) return 'started';
    return 'idle';
  }, [joinCall, startCall]);

  const hangUp = useCallback(async () => {
    if (cleanupPerformed.current) return;
    cleanupPerformed.current = true;
    
    if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
    }
    
    localStream?.getTracks().forEach(track => track.stop());
    pc.current?.close();

    if (appointmentId) {
      try {
        const callDocRef = doc(db, 'calls', appointmentId);
        const callSnap = await getDoc(callDocRef);

        if (callSnap.exists()) {
          const callerCandidates = await getDocs(collection(callDocRef, 'callerCandidates'));
          for (const c of callerCandidates.docs) await deleteDoc(c.ref);

          const calleeCandidates = await getDocs(collection(callDocRef, 'calleeCandidates'));
          for (const c of calleeCandidates.docs) await deleteDoc(c.ref);

          await deleteDoc(callDocRef);
        }
      } catch (error) {
        console.warn("hangUp cleanup:", error);
      }
    }
    
    setRemoteStream(null);
    pc.current = null;
    setIsCaller(null);
    setIsConnected(false);
  }, [appointmentId, localStream]);

  return { remoteStream, isConnected, isCaller, startCall, joinCall, startOrJoin, hangUp };
};
