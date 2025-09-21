
"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
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
  const lastSeenWatermark = useRef<number>(Date.now() - 10_000); // for /poll?since=
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
      // Use the first stream (typical SFU/mesh)
      setRemoteStream(event.streams[0]);
      setIsConnected(true);
    };

    pc.current.onconnectionstatechange = () => {
      const s = pc.current?.connectionState;
      if (s === 'connected' || s === 'completed') setIsConnected(true);
      if (s === 'disconnected' || s === 'failed' || s === 'closed') setIsConnected(false);
    };
  }, [localStream]);

  const pollForUpdates = useCallback(async (callerPerspective: boolean) => {
    const user = getAuth().currentUser;
    if (!user || !pc.current) return;

    try {
      const idToken = await user.getIdToken();
      const res = await fetch(`/api/calls/${appointmentId}/poll?since=${lastSeenWatermark.current}`, {
        headers: { 'Authorization': `Bearer ${idToken}` },
        cache: 'no-store',
      });
      if (!res.ok) return;

      const { answer, candidates } = await res.json();

      // Caller receives answer
      if (callerPerspective && answer && !pc.current.currentRemoteDescription) {
        await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
      }

      // Both sides consume the other party's ICE
      if (Array.isArray(candidates)) {
        for (const c of candidates) {
          try {
            await pc.current.addIceCandidate(new RTCIceCandidate(c));
          } catch (e) {
            console.warn('addIceCandidate failed', e);
          }
        }
      }
      lastSeenWatermark.current = Date.now();
    } catch (e) {
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
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          },
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
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
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
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          },
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

      // Check state before setting remote description
      if (pc.current.signalingState !== 'stable') {
          console.log('joinCall: Connection not stable, cannot join yet.');
          return false;
      }

      await pc.current.setRemoteDescription(new RTCSessionDescription(offerDescription));

      // Check state before creating answer
      if (pc.current.signalingState === 'have-remote-offer') {
          const answerDescription = await pc.current.createAnswer();
          await pc.current.setLocalDescription(answerDescription);

          const answer = { type: answerDescription.type, sdp: answerDescription.sdp! };
          await updateDoc(callDocRef, { answer });
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

  /**
   * Initiate or join depending on whether the call doc exists.
   * Whoever arrives first becomes caller; the other joins.
   */
  const startOrJoin = useCallback(async () => {
    // Try to join first (if an offer already exists)
    const joined = await joinCall();
    if (joined) return 'joined';

    // Otherwise, become the caller
    const started = await startCall();
    if (started) return 'started';

    // If neither worked, let the UI handle it (permissions, etc.)
    return 'idle';
  }, [joinCall, startCall]);

  const hangUp = useCallback(async () => {
    if (cleanupPerformed.current) return;
    cleanupPerformed.current = true;

    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }

    localStream?.getTracks().forEach((t) => t.stop());
    pc.current?.close();

    // Caller cleans up the call doc; callee tries as well but may no-op if already removed.
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
        // Ignore—other side may have cleaned up.
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
