"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mic, MicOff, PhoneOff, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import type { Appointment } from '@/lib/types';
import { Skeleton } from "@/components/ui/skeleton";
import { useWebRTC } from '@/hooks/useWebRTC';

export default function VoiceCall() {
  const [isMuted, setIsMuted] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  const remoteAudioRef = useRef<HTMLAudioElement>(null);

  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, role } = useAuth();
  const appointmentId = searchParams.get('appointmentId') || '';

  const { remoteStream, startOrJoin, hangUp, isConnected } = useWebRTC(appointmentId, localStream, user?.uid || '', { video: false });

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
    if (user) {
      fetchAppointment();
    }
  }, [appointmentId, user, toast]);

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
        setLocalStream(mediaStream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast({
          variant: 'destructive',
          title: 'Microphone Access Denied',
          description: 'Please enable microphone permissions in your browser settings.',
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
    if (remoteStream && remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isConnected) {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isConnected]);

  useEffect(() => {
    if (!localStream || !appointment || !user || !appointmentId) return;
    
    startOrJoin().then(status => {
      if (status === 'idle') {
        toast({
          variant: 'destructive',
          title: 'Call not ready',
          description: 'Could not start or join the call. Please check microphone permissions and try again.',
        });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStream, appointment, user, appointmentId, startOrJoin, toast]);

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(prev => !prev);
    }
  };
  
  const handleEndCall = useCallback(() => {
    hangUp();
    const redirectPath = role === 'doctor' ? '/doctor/appointments' : '/patients/appointments';
    router.push(redirectPath);
  }, [hangUp, role, router]);
  
  useEffect(() => {
    const cleanup = () => {
      hangUp();
    };
    window.addEventListener('beforeunload', cleanup);
    return () => {
      window.removeEventListener('beforeunload', cleanup);
      cleanup();
    };
  }, [hangUp]);

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
        <div className="flex flex-col h-full bg-gray-900 text-white rounded-lg overflow-hidden items-center justify-center">
            <Skeleton className="h-48 w-48 rounded-full bg-gray-700" />
            <div className="mt-8 space-y-2 text-center">
                <Skeleton className="h-8 w-48 bg-gray-700" />
                <Skeleton className="h-5 w-24 bg-gray-700" />
            </div>
        </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white rounded-lg overflow-hidden">
      <audio ref={remoteAudioRef} autoPlay />
      <div className="flex-1 relative flex flex-col items-center justify-center space-y-8 p-4">
        <Avatar className="h-48 w-48 border-4 border-gray-700">
            <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} data-ai-hint={otherParticipant.hint} />
            <AvatarFallback className="text-6xl bg-gray-800 text-gray-500">{otherParticipant.name?.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="text-center">
            <h2 className="text-3xl font-bold">{otherParticipant.name || "Participant"}</h2>
            <p className="text-gray-400">{isConnected ? "Connected" : "Ringing..."}</p>
        </div>
        <p className="text-lg text-gray-300">{formatDuration(callDuration)}</p>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm p-4">
        <div className="flex justify-center items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full h-16 w-16 bg-white/10 hover:bg-white/20" onClick={toggleMute}>
                {isMuted ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
            </Button>
            <Button variant="destructive" size="icon" className="rounded-full h-16 w-16" onClick={handleEndCall}>
                <PhoneOff className="h-8 w-8" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full h-16 w-16 bg-white/10 hover:bg-white/20">
                <Plus className="h-8 w-8" />
            </Button>
        </div>
      </div>
    </div>
  );
}