
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, FileText, Stethoscope, Video, Printer, Download, MessageSquare, ChevronLeft, Heart, Pill, ShieldAlert, GitBranch } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import type { Appointment } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';

const InfoCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
            <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
            <h4 className="font-semibold">{title}</h4>
            <div className="text-muted-foreground text-sm">{children}</div>
        </div>
    </div>
);


export default function ViewAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('id');
  const { user } = useAuth();
  const { toast } = useToast();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSymptomsExpanded, setIsSymptomsExpanded] = useState(false);

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
  
  const details = appointment.consultationDetails;
  const symptomsText = details?.symptoms || '';
  const canTruncateSymptoms = symptomsText.length > 150;
  const truncatedSymptoms = canTruncateSymptoms ? `${symptomsText.substring(0, 150)}...` : symptomsText;

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

            {details && (
                <div className="py-6 border-b">
                    <h3 className="text-xl font-bold mb-6">Your Consultation Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <InfoCard icon={Stethoscope} title="What are you experiencing right now?">
                            <p className="whitespace-pre-line">
                                {isSymptomsExpanded ? symptomsText : truncatedSymptoms}
                            </p>
                            {canTruncateSymptoms && (
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-primary"
                                    onClick={() => setIsSymptomsExpanded(!isSymptomsExpanded)}
                                >
                                    {isSymptomsExpanded ? "Read Less" : "Read More"}
                                </Button>
                            )}
                        </InfoCard>
                        <InfoCard icon={Clock} title="When did your symptoms start?">
                            <p>{details.symptomsStartDate}</p>
                        </InfoCard>
                        <InfoCard icon={Heart} title="Do you have any existing medical conditions?">
                            <p>{details.existingConditions}</p>
                        </InfoCard>
                         <InfoCard icon={Pill} title="Are you currently taking any medications?">
                            <p>{details.currentMedications}</p>
                        </InfoCard>
                        <InfoCard icon={ShieldAlert} title="Do you have any allergies?">
                            <p>{details.allergies}</p>
                        </InfoCard>
                         <InfoCard icon={GitBranch} title="Have you seen another doctor about this before?">
                            <p>{details.seenDoctorBefore}</p>
                        </InfoCard>
                        {details.medicalRecordUris && details.medicalRecordUris.length > 0 && (
                             <InfoCard icon={FileText} title="Uploaded Medical Records">
                                <div className="space-y-2">
                                    {details.medicalRecordUris.map((url, index) => (
                                        <a href={url} target="_blank" rel="noopener noreferrer" key={index} className="flex items-center gap-2 text-primary hover:underline">
                                            <Download className="w-4 h-4" />
                                            <span>Medical Document {index + 1}</span>
                                        </a>
                                    ))}
                                </div>
                            </InfoCard>
                        )}
                    </div>
                </div>
            )}
            
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
