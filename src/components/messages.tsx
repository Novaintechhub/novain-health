
"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Paperclip, Mic, Send, Bookmark, Phone, Video } from "lucide-react";

const conversations = [
  {
    name: "Ovie Whiskey",
    status: "Active 4 hours ago",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "man smiling",
    online: true,
  },
  {
    name: "Triumph Aruoriwo",
    status: "Active 16 hours ago",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "woman portrait",
    online: false,
  },
  {
    name: "Sophia Zara",
    status: "Active yesterday",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "woman looking",
    online: false,
  },
  {
    name: "Chicha Tobe",
    status: "Active 4 hours ago",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "woman traditional",
    online: true,
  },
  {
    name: "Carol Susan",
    status: "Sent an attachment | 14mins",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "woman happy",
    online: false,
  },
  {
    name: "Tim Bowling",
    status: "Active 18 hours ago",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "man portrait",
    online: false,
  },
  {
    name: "Vera Ogechi",
    status: "Sent a recording | 2weeks",
    avatar: "https://placehold.co/40x40.png",
    avatarHint: "woman smiling",
    online: false,
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
    {
        sender: 'doctor',
        time: '8:47am',
        text: 'Do you feel any nausea or sensitivity to light?'
    },
    {
        sender: 'patient',
        time: '8:48am',
        text: 'They\'re usually dull but sometimes get worse after I spend long hours on my computer. I don\'t feel nauseous, but I do notice a slight sensitivity to light.'
    },
    {
        sender: 'doctor',
        time: '8:48am',
        text: 'Thank you for the details. It sounds like it might be related to eye strain. How\'s your hydration level? Do you drink enough water daily?'
    },
    {
        sender: 'patient',
        time: '8:49am',
        text: 'Hmm, not really. I probably drink about 2-3'
    }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
      if (newMessage.trim()) {
          setMessages([...messages, { sender: 'doctor', text: newMessage, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) }]);
          setNewMessage('');
      }
  };


  return (
    <div className="flex h-screen bg-white">
      <aside className="w-80 border-r flex flex-col">
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
              onClick={() => setSelectedConversation(convo)}
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

      <main className="flex-1 flex flex-col" style={{ backgroundImage: "url('/background-pattern.png')", backgroundRepeat: 'repeat' }}>
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} data-ai-hint={selectedConversation.avatarHint} />
              <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{selectedConversation.name}</p>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <Button variant="ghost" size="icon"><Bookmark className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon"><Phone className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon"><Video className="h-5 w-5"/></Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex flex-col ${msg.sender === 'doctor' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'doctor' ? 'bg-white rounded-br-none' : 'bg-gray-100 rounded-bl-none'}`}>
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
