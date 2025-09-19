
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, getDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useToast } from './use-toast';

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

type WebRTCOptions = {
  video: boolean;
};

export const useWebRTC = (appointmentId: string, localStream: MediaStream | null, callerId: string, options: WebRTCOptions = { video: true }) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const pc = useRef<RTCPeerConnection | null>(null);
  const cleanupPerformed = useRef(false);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const setupPeerConnection = useCallback(() => {
    if (pc.current) return;
    
    pc.current = new RTCPeerConnection(servers);
    
    if (localStream) {
        localStream.getTracks().forEach((track) => {
          pc.current?.addTrack(track, localStream);
        });
    }

    pc.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        setIsConnected(true);
    };

    pc.current.onconnectionstatechange = () => {
      if(pc.current?.connectionState === 'disconnected' || pc.current?.connectionState === 'failed' || pc.current?.connectionState === 'closed') {
        setIsConnected(false);
      }
    }

  }, [localStream]);

  const pollForUpdates = useCallback(async (isCaller: boolean) => {
      const user = getAuth().currentUser;
      if (!user) return;
      
      const idToken = await user.getIdToken();
      const response = await fetch(`/api/calls/${appointmentId}/poll`, {
        headers: { 'Authorization': `Bearer ${idToken}` }
      });
      
      if (!response.ok) return;

      const { answer, candidates } = await response.json();

      if (!pc.current) return;

      if (isCaller && !pc.current.currentRemoteDescription && answer) {
          await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
      }

      candidates.forEach((candidate: RTCIceCandidateInit) => {
          pc.current?.addIceCandidate(new RTCIceCandidate(candidate));
      });

  }, [appointmentId]);


  const startCall = useCallback(async () => {
    if (!localStream || !callerId || !appointmentId) return;

    setupPeerConnection();
    if (!pc.current) return;
    
    const user = getAuth().currentUser;
    if (!user) return;

    pc.current.onicecandidate = async (event) => {
        if (event.candidate) {
            await fetch(`/api/calls/${appointmentId}/ice`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await user.getIdToken()}` },
                body: JSON.stringify({ candidate: event.candidate.toJSON(), type: 'caller' }),
            });
        }
    };
    
    const offerDescription = await pc.current.createOffer();
    await pc.current.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    const response = await fetch(`/api/calls/${appointmentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await user.getIdToken()}` },
        body: JSON.stringify({ offer, callerId }),
    });

    if (!response.ok) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to start the call.' });
        return;
    }

    pollIntervalRef.current = setInterval(() => pollForUpdates(true), 3000);

  }, [appointmentId, setupPeerConnection, callerId, localStream, toast, pollForUpdates]);
  
  const joinCall = useCallback(async () => {
    if (!localStream || !appointmentId) return;
    setupPeerConnection();
    if (!pc.current) return;
    
    const user = getAuth().currentUser;
    if (!user) return;

    pc.current.onicecandidate = async (event) => {
        if (event.candidate) {
            await fetch(`/api/calls/${appointmentId}/ice`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await user.getIdToken()}` },
                body: JSON.stringify({ candidate: event.candidate.toJSON(), type: 'callee' }),
            });
        }
    };

    const callDocRef = doc(db, 'calls', appointmentId);
    const callSnapshot = await getDoc(callDocRef);
    
    if (callSnapshot.exists()) {
        const offerDescription = callSnapshot.data().offer;
        await pc.current.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answerDescription = await pc.current.createAnswer();
        await pc.current.setLocalDescription(answerDescription);

        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await updateDoc(callDocRef, { answer });
        
        pollIntervalRef.current = setInterval(() => pollForUpdates(false), 3000);
    } else {
        toast({ variant: 'destructive', title: 'Call not found', description: 'The other user may not have started the call yet.'})
    }
  }, [appointmentId, setupPeerConnection, localStream, toast, pollForUpdates]);

  const hangUp = useCallback(async () => {
    if (cleanupPerformed.current) return;
    cleanupPerformed.current = true;
    
    if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
    }

    localStream?.getTracks().forEach((track) => track.stop());
    pc.current?.close();

    if (appointmentId) {
        try {
            const callDocRef = doc(db, 'calls', appointmentId);
            const callSnap = await getDoc(callDocRef);

            if (callSnap.exists()) {
                const callerCandidates = await getDocs(collection(callDocRef, 'callerCandidates'));
                callerCandidates.forEach(async (candidate) => await deleteDoc(candidate.ref));
                
                const calleeCandidates = await getDocs(collection(callDocRef, 'calleeCandidates'));
                calleeCandidates.forEach(async (candidate) => await deleteDoc(candidate.ref));
                
                await deleteDoc(callDocRef);
            }
        } catch (error) {
            console.error("Error during hangup cleanup:", error);
        }
    }
    
    setRemoteStream(null);
    pc.current = null;
  }, [appointmentId, localStream]);

  return { remoteStream, isConnected, startCall, joinCall, hangUp };
};
