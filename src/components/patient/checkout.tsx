
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { DoctorProfile } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const date = searchParams.get("date");
  const time = searchParams.get("time");

  const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const bookingFee = 10;
  const discount = 5;

  useEffect(() => {
    if (!doctorId) {
      setError("Doctor information is missing.");
      setLoading(false);
      return;
    }

    async function fetchDoctor() {
      try {
        const response = await fetch(`/api/doctors/${doctorId}`);
        if (!response.ok) throw new Error("Could not fetch doctor details.");
        const data = await response.json();
        setDoctor(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctor();
  }, [doctorId]);

  const consultationFee = (doctor?.pricing && doctor.pricing !== 'Free') ? parseFloat(doctor.pricing) : 0;
  const totalAmount = consultationFee + bookingFee - discount;

  if (loading) {
    return (
       <div className="space-y-6">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                        </div>
                        <Skeleton className="h-px w-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <Skeleton className="h-px w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            </div>
          </div>
       </div>
    );
  }

  if (error || !doctor) {
    return <div className="text-center text-red-500 py-10">{error || "Could not load checkout information."}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={doctor.imageUrl} alt={`Dr. ${doctor.firstName}`} data-ai-hint="female doctor" />
                  <AvatarFallback>{doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">Dr. {doctor.firstName} {doctor.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{doctor.specialty || 'General Practice'}</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>{date ? format(new Date(date), 'do MMM yyyy') : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span>{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span>New Patient</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consultation Fee</span>
                  <span>₦{consultationFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking Fee</span>
                  <span>₦{bookingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600">-₦{discount.toFixed(2)}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₦{totalAmount.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                Proceed to Pay
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
    return (
        <Suspense fallback={<p>Loading checkout...</p>}>
            <CheckoutContent />
        </Suspense>
    )
}
