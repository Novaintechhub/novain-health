
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Mail, Phone, MessageSquare, Video, X } from "lucide-react";

export default function DoctorViewAppointment() {
  return (
    <div className="bg-gray-50/50 p-4 sm:p-6 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold">Appointment Details</h2>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src="https://placehold.co/80x80.png" alt="Tosin Adebayo" data-ai-hint="woman portrait" />
                <AvatarFallback>TA</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg">Tosin Adebayo</h3>
              </div>
            </div>
            <div className="text-sm">
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Pending</span>
                </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>12th October 2025, 4pm</span>
            </div>
             <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span>Tosinadebayo@yahoomail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>Sapele road, Benin city</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>+234 802375227</span>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2">Consultation type: <span className="text-cyan-500 font-semibold">Video Chat</span></p>
            <div className="flex gap-2">
                <Button variant="outline" size="icon" className="border-gray-300 text-gray-500"><MessageSquare/></Button>
                <Button variant="outline" size="icon" className="border-gray-300 text-gray-500"><Phone/></Button>
                <Button variant="outline" size="icon" className="bg-cyan-400 border-cyan-400 text-white"><Video/></Button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Description</h4>
            <div className="space-y-4 text-sm">
                <div>
                    <p className="font-semibold text-gray-700">Reason for consultation</p>
                    <p className="text-gray-600">I've had a persistent cough, chest tightness, and slight fever for the past few days. Breathing feels a bit strained at night.</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Symptom Duration</p>
                    <p className="text-gray-600">4 days ago</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Existing Medical Conditions</p>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>Mild asthma</li>
                        <li>Seasonal allergies</li>
                    </ul>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Current Medications</p>
                    <p className="text-gray-600">Ventolin inhaler</p>
                </div>
                 <div>
                    <p className="font-semibold text-gray-700">Do you have any allergies?</p>
                    <p className="text-gray-600">Penicillin, dust mites</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Previous Consultations</p>
                    <p className="text-gray-600">Visited a local clinic 2 days ago. Was told to monitor symptoms. No medication given.</p>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
