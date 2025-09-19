
"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mic, MicOff, Video, VideoOff, PhoneOff, User, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VideoCall() {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use video call features.',
        });
      }
    };

    getCameraPermission();
    
    // Cleanup function to stop media tracks when component unmounts
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }

  }, [toast]);


  return (
    <div className="flex flex-col h-full bg-gray-900 text-white rounded-lg overflow-hidden">
      <div className="flex-1 relative flex items-center justify-center">
        {/* Remote participant view */}
        <div className="absolute inset-0 bg-black flex items-center justify-center">
           <Avatar className="h-48 w-48 border-4 border-gray-700">
                <AvatarImage src="https://placehold.co/192x192.png" alt="Doctor" data-ai-hint="male doctor" />
                <AvatarFallback className="text-6xl bg-gray-800 text-gray-500">DE</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-4 left-4 bg-black/50 p-2 rounded-lg">
                Dr. Darren Elder
            </div>
        </div>
        
        {/* Local participant view (PiP) */}
        <Card className="absolute top-4 right-4 w-48 h-36 bg-black border-2 border-gray-700 overflow-hidden">
          <CardContent className="p-0 h-full">
            {hasCameraPermission ? (
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted />
            ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <User className="h-16 w-16 text-gray-600"/>
                </div>
            )}
            <div className="absolute bottom-1 left-2 bg-black/50 p-1 rounded-md text-xs">You</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm p-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
            <div className="flex items-center gap-2">
                <div className="text-center">
                    <p className="font-semibold">In call with Dr. Darren Elder</p>
                    <p className="text-sm text-gray-400">10:23 minutes</p>
                </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20" onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20" onClick={() => setIsCameraOff(!isCameraOff)}>
                    {isCameraOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
                </Button>
                 <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                    <Plus className="h-6 w-6" />
                </Button>
                <Button variant="destructive" size="icon" className="rounded-full h-12 w-12">
                    <PhoneOff className="h-6 w-6" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
