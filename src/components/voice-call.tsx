
"use client";

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Phone, UserPlus, Video, Settings } from 'lucide-react';
import Image from 'next/image';

export default function VoiceCall() {
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
    <div className="flex flex-col h-full bg-gray-50">
        <div className="flex-grow flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl shadow-lg relative">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-8">
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
                    </div>

                    <div className="flex flex-col items-center justify-center py-16">
                        <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                            <AvatarImage src="https://placehold.co/128x128.png" alt="Dr. Darren Elder" data-ai-hint="male doctor" />
                            <AvatarFallback>DE</AvatarFallback>
                        </Avatar>
                        <h2 className="text-2xl font-bold mt-4">Dr. Darren Elder</h2>
                        <p className="text-lg text-muted-foreground mt-2">{formattedTime}</p>
                    </div>

                    <div className="absolute bottom-6 right-6">
                        <Image src="https://placehold.co/150x100.png" width={150} height={100} alt="Patient Preview" className="rounded-md" data-ai-hint="woman smiling" />
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="bg-white py-4 px-6 flex justify-center items-center gap-4 border-t">
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
                <Video />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
                <Mic />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
                <UserPlus />
            </Button>
            <Button variant="destructive" size="icon" className="rounded-full w-14 h-14">
                <Phone />
            </Button>
        </div>
    </div>
  );
}
