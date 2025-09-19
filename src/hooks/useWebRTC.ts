
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, updateDoc, getDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
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

  const startCall = useCallback(async () => {
    if (!localStream || !callerId || !appointmentId) return;

    setupPeerConnection();
    if (!pc.current) return;

    const callDoc = doc(db, 'calls', appointmentId);
    
    pc.current.onicecandidate = async (event) => {
        if (event.candidate) {
            await fetch(`/api/calls/${appointmentId}/ice`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await user?.getIdToken()}` },
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
    
    const user = (await import('firebase/auth')).getAuth().currentUser;

    const response = await fetch(`/api/calls/${appointmentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await user?.getIdToken()}` },
        body: JSON.stringify({ offer, callerId }),
    });

    if (!response.ok) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to start the call.' });
        return;
    }


    const unsubscribe = onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!pc.current?.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.current?.setRemoteDescription(answerDescription);
      }
    });
    
    const calleeCandidates = collection(callDoc, 'calleeCandidates');
    const unsubscribeCandidates = onSnapshot(calleeCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                const candidate = new RTCIceCandidate(change.doc.data());
                pc.current?.addIceCandidate(candidate).catch(e => console.error("Error adding ICE candidate:", e));
            }
        });
    });
    
    return () => {
        unsubscribe();
        unsubscribeCandidates();
    }

  }, [appointmentId, setupPeerConnection, callerId, localStream, toast]);
  
  const joinCall = useCallback(async () => {
    if (!localStream || !appointmentId) return;
    setupPeerConnection();
    if (!pc.current) return;
    
    const user = (await import('firebase/auth')).getAuth().currentUser;

    const callDoc = doc(db, 'calls', appointmentId);
    
    pc.current.onicecandidate = async (event) => {
        if (event.candidate) {
            await fetch(`/api/calls/${appointmentId}/ice`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await user?.getIdToken()}` },
                body: JSON.stringify({ candidate: event.candidate.toJSON(), type: 'callee' }),
            });
        }
    };

    const callSnapshot = await getDoc(callDoc);
    
    if (callSnapshot.exists()) {
        const offerDescription = callSnapshot.data().offer;
        await pc.current.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answerDescription = await pc.current.createAnswer();
        await pc.current.setLocalDescription(answerDescription);

        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };

        await updateDoc(callDoc, { answer });
        
        const callerCandidates = collection(callDoc, 'callerCandidates');
        const unsubscribe = onSnapshot(callerCandidates, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.current?.addIceCandidate(candidate).catch(e => console.error("Error adding ICE candidate:", e));
                }
            });
        });
        return () => unsubscribe();
    } else {
        toast({ variant: 'destructive', title: 'Call not found', description: 'The other user may not have started the call yet.'})
    }
  }, [appointmentId, setupPeerConnection, localStream, toast]);

  const hangUp = useCallback(async () => {
    if (cleanupPerformed.current) return;
    cleanupPerformed.current = true;

    localStream?.getTracks().forEach((track) => track.stop());
    pc.current?.close();

    if (appointmentId) {
        try {
            const callDoc = doc(db, 'calls', appointmentId);
            const callSnap = await getDoc(callDoc);

            if (callSnap.exists()) {
                const callerCandidates = await getDocs(collection(callDoc, 'callerCandidates'));
                callerCandidates.forEach(async (candidate) => await deleteDoc(candidate.ref));
                
                const calleeCandidates = await getDocs(collection(callDoc, 'calleeCandidates'));
                calleeCandidates.forEach(async (candidate) => await deleteDoc(candidate.ref));
                
                await deleteDoc(callDoc);
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
