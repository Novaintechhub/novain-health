
"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mic, MicOff, PhoneOff, User, Plus } from "lucide-react";

export default function VoiceCall() {
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white rounded-lg overflow-hidden">
      <div className="flex-1 relative flex flex-col items-center justify-center space-y-8 p-4">
        <Avatar className="h-48 w-48 border-4 border-gray-700">
            <AvatarImage src="https://placehold.co/192x192.png" alt="Dr. User" data-ai-hint="doctor portrait" />
            <AvatarFallback className="text-6xl bg-gray-800 text-gray-500">DU</AvatarFallback>
        </Avatar>
        <div className="text-center">
            <h2 className="text-3xl font-bold">Dr. User</h2>
            <p className="text-gray-400">Ringing...</p>
        </div>
        <p className="text-lg text-gray-300">{formatDuration(callDuration)}</p>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm p-4">
        <div className="flex justify-center items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full h-16 w-16 bg-white/10 hover:bg-white/20" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
            </Button>
            <Button variant="destructive" size="icon" className="rounded-full h-16 w-16">
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
