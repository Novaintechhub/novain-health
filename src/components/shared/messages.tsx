
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Mic, Send, Bookmark, Phone, Video, ArrowLeft, Play, X, File as FileIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { Appointment } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useChat } from "@/hooks/useChat";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import { cn } from "@/lib/utils";

type Attachment = {
  file: File;
  previewUrl: string;
};

export default function Messages() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('appointmentId');
  const { user, role } = useAuth();
  const { toast } = useToast();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loadingAppointment, setLoadingAppointment] = useState(true);
  
  const { messages, loading: loadingMessages, error, sendMessage } = useChat(appointmentId);
  
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!appointmentId || !user) {
        setLoadingAppointment(false);
        return;
      }
      try {
        setLoadingAppointment(true);
        const idToken = await user.getIdToken();
        const response = await fetch(`/api/appointments/${appointmentId}`, {
          headers: { 'Authorization': `Bearer ${idToken}` }
        });
        if (!response.ok) throw new Error("Failed to fetch appointment details.");
        const data = await response.json();
        setAppointment(data);
      } catch (err: any) {
        toast({ variant: "destructive", title: "Error", description: err.message });
      } finally {
        setLoadingAppointment(false);
      }
    };
    if (user) fetchAppointment();
  }, [appointmentId, user, toast]);

  const handleSendMessage = async () => {
    if (!appointmentId || isSending) return;
    if (newMessage.trim() || attachment || audioBlob) {
        setIsSending(true);
        const success = await sendMessage({
            text: newMessage,
            attachment: attachment?.file,
            audio: audioBlob,
        });
        if (success) {
            setNewMessage('');
            setAttachment(null);
            setAudioBlob(null);
            setAudioUrl(null);
        }
        setIsSending(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({ variant: "destructive", title: "File too large", description: "Please select a file smaller than 10MB." });
        return;
      }
      setAudioBlob(null);
      setAudioUrl(null);
      const previewUrl = URL.createObjectURL(file);
      setAttachment({ file, previewUrl });
    }
  };

  const handleRecord = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        const audioChunks: BlobPart[] = [];
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(audioChunks, { type: 'audio/webm' });
          setAudioBlob(blob);
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          stream.getTracks().forEach(track => track.stop()); // Stop the microphone access
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
        setAttachment(null);
        setAudioBlob(null);
        setAudioUrl(null);
      } catch (err) {
        toast({ variant: "destructive", title: "Permission Denied", description: "Microphone access is required for voice recording." });
      }
    }
  };
  
  const otherParticipant = role === 'doctor' 
    ? { name: appointment?.patientName, avatar: appointment?.patientAvatar, hint: appointment?.patientAvatarHint }
    : { name: appointment?.doctorName, avatar: appointment?.doctorAvatar, hint: appointment?.doctorAvatarHint };

  const AttachmentPreview = () => {
    if (!attachment && !audioUrl) return null;
    
    return (
      <div className="p-2 bg-gray-100 rounded-lg relative">
        {attachment && (
          <div className="flex items-center gap-2">
            <Paperclip className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700 truncate">{attachment.file.name}</span>
          </div>
        )}
        {audioUrl && (
          <div className="flex items-center gap-2">
            <audio src={audioUrl} controls className="w-full h-8" />
          </div>
        )}
         <Button
            variant="ghost" size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={() => { setAttachment(null); setAudioBlob(null); setAudioUrl(null); }}
        >
            <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  if (loadingAppointment) {
      return (
          <div className="flex h-[calc(100vh-10rem)] md:h-[calc(100vh-4rem)] bg-white rounded-lg border">
              <div className="w-full md:w-80 border-r flex-col hidden md:flex p-4 space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
              </div>
              <div className="flex-1 flex flex-col">
                  <div className="p-4 border-b flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-16" />
                      </div>
                  </div>
                  <div className="flex-1 p-6 space-y-4">
                      <Skeleton className="h-12 w-3/5" />
                      <Skeleton className="h-12 w-3/5 ml-auto" />
                  </div>
              </div>
          </div>
      )
  }

  if (!appointmentId) {
      return (
          <div className="flex h-[calc(100vh-10rem)] md:h-[calc(100vh-4rem)] bg-white rounded-lg border items-center justify-center">
              <p className="text-muted-foreground">Select a conversation to start messaging.</p>
          </div>
      )
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] md:h-[calc(100vh-4rem)] bg-white rounded-lg border">
      <main className="flex-1 flex flex-col" style={{ backgroundImage: "url('/background-pattern.png')", backgroundRepeat: 'repeat' }}>
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-4">
            <Link href={role === 'doctor' ? '/doctor/appointments' : '/patients/appointments'} className="md:hidden">
              <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5"/>
              </Button>
            </Link>
            <Avatar className="h-10 w-10">
              <AvatarImage src={otherParticipant.avatar} alt={otherParticipant.name} data-ai-hint={otherParticipant.hint} />
              <AvatarFallback>{otherParticipant.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{otherParticipant.name}</p>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-4 text-gray-500">
            <Button variant="ghost" size="icon"><Bookmark className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon"><Phone className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon"><Video className="h-5 w-5"/></Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loadingMessages && messages.length === 0 && <p className="text-center text-muted-foreground">Loading messages...</p>}
          {error && <p className="text-destructive text-center">{error}</p>}
          {!loadingMessages && messages.length === 0 && !error && <p className="text-center text-muted-foreground">No messages yet. Start the conversation!</p>}
          
          {messages.map((msg) => (
            <div key={msg.id} className={cn('flex flex-col', msg.senderId === user?.uid ? 'items-end' : 'items-start')}>
                <div className={cn('max-w-md p-3 rounded-lg', msg.senderId === user?.uid ? 'bg-cyan-400 text-white rounded-br-none' : 'bg-white rounded-bl-none')}>
                   {msg.text && <p>{msg.text}</p>}
                   {msg.audioUrl && <audio src={msg.audioUrl} controls className="w-full h-10" />}
                   {msg.fileUrl && (
                    msg.fileUrl.match(/\.(jpeg|jpg|gif|png)$/) != null ?
                        <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">
                            <img src={msg.fileUrl} alt={msg.fileName || 'Attached Image'} className="max-w-xs max-h-48 rounded-md object-cover"/>
                        </a>
                    :
                     <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-inherit hover:underline p-2 bg-black/10 rounded-md">
                       <FileIcon className="h-5 w-5" />
                       <span className="truncate">{msg.fileName || 'View Attachment'}</span>
                     </a>
                   )}
                </div>
                <p className="text-xs text-gray-400 mt-1 px-1">
                    {msg.timestamp ? formatDistanceToNow(new Date(msg.timestamp.seconds * 1000), { addSuffix: true }) : 'sending...'}
                </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 bg-white border-t space-y-2">
          <AttachmentPreview />
          <div className="flex items-center gap-4">
            <Input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />
            <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}><Paperclip className="h-5 w-5 text-gray-500"/></Button>
            <Button variant="ghost" size="icon" onClick={handleRecord} className={cn(isRecording ? 'text-red-500' : 'text-gray-500')}>
                <Mic className="h-5 w-5"/>
            </Button>
            <Input 
                placeholder="Type a message..." 
                className="flex-1 bg-gray-100 border-none focus-visible:ring-0" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={!!attachment || !!audioBlob}
            />
            <Button onClick={handleSendMessage} disabled={isSending || (!newMessage.trim() && !attachment && !audioBlob)}>
                {isSending ? 'Sending...' : <Send className="h-5 w-5"/>}
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
}
