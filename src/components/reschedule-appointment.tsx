
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle2, Bookmark, MessageCircle, Phone, Video, Pencil } from "lucide-react";

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
    {count !== undefined && <span className="text-sm text-muted-foreground">({count})</span>}
  </div>
);

const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const timeSlots = ["8:00am - 8:30am", "10:00am - 12:00pm", "3:00pm - 4:45pm", "5:00pm - 6:30pm"];

export default function RescheduleAppointment() {
    const [selectedDay, setSelectedDay] = React.useState<string>("MONDAY");
    const [selectedTime, setSelectedTime] = React.useState<string>("10:00am - 12:00pm");
    
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <Card>
                <CardContent className="p-4">
                    <div className="relative">
                        <Image
                            src="https://placehold.co/400x300.png"
                            alt="Dr. Michael Smith"
                            width={400}
                            height={300}
                            className="rounded-lg w-full"
                            data-ai-hint="male doctor"
                        />
                    </div>
                    <div className="mt-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold">Michael Smith</h2>
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <p className="text-sm text-muted-foreground">MBBS, Gynecology and Pediatric Medicine</p>
                        <div className="mt-2">
                            <StarRating rating={5} count={1176} />
                        </div>
                        <p className="font-semibold my-2">₦300 - ₦500</p>
                        <div className="flex space-x-2">
                           <Button variant="outline" size="icon"><Bookmark/></Button>
                           <Button variant="outline" size="icon"><MessageCircle/></Button>
                           <Button variant="outline" size="icon"><Phone/></Button>
                           <Button variant="outline" size="icon"><Video/></Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold">Time Schedule</h2>
                    <p className="mt-2 text-muted-foreground">
                        Your appointment is for <span className="font-bold text-foreground">Monday, 11th December 2024;</span> from 10am till 12pm
                    </p>
                    <Button variant="link" className="p-0 h-auto text-cyan-500 hover:text-cyan-600 mt-2">
                        <Pencil className="w-4 h-4 mr-2" />
                        Reschedule appointment
                    </Button>

                    <div className="mt-6">
                         <div className="flex flex-wrap gap-2 border-b pb-4">
                            {daysOfWeek.map((day) => (
                                <Button
                                key={day}
                                variant={selectedDay === day ? 'default' : 'outline'}
                                onClick={() => setSelectedDay(day)}
                                className={`rounded-md ${
                                    selectedDay === day
                                    ? "bg-pink-600 text-white"
                                    : "bg-white text-gray-700 border-gray-300"
                                }`}
                                >
                                {day}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="font-semibold mb-4">Time Slots</h3>
                        <div className="flex flex-wrap gap-3">
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
                     <div className="mt-8">
                        <Button className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white">
                            Reschedule Appointment
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
