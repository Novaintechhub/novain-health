"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, User, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import type { Appointment } from '@/lib/types';
import { Skeleton } from "@/components/ui/skeleton";
import { useWebRTC } from '@/hooks/useWebRTC';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function VideoCall() {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [hasMediaPermission, setHasMediaPermission] = useState<boolean | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, role } = useAuth();
  const appointmentId = searchParams.get('appointmentId') || '';

  const { remoteStream, startOrJoin, hangUp, isConnected } =
    useWebRTC(appointmentId, localStream, user?.uid || '', { video: true });

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!appointmentId || !user) {
        setLoading(false);
        return;
      }
      try {
        const idToken = await user.getIdToken();
        const response = await fetch(`/api/appointments/${appointmentId}`, {
          headers: { 'Authorization': `Bearer ${idToken}` }
        });
        if (!response.ok) throw new Error("Failed to fetch appointment details.");
        const data = await response.json();
        setAppointment(data);
      } catch (error: any) {
        toast({ variant: "destructive", title: "Error", description: error.message });
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchAppointment();
  }, [appointmentId, user, toast]);

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        });
        setLocalStream(mediaStream);
        setHasMediaPermission(true);
      } catch (error) {
        console.error('Error accessing media devices:', error);
        setHasMediaPermission(false);
        toast({
          variant: 'destructive',
          title: 'Media Access Denied',
          description: 'Please enable camera and microphone permissions in your browser settings to use video call features.',
        });
      }
    };

    getMediaStream();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    if (isConnected) {
      setIsCallActive(true);
    }
  }, [isConnected]);

  useEffect(() => {
    if (isCallActive) {
      const timer = setInterval(() => setCallDuration(prev => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isCallActive]);

  // ★ Initiator-agnostic start: whoever opens first becomes caller; the other joins
  useEffect(() => {
    const go = async () => {
      if (!localStream || !appointment || !user || !appointmentId) return;

      // Try to join if an offer exists, else start as caller
      const status = await startOrJoin();

      if (status === 'idle') {
        toast({
          variant: 'destructive',
          title: 'Call not ready',
          description: 'Could not start or join the call. Check media permissions and try again.',
        });
      }
    };
    go();
  }, [localStream, appointment, user, appointmentId, startOrJoin, toast]);

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleCamera = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsCameraOff(!isCameraOff);
    }
  };

  const handleEndCall = useCallback(() => {
    hangUp();
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    const redirectPath = role === 'doctor' ? '/doctor/appointments' : '/patients/appointments';
    router.push(redirectPath);
  }, [hangUp, role, router, localStream]);

  // Clean up on unmount or tab close
  useEffect(() => {
    const cleanup = () => {
      hangUp();
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
    window.addEventListener('beforeunload', cleanup);
    return () => {
      window.removeEventListener('beforeunload', cleanup);
      cleanup();
    };
  }, [hangUp, localStream]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  const otherParticipant = role === 'doctor'
    ? { name: appointment?.patientName, avatar: appointment?.patientAvatar, hint: appointment?.patientAvatarHint }
    : { name: appointment?.doctorName, avatar: appointment?.doctorAvatar, hint: appointment?.doctorAvatarHint };

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-gray-900 text-white rounded-lg overflow-hidden">
        <div className="flex-1 relative flex items-center justify-center">
          <Skeleton className="h-48 w-48 rounded-full bg-gray-700" />
        </div>
        <div className="bg-gray-800/50 p-4">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <div className="space-y-2">
              <Skeleton className="h-5 w-48 bg-gray-700" />
              <Skeleton className="h-4 w-24 bg-gray-700" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
              <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
              <Skeleton className="h-12 w-12 rounded-full bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white rounded-lg overflow-hidden">
      <div className="flex-1 relative flex items-center justify-center">
        {/* Remote participant view */}
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          {remoteStream ? (
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-48 w-48 border-4 border-gray-700">
                <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} data-ai-hint={otherParticipant.hint} />
                <AvatarFallback className="text-6xl bg-gray-800 text-gray-500">
                  {otherParticipant.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <p className="text-gray-400 text-lg">Waiting for {otherParticipant.name || "Participant"} to join...</p>
            </div>
          )}
          <div className="absolute bottom-4 left-4 bg-black/50 p-2 rounded-lg">
            {otherParticipant.name || "Participant"}
          </div>
        </div>

        {/* Local participant view (PiP) */}
        <Card className="absolute top-4 right-4 w-48 h-36 bg-black border-2 border-gray-700 overflow-hidden">
          <CardContent className="p-0 h-full">
            {(isCameraOff || !hasMediaPermission) ? (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <User className="h-16 w-16 text-gray-600" />
              </div>
            ) : (
              <video ref={localVideoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            )}
            {hasMediaPermission === false && (
              <div className="absolute inset-0 w-full h-full bg-black/70 flex items-center justify-center text-center p-2">
                <p className="text-xs text-destructive-foreground">Permission denied</p>
              </div>
            )}
            <div className="absolute bottom-1 left-2 bg-black/50 p-1 rounded-md text-xs">You</div>
          </CardContent>
        </Card>

        {hasMediaPermission === false && (
          <Alert variant="destructive" className="absolute top-4 left-4 max-w-sm">
            <AlertTitle>Camera and Microphone Access Required</AlertTitle>
            <AlertDescription>
              Please allow camera and microphone access in your browser settings to use the video call feature.
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm p-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="text-center">
              <p className="font-semibold">In call with {otherParticipant.name || "Participant"}</p>
              <p className="text-sm text-gray-400">{formatDuration(callDuration)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20" onClick={toggleMute}>
              {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20" onClick={toggleCamera}>
              {isCameraOff ? <VideoOff className="h-6 w-6" /> : <VideoIcon className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
              <Plus className="h-6 w-6" />
            </Button>
            <Button variant="destructive" size="icon" className="rounded-full h-12 w-12" onClick={handleEndCall}>
              <PhoneOff className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
