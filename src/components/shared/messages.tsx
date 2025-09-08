
"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Paperclip, Mic, Send, Bookmark, Phone, Video, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

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
  {
    name: "Dr. Leke Alder",
    status: "Active yesterday",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "female doctor",
    online: false,
  },
  {
    name: "Dr. Chisom Agu",
    status: "Active 4 hours ago",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "female doctor glasses",
    online: true,
  },
];

const initialMessages = [
    {
        sender: 'patient',
        time: '8:46am',
        text: 'Good morning, Doctor. I\'ve been experiencing persistent headaches for about a week now.'
    },
    {
        sender: 'patient',
        time: '8:46am',
        text: 'They usually happen in the afternoons.'
    },
    {
        sender: 'doctor',
        time: '8:47am',
        text: 'Good morning! I\'m sorry to hear that. Could you describe the nature of the headaches? Are they sharp, dull, or throbbing?'
    },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isChatActive, setIsChatActive] = useState(false);

  const handleSendMessage = () => {
      if (newMessage.trim()) {
          setMessages([...messages, { sender: 'patient', text: newMessage, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) }]);
          setNewMessage('');
      }
  };

  const handleConversationSelect = (convo: typeof conversations[0]) => {
    setSelectedConversation(convo);
    setIsChatActive(true);
  };


  return (
    <div className="flex h-[calc(100vh-10rem)] md:h-[calc(100vh-4rem)] bg-white rounded-lg border">
      <aside className={cn(
        "w-full md:w-80 border-r flex-col",
        isChatActive ? "hidden md:flex" : "flex"
      )}>
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input placeholder="Search Conversations" className="pl-10" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((convo, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 ${selectedConversation.name === convo.name ? 'bg-blue-50' : ''}`}
              onClick={() => handleConversationSelect(convo)}
            >
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={convo.avatar} alt={convo.name} data-ai-hint={convo.avatarHint} />
                  <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {convo.online && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{convo.name}</p>
                <p className="text-sm text-gray-500">{convo.status}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className={cn(
          "flex-1 flex-col",
          isChatActive ? "flex" : "hidden md:flex"
      )} style={{ backgroundImage: "url('/background-pattern.png')", backgroundRepeat: 'repeat' }}>
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsChatActive(false)}>
                <ArrowLeft className="h-5 w-5"/>
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} data-ai-hint={selectedConversation.avatarHint} />
              <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{selectedConversation.name}</p>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-4 text-gray-500">
            <Button variant="ghost" size="icon"><Bookmark className="h-5 w-5"/></Button>
            <Link href="/patients/voice-call">
              <Button variant="ghost" size="icon"><Phone className="h-5 w-5"/></Button>
            </Link>
            <Link href="/patients/video-call">
             <Button variant="ghost" size="icon"><Video className="h-5 w-5"/></Button>
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex flex-col ${msg.sender === 'patient' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'patient' ? 'bg-cyan-400 text-white rounded-br-none' : 'bg-white rounded-bl-none'}`}>
                    <p>{msg.text}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1 px-1">{msg.time}</p>
            </div>
          ))}
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
            <Button onClick={handleSendMessage}><Send className="h-5 w-5"/></Button>
          </div>
        </footer>
      </main>
    </div>
  );
}
