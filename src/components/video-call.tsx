
"use client";

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Phone, UserPlus, Video, Settings, ArrowUpDown } from 'lucide-react';
import Image from 'next/image';

export default function VideoCall() {
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 59) {
          setMinutes(prevMinutes => prevMinutes + 1);
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="flex flex-col h-full bg-gray-50 p-4 sm:p-6">
        <Card className="w-full flex-grow flex flex-col shadow-lg relative overflow-hidden">
            <header className="flex items-center justify-between p-4 border-b bg-white">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" alt="Charlene Reed" data-ai-hint="woman smiling" />
                        <AvatarFallback>CR</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">Charlene Reed</p>
                        <p className="text-sm text-green-500">Online</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon">
                    <Settings className="text-muted-foreground" />
                </Button>
            </header>
            
            <main className="flex-grow relative bg-black">
                <Image src="https://placehold.co/1200x800.png" layout="fill" objectFit="contain" alt="Doctor Video Feed" data-ai-hint="woman headset" />
                <div className="absolute bottom-4 right-4">
                    <Image src="https://placehold.co/200x150.png" width={200} height={150} alt="Patient Preview" className="rounded-md border-2 border-white" data-ai-hint="woman portrait" />
                </div>
            </main>

            <footer className="bg-white/80 backdrop-blur-sm p-4 absolute bottom-0 left-0 right-0 flex justify-between items-center">
                <div>
                    <p className="text-lg font-semibold tabular-nums">{formattedTime}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full bg-gray-200/50 hover:bg-gray-200 w-12 h-12">
                        <Video />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full bg-gray-200/50 hover:bg-gray-200 w-12 h-12">
                        <Mic />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full bg-gray-200/50 hover:bg-gray-200 w-12 h-12">
                        <UserPlus />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full bg-gray-200/50 hover:bg-gray-200 w-12 h-12">
                        <ArrowUpDown />
                    </Button>
                </div>
                <div>
                    <Button variant="destructive" size="icon" className="rounded-full w-14 h-14">
                        <Phone />
                    </Button>
                </div>
            </footer>
        </Card>
    </div>
  );
}
