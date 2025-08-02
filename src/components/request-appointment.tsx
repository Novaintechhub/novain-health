
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const timeSlots = ["8:00am - 8:30am", "11:30am - 12:00pm", "3:00pm - 4:45pm", "5:00pm - 6:30pm"];

export default function RequestAppointment() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedDay, setSelectedDay] = React.useState<string>("TUE");
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/patients/doctor-profile" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Link>
        <h1 className="text-2xl font-bold mt-2">Request an Appointment</h1>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 p-4 border-b">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://placehold.co/80x80.png" alt="Dr. Darren Elder" data-ai-hint="male doctor" />
            <AvatarFallback>DE</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold">Dr. Darren Elder</h2>
            <p className="text-sm text-muted-foreground">BDS, MDS - Oral & Maxillofacial Surgery</p>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              components={{
                  IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                  IconRight: () => <ChevronRight className="h-4 w-4" />,
              }}
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg">Everyday Family Clinic</h3>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                <span>2883 University Street, Seattle, Texas Washington, 98155</span>
              </div>
            </div>
            <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                    <Button variant="ghost" size="icon"><ChevronLeft /></Button>
                    <p className="font-semibold">December 2024</p>
                    <Button variant="ghost" size="icon"><ChevronRight /></Button>
                </div>
                <div className="flex justify-around">
                    {daysOfWeek.map((day) => (
                        <Button 
                            key={day} 
                            variant={selectedDay === day ? 'default' : 'outline'}
                            onClick={() => setSelectedDay(day)}
                            className={`rounded-md ${selectedDay === day ? 'bg-cyan-500 text-white' : ''}`}
                        >
                            {day}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Times Available</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'default' : 'outline'}
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-md ${selectedTime === time ? 'bg-cyan-500 text-white' : ''}`}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-4">
        <Button variant="outline" size="lg">Proceed to Pay</Button>
        <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">Book Appointment</Button>
      </div>
    </div>
  );
}
