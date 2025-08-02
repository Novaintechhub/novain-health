
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, MapPin, UploadCloud } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const timeSlots = ["8:00am - 8:30am", "11:30am - 12:00pm", "3:00pm - 4:45pm", "5:00pm - 6:30pm"];

export default function RequestAppointment() {
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
        <CardContent className="p-4 space-y-6">
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
      
      <Card>
        <CardHeader>
            <CardTitle>Start Your Consultation</CardTitle>
            <p className="text-muted-foreground text-sm">Tell us a bit about how you're feeling so the doctor can prepare and respond quickly.</p>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="symptoms">What are you experiencing right now?</Label>
                <Textarea id="symptoms" placeholder="Describe your symptoms in your own words." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="symptoms-start">When did your symptoms start?</Label>
                <Input id="symptoms-start" placeholder="E.g. 3 days ago, this morning, last week" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="medical-conditions">Do you have any existing medical conditions?</Label>
                <Input id="medical-conditions" placeholder="E.g. Hypertension, Ulcer, Diabetes" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="medications">Are you currently taking any medications?</Label>
                <Input id="medications" placeholder="I'm taking amlodipine daily for blood pressure" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="allergies">Do you have any allergies?</Label>
                <Input id="allergies" placeholder="I'm taking amlodipine daily for blood pressure" />
            </div>

            <div className="space-y-2">
                <Label>Have you seen another doctor about this before?</Label>
                <RadioGroup className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="seen-doctor-yes" />
                        <Label htmlFor="seen-doctor-yes">Yes I have</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="seen-doctor-no" />
                        <Label htmlFor="seen-doctor-no">No, I haven't</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="space-y-2">
                <Label>How would you like to speak with a doctor?</Label>
                <RadioGroup className="flex gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="chat" id="speak-chat" />
                        <Label htmlFor="speak-chat">Chat</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="voice" id="speak-voice" />
                        <Label htmlFor="speak-voice">Voice call</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="video" id="speak-video" />
                        <Label htmlFor="speak-video">Video call</Label>
                    </div>
                </RadioGroup>
            </div>
            
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-cyan-500 font-semibold">Upload recent medical records</p>
            </div>

        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">Request Appointment</Button>
      </div>
    </div>
  );
}
