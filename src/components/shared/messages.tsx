
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Paperclip, Mic, Send, Bookmark, Phone, Video, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import type { Appointment } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useChat, Message } from "@/hooks/useChat"; // We will create this hook
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const conversations = [
  {
    name: "Dr. Darren Elder",
    status: "Active 4 hours ago",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "male doctor",
    online: true,
  },
  {
    name: "Dr. Michael Smith",
    status: "Active 16 hours ago",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "doctor portrait",
    online: false,
  },
];


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
      if (newMessage.trim() && appointmentId && !isSending) {
          setIsSending(true);
          const success = await sendMessage(newMessage);
          if (success) {
            setNewMessage('');
          }
          setIsSending(false);
      }
  };
  
  const otherParticipant = role === 'doctor' 
    ? { name: appointment?.patientName, avatar: appointment?.patientAvatar, hint: appointment?.patientAvatarHint }
    : { name: appointment?.doctorName, avatar: appointment?.doctorAvatar, hint: appointment?.doctorAvatarHint };

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
      // Show a list of conversations or a prompt to select one
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
          {loadingMessages && <p>Loading messages...</p>}
          {error && <p className="text-destructive text-center">{error}</p>}
          {!loadingMessages && messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.senderId === user?.uid ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-md p-3 rounded-lg ${msg.senderId === user?.uid ? 'bg-cyan-400 text-white rounded-br-none' : 'bg-white rounded-bl-none'}`}>
                    <p>{msg.text}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 px-1">{msg.timestamp ? new Date(msg.timestamp.seconds * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'}) : 'sending...'}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 bg-white border-t">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon"><Paperclip className="h-5 w-5 text-gray-500"/></Button>
            <Button variant="ghost" size="icon"><Mic className="h-5 w-5 text-gray-500"/></Button>
            <Input 
                placeholder="Type a message..." 
                className="flex-1 bg-gray-100 border-none focus-visible:ring-0" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} disabled={isSending}>
                {isSending ? 'Sending...' : <Send className="h-5 w-5"/>}
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
}
