
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, FileText, Stethoscope, Video, Printer, ChevronLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const appointmentDetails = {
    patient: {
        name: "Charlene Reed",
        avatarUrl: "https://placehold.co/80x80.png",
        avatarHint: "woman smiling",
        patientId: "P0016",
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

export default function DoctorViewAppointment() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Appointment Details</h1>
        <Button variant="outline" onClick={() => router.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Appointments
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={appointmentDetails.patient.avatarUrl} alt={appointmentDetails.patient.name} data-ai-hint={appointmentDetails.patient.avatarHint} />
                        <AvatarFallback>{appointmentDetails.patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold">{appointmentDetails.patient.name}</h2>
                        <p className="text-muted-foreground">{appointmentDetails.patient.patientId}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Printer className="mr-2 h-4 w-4"/> Print Invoice</Button>
                    <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
                        <Link href="/doctor/messages">
                            <MessageSquare className="mr-2 h-4 w-4"/> Message Patient
                        </Link>
                    </Button>
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
            </div>
            
            <div className="flex justify-end pt-6 border-t">
                 <Badge className="bg-blue-100 text-blue-800 text-sm">Status: {appointmentDetails.appointment.status}</Badge>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
