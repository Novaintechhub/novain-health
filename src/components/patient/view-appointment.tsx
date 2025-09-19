
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, FileText, Stethoscope, Video, Printer, Download, MessageSquare, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import type { Appointment } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';

export default function ViewAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('id');
  const { user } = useAuth();
  const { toast } = useToast();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!appointmentId || !user) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const idToken = await user.getIdToken();
        const response = await fetch(`/api/appointments/${appointmentId}`, {
          headers: { 'Authorization': `Bearer ${idToken}` }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch appointment details.");
        }
        const data = await response.json();
        setAppointment(data);
      } catch (error: any) {
        toast({ variant: "destructive", title: "Error", description: error.message });
        setAppointment(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAppointment();
  }, [appointmentId, user, toast]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Card className="p-6">
          <CardHeader className="p-0 border-b pb-6 mb-6">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Appointment Not Found</h2>
        <p className="text-muted-foreground mt-2">The appointment you are looking for does not exist or could not be loaded.</p>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Appointment Details</h1>
        <Button variant="outline" onClick={() => router.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={appointment.doctorAvatar} alt={appointment.doctorName} data-ai-hint={appointment.doctorAvatarHint} />
                        <AvatarFallback>{appointment.doctorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold">{appointment.doctorName}</h2>
                        <p className="text-muted-foreground">{appointment.specialty}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Printer className="mr-2 h-4 w-4"/> Print Invoice</Button>
                    <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
                        <Link href="/patients/messages"><MessageSquare className="mr-2 h-4 w-4"/> Follow Up</Link>
                    </Button>
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4"/> Appointment Date</p>
                    <p className="font-semibold">{format(new Date(appointment.appointmentDate), 'do MMMM yyyy')}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4"/> Appointment Time</p>
                    <p className="font-semibold">{format(new Date(appointment.appointmentDate), 'p')}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Video className="w-4 h-4"/> Consultation Method</p>
                    <p className="font-semibold">{appointment.type}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><DollarSign className="w-4 h-4"/> Amount Paid</p>
                    <p className="font-semibold">₦{appointment.amount}</p>
                </div>
            </div>

            <div className="py-6 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg"><Stethoscope className="w-5 h-5"/> Diagnosis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{"Common cold with mild fatigue. Advised rest and hydration."}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg"><FileText className="w-5 h-5"/> Prescriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Paracetamol:</strong> 500mg, twice a day for 3 days</li>
                            <li><strong>Vitamin C:</strong> 1000mg, once a day for 7 days</li>
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
                                <p className="font-semibold">Consultation_Report.pdf</p>
                            </div>
                            <Button variant="ghost" size="icon">
                                <Download className="h-5 w-5"/>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="flex justify-end pt-6 border-t">
                 <Badge className={`${
                    appointment.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                 } text-sm`}>Status: {appointment.status}</Badge>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
