
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, FileText, Stethoscope, Video, Printer, ChevronLeft, MessageSquare, Phone, Check, X, User, Heart, Pill, ShieldAlert, GitBranch, Download } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Appointment } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

export default function DoctorViewAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('id');

  const { user } = useAuth();
  const { toast } = useToast();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isSymptomsExpanded, setIsSymptomsExpanded] = useState(false);

  const fetchAppointment = async () => {
    if (!appointmentId || !user) {
        setLoading(false);
        return;
    }
    try {
        setLoading(true);
        const idToken = await user.getIdToken();
        const response = await fetch(`/api/doctor/appointments/${appointmentId}`, {
            headers: { 'Authorization': `Bearer ${idToken}` }
        });
        if (!response.ok) throw new Error("Failed to fetch appointment details.");
        const data = await response.json();
        setAppointment(data);
    } catch (error: any) {
        toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    if(appointmentId && user) {
        fetchAppointment();
    }
  }, [appointmentId, user]);

  const handleApprove = async () => {
    if (!appointment || !user) return;
    setIsActionLoading(true);
    try {
        const idToken = await user.getIdToken();
        const response = await fetch(`/api/doctor/appointments/${appointment.id}/approve`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${idToken}` }
        });
        if (!response.ok) throw new Error("Failed to approve appointment.");
        toast({ title: "Success", description: "Appointment has been approved." });
        fetchAppointment(); // Re-fetch to update status
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
        setIsActionLoading(false);
    }
  };
  
  const handleCancel = async () => {
    if (!appointment || !user || !cancelReason) return;
    setIsActionLoading(true);
    try {
        const idToken = await user.getIdToken();
        const response = await fetch(`/api/doctor/appointments/${appointment.id}/cancel`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${idToken}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ reason: cancelReason })
        });
        if (!response.ok) throw new Error("Failed to cancel appointment.");
        toast({ title: "Success", description: "Appointment has been cancelled." });
        fetchAppointment(); // Re-fetch to update status
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
        setIsActionLoading(false);
    }
  };

  const getJoinCallButton = () => {
    if (!appointment) return null;
    let href = `/doctor/messages?appointmentId=${appointment.id}`;
    let icon = <MessageSquare className="mr-2 h-4 w-4" />;
    let text = "Start Chat";

    if (appointment.type === "Video Call") {
        href = `/doctor/video-call?appointmentId=${appointment.id}`;
        icon = <Video className="mr-2 h-4 w-4" />;
        text = "Start Video Call";
    } else if (appointment.type === "Voice Call") {
        href = `/doctor/voice-call?appointmentId=${appointment.id}`;
        icon = <Phone className="mr-2 h-4 w-4" />;
        text = "Start Voice Call";
    }

    return (
        <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
            <Link href={href}>{icon} {text}</Link>
        </Button>
    )
  }

  if (loading) {
    return (
        <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <Card>
                <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4 border-b pb-6">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="space-y-2"><Skeleton className="h-6 w-48" /><Skeleton className="h-4 w-24" /></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b">
                        <Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-10" /><Skeleton className="h-10" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }
  
  if (!appointment) {
    return <div className="text-center py-10">Appointment not found or you do not have permission to view it.</div>;
  }
  
  const totalAmount = parseFloat(appointment.amount || '0');
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
            Back to Appointments
        </Button>
      </div>
      <Card>
        <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-6">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={appointment.patientAvatar} alt={appointment.patientName} data-ai-hint={appointment.patientAvatarHint} />
                        <AvatarFallback>{appointment.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-xl font-bold">{appointment.patientName}</h2>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {appointment.status === 'Pending' && (
                        <>
                            <Button onClick={handleApprove} disabled={isActionLoading} className="bg-green-500 hover:bg-green-600"><Check className="mr-2 h-4 w-4"/>Approve</Button>
                             <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="destructive" disabled={isActionLoading}><X className="mr-2 h-4 w-4"/>Cancel</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Cancel Appointment</DialogTitle>
                                        <DialogDescription>
                                            Please provide a reason for cancelling this appointment. This will be shared with the patient.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <Label htmlFor="cancelReason">Reason for Cancellation</Label>
                                        <Textarea id="cancelReason" value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} />
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild><Button variant="outline">Back</Button></DialogClose>
                                        <DialogClose asChild><Button onClick={handleCancel} disabled={isActionLoading || !cancelReason}>Confirm Cancellation</Button></DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}
                    {appointment.status === 'Approved' && (
                         <>
                            <Button variant="outline"><Printer className="mr-2 h-4 w-4"/> Print Invoice</Button>
                            {appointment.isPaid ? getJoinCallButton() : <Button disabled>Waiting for Payment</Button>}
                        </>
                    )}
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4"/> Appointment Date</p>
                    <p className="font-semibold">{new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4"/> Appointment Time</p>
                    <p className="font-semibold">{new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><Video className="w-4 h-4"/> Consultation Method</p>
                    <p className="font-semibold">{appointment.type}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2"><DollarSign className="w-4 h-4"/> Amount</p>
                    <p className="font-semibold">₦{totalAmount.toFixed(2)}</p>
                </div>
            </div>

            {details && (
                <div className="py-6 border-b">
                    <h3 className="text-xl font-bold mb-6">Consultation Details</h3>
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


            <div className="flex justify-end pt-6">
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
