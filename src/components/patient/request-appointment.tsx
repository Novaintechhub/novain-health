
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import type { DoctorProfile } from "@/lib/types";
import { format } from "date-fns";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

type TimeSlot = { start: string; end: string };

const formatTo12Hour = (time24: string) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
};

function RequestAppointmentContent() {
    const searchParams = useSearchParams();
    const doctorId = searchParams.get("doctorId");
    const { toast } = useToast();

    const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

    useEffect(() => {
        if (!doctorId) {
            setLoading(false);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No doctor specified.",
            });
            return;
        }

        const fetchDoctorProfile = async () => {
            try {
                const response = await fetch(`/api/doctors/${doctorId}`);
                if (!response.ok) throw new Error("Failed to fetch doctor details.");
                const data: DoctorProfile = await response.json();
                setDoctor(data);
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error.message,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorProfile();
    }, [doctorId, toast]);

    useEffect(() => {
        if (selectedDate && doctor?.schedule) {
            const dateString = format(selectedDate, 'yyyy-MM-dd');
            const slotsForDay = doctor.schedule[dateString] || [];
            setAvailableSlots(slotsForDay);
            setSelectedSlot(null); // Reset selected slot when date changes
        }
    }, [selectedDate, doctor]);

    if (loading) {
        return <Skeleton className="w-full h-96" />;
    }

    if (!doctor) {
        return <p className="text-center text-red-500">Could not load doctor information.</p>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Request an Appointment</h1>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={doctor.imageUrl} alt={`Dr. ${doctor.firstName}`} data-ai-hint="doctor portrait" />
                            <AvatarFallback>{doctor.firstName?.charAt(0)}{doctor.lastName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>Dr. {doctor.firstName} {doctor.lastName}</CardTitle>
                            <p className="text-muted-foreground">{doctor.specialty}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold mb-4">Select a Date</h3>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                            className="rounded-md border"
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Available Time Slots</h3>
                        {availableSlots.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {availableSlots.map((slot, index) => (
                                    <Button
                                        key={index}
                                        variant={selectedSlot?.start === slot.start ? "default" : "outline"}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={selectedSlot?.start === slot.start ? 'bg-cyan-500 hover:bg-cyan-600' : ''}
                                    >
                                        {formatTo12Hour(slot.start)}
                                    </Button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No available slots for this day.</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white" disabled={!selectedSlot}>
                        <Link href="/patients/checkout">
                            Confirm and Proceed to Checkout
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default function RequestAppointment() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RequestAppointmentContent />
        </Suspense>
    );
}
