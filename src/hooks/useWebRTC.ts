
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, setDoc, updateDoc, getDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export const useWebRTC = (appointmentId: string, localStream: MediaStream | null, callerId: string) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const pc = useRef<RTCPeerConnection | null>(null);

  const setupPeerConnection = useCallback(() => {
    pc.current = new RTCPeerConnection(servers);

    localStream?.getTracks().forEach((track) => {
      pc.current?.addTrack(track, localStream);
    });

    pc.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    pc.current.onicecandidate = async (event) => {
      if (event.candidate) {
        const callDoc = doc(db, 'calls', appointmentId);
        const candidatesCollection = collection(callDoc, 'callerCandidates');
        await addDoc(candidatesCollection, event.candidate.toJSON());
      }
    };

  }, [localStream, appointmentId]);

  const startCall = useCallback(async () => {
    if (!pc.current) {
        setupPeerConnection();
    }
    
    const callDoc = doc(db, 'calls', appointmentId);
    const offerDescription = await pc.current?.createOffer();
    await pc.current?.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription?.sdp,
      type: offerDescription?.type,
    };

    await setDoc(callDoc, { offer, callerId });

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!pc.current?.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.current?.setRemoteDescription(answerDescription);
      }
    });
    
    const calleeCandidates = collection(callDoc, 'calleeCandidates');
    onSnapshot(calleeCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                const candidate = new RTCIceCandidate(change.doc.data());
                pc.current?.addIceCandidate(candidate);
            }
        });
    });

  }, [appointmentId, setupPeerConnection, callerId]);
  
  const joinCall = useCallback(async () => {
    if (!pc.current) {
        setupPeerConnection();
    }
    
    const callDoc = doc(db, 'calls', appointmentId);
    const callSnapshot = await getDoc(callDoc);
    
    if (callSnapshot.exists()) {
        const offerDescription = callSnapshot.data().offer;
        await pc.current?.setRemoteDescription(new RTCSessionDescription(offerDescription));

        const answerDescription = await pc.current?.createAnswer();
        await pc.current?.setLocalDescription(answerDescription);

        const answer = {
            type: answerDescription?.type,
            sdp: answerDescription?.sdp,
        };

        await updateDoc(callDoc, { answer });
        
        const callerCandidates = collection(callDoc, 'callerCandidates');
        onSnapshot(callerCandidates, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const candidate = new RTCIceCandidate(change.doc.data());
                    pc.current?.addIceCandidate(candidate);
                }
            });
        });

        // Listen for remote ICE candidates
        pc.current.onicecandidate = async (event) => {
            if (event.candidate) {
                const calleeCandidates = collection(callDoc, 'calleeCandidates');
                await addDoc(calleeCandidates, event.candidate.toJSON());
            }
        };
    }
  }, [appointmentId, setupPeerConnection]);

  const hangUp = useCallback(async () => {
    pc.current?.close();
    localStream?.getTracks().forEach((track) => track.stop());

    if (appointmentId) {
        const callDoc = doc(db, 'calls', appointmentId);
        const callerCandidates = await getDocs(collection(callDoc, 'callerCandidates'));
        callerCandidates.forEach(async (candidate) => await deleteDoc(candidate.ref));
        
        const calleeCandidates = await getDocs(collection(callDoc, 'calleeCandidates'));
        calleeCandidates.forEach(async (candidate) => await deleteDoc(candidate.ref));

        await deleteDoc(callDoc);
    }
    setRemoteStream(null);
  }, [appointmentId, localStream]);

  return { remoteStream, startCall, joinCall, hangUp };
};
