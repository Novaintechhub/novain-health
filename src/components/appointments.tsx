"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Check, X, Clock, MapPin, Mail, Phone } from "lucide-react";

const appointments = [
  {
    name: "Tosin Adebayo",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman portrait",
    date: "12th October 2025, 4pm",
    location: "New York, United States",
    email: "tosinadebayo@yahoo.com",
    phone: "+234 802375227",
  },
  {
    name: "Wright Thinker",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman smiling",
    date: "16th October 2025, 4pm",
    location: "New York, United States",
    email: "wrightthinks@gmail.com",
    phone: "+234 809445227",
  },
  {
    name: "Kanayo Ike",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "man traditional",
    date: "12th October 2025, 4pm",
    location: "New York, United States",
    email: "kanayoike@yahoo.com",
    phone: "+234 802375227",
  },
  {
    name: "Victor Thompson",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "man portrait",
    date: "12th October 2025, 4pm",
    location: "New York, United States",
    email: "victorthom@hotmail.com",
    phone: "+234 802375227",
  },
  {
    name: "Vera Ogechi",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman happy",
    date: "22nd January 2025, 10am",
    location: "New York, United States",
    email: "veraoge@gmail.com",
    phone: "+234 802375227",
  },
  {
    name: "Esther Peterson",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman looking",
    date: "1st February 2025, 9am",
    location: "New York, United States",
    email: "epeterson@gmail.com",
    phone: "+234 802375227",
  },
];

export default function Appointments() {
  return (
    <div className="space-y-4">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <Card className="bg-white rounded-lg shadow-sm">
            <CardContent className="p-6 space-y-6">
                {appointments.map((appointment, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg border border-gray-100">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={appointment.avatarUrl} alt={appointment.name} data-ai-hint={appointment.avatarHint} />
                            <AvatarFallback>{appointment.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                            <div className="space-y-1">
                                <p className="font-semibold text-lg">{appointment.name}</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>{appointment.date}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>{appointment.location}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span>{appointment.email}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Phone className="w-4 h-4 mr-2" />
                                    <span>{appointment.phone}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 justify-start md:justify-end">
                                <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                    <Eye className="w-4 h-4 mr-1" />
                                    View
                                </Button>
                                <Button variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                                    <Check className="w-4 h-4 mr-1" />
                                    Accept
                                </Button>
                                <Button variant="outline" size="sm" className="bg-red-100 text-red-600 border-none hover:bg-red-200">
                                    <X className="w-4 h-4 mr-1" />
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}
