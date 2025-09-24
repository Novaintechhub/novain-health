
"use client";

import { useState, useEffect, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, CalendarClock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import type { Appointment } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';

function ReportNoShowContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const appointmentId = searchParams.get('id');
  
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState<'refund' | 'reschedule'>('refund');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      if (!appointmentId || !user) {
        setLoading(false);
        return;
      }
      try {
        const idToken = await user.getIdToken();
        const response = await fetch(`/api/appointments/${appointmentId}`, {
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

    if(user) fetchAppointment();
  }, [appointmentId, user, toast]);


  const handleSubmit = async () => {
    if (!user || !appointment) return;
    setIsSubmitting(true);
    try {
        const idToken = await user.getIdToken();
        const response = await fetch(`/api/appointments/${appointment.id}/no-show`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: selectedAction }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to report no-show.");
        }
        
        const result = await response.json();

        toast({
            title: "Report Submitted",
            description: "Your no-show report has been processed.",
        });
        
        router.push(result.redirectPath);

    } catch (error: any) {
        toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Report Doctor No-Show</h1>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-64" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }
  
  if (!appointment) {
      return (
          <div className="text-center py-10">
              <h2 className="text-xl font-semibold">Appointment Not Found</h2>
              <p className="text-muted-foreground mt-2">Could not load appointment details.</p>
              <Button onClick={() => router.push('/patients/appointments')} className="mt-4">Back to Appointments</Button>
          </div>
      )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Report Doctor No-Show</h1>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={appointment.doctorAvatar} alt={appointment.doctorName} data-ai-hint={appointment.doctorAvatarHint} />
              <AvatarFallback>{appointment.doctorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Appointment with {appointment.doctorName}</CardTitle>
              <p className="text-muted-foreground">On {format(new Date(appointment.appointmentDate), 'do MMMM yyyy, p')}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            We are sorry to hear that your doctor did not attend the scheduled appointment. Please select one of the options below to resolve this issue.
          </p>
          <RadioGroup value={selectedAction} onValueChange={(value: 'refund' | 'reschedule') => setSelectedAction(value)} className="space-y-4">
            <Label htmlFor="refund-option" className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
              <RadioGroupItem value="refund" id="refund-option" className="mt-1" />
              <div className="grid gap-1.5">
                  <div className="font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Get a Full Refund to Your Wallet
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The full amount of ₦{appointment.amount} will be credited to your in-app wallet immediately. You can use it for any future appointment.
                  </p>
              </div>
            </Label>
            <Label htmlFor="reschedule-option" className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
                <RadioGroupItem value="reschedule" id="reschedule-option" className="mt-1" />
                <div className="grid gap-1.5">
                    <div className="font-semibold flex items-center gap-2">
                        <CalendarClock className="w-5 h-5 text-primary" />
                        Reschedule for Free
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Book a new appointment with {appointment.doctorName} for a future date at no additional cost.
                    </p>
                </div>
            </Label>
          </RadioGroup>
          <div className="flex justify-end">
            <Button onClick={handleSubmit} className="bg-cyan-500 hover:bg-cyan-600 text-white" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Confirm and Proceed'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ReportNoShowPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReportNoShowContent />
        </Suspense>
    )
}
