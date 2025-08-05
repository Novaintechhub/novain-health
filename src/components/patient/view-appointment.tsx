
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, DollarSign, FileText, Stethoscope, Video, Printer, Download, MessageSquare } from "lucide-react";
import Link from "next/link";

const appointmentDetails = {
    doctor: {
        name: "Dr. Vera Ogechi",
        specialty: "Cardiology",
        avatarUrl: "https://placehold.co/80x80.png",
        avatarHint: "female doctor portrait",
    },
    appointment: {
        date: "22nd January 2024",
        time: "10:00 AM",
        type: "Video Call",
        status: "Completed",
        amountPaid: "₦250",
    },
    diagnosis: "Common cold with mild fatigue. Advised rest and hydration.",
    prescriptions: [
        { name: "Paracetamol", dosage: "500mg, twice a day for 3 days" },
        { name: "Vitamin C", dosage: "1000mg, once a day for 7 days" },
    ],
    report: {
        name: "Consultation_Report_22-01-24.pdf"
    }
};

export default function ViewAppointment() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Appointment Details</h1>
      <Card>
        <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={appointmentDetails.doctor.avatarUrl} alt={appointmentDetails.doctor.name} data-ai-hint={appointmentDetails.doctor.avatarHint} />
                        <AvatarFallback>{appointmentDetails.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold">{appointmentDetails.doctor.name}</h2>
                        <p className="text-muted-foreground">{appointmentDetails.doctor.specialty}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Printer className="mr-2 h-4 w-4"/> Print Invoice</Button>
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-white"><MessageSquare className="mr-2 h-4 w-4"/> Follow Up</Button>
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4"/> Appointment Date</p>
                    <p className="font-semibold">{appointmentDetails.appointment.date}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4"/> Appointment Time</p>
                    <p className="font-semibold">{appointmentDetails.appointment.time}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Video className="w-4 h-4"/> Consultation Method</p>
                    <p className="font-semibold">{appointmentDetails.appointment.type}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><DollarSign className="w-4 h-4"/> Amount Paid</p>
                    <p className="font-semibold">{appointmentDetails.appointment.amountPaid}</p>
                </div>
            </div>

            <div className="py-6 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg"><Stethoscope className="w-5 h-5"/> Diagnosis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{appointmentDetails.diagnosis}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg"><FileText className="w-5 h-5"/> Prescriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            {appointmentDetails.prescriptions.map((p, i) => (
                                <li key={i}><strong>{p.name}:</strong> {p.dosage}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg"><Download className="w-5 h-5"/> Consultation Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/50">
                            <div className="flex items-center gap-4">
                                <FileText className="h-6 w-6 text-primary"/>
                                <p className="font-semibold">{appointmentDetails.report.name}</p>
                            </div>
                            <Button variant="ghost" size="icon">
                                <Download className="h-5 w-5"/>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="flex justify-end pt-6 border-t">
                 <Badge className="bg-blue-100 text-blue-800 text-sm">Status: {appointmentDetails.appointment.status}</Badge>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
