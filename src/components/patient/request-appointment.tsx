
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSearchParams, useRouter } from "next/navigation";
import type { DoctorProfile } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { addMonths, subMonths, format, startOfMonth, getDay, getDate, getDaysInMonth, isPast, startOfToday } from 'date-fns';

function RequestAppointmentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const doctorId = searchParams.get("doctorId");
  const [doctor, setDoctor] = React.useState<DoctorProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    if (!doctorId) {
      setError("No doctor ID provided.");
      setLoading(false);
      return;
    }

    const fetchDoctorProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/doctors/${doctorId}`);
        if (!response.ok) throw new Error("Failed to fetch doctor profile.");
        const data = await response.json();
        setDoctor(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorProfile();
  }, [doctorId]);

  const handleDateSelect = (day: number) => {
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
     if (isPast(newSelectedDate) && !isToday(newSelectedDate)) {
      return; // Do not select past dates
    }
    setSelectedDate(newSelectedDate);
    setSelectedTime(null); // Reset time when date changes
  };
  
  const isToday = (someDate: Date) => {
      const today = new Date()
      return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
  }

  const handleProceedToCheckout = () => {
    if (!selectedDate || !selectedTime) {
      return;
    }
    router.push('/patients/checkout');
  };

  const firstDayOfMonth = getDay(startOfMonth(currentDate));
  const daysInMonth = getDaysInMonth(currentDate);

  const selectedDateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  // @ts-ignore
  const availableSlots = doctor?.schedule?.[selectedDateString] || [];
  
  const formatTo12Hour = (time24: string) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  if (loading) {
      return (
        <div className="space-y-6">
            <Skeleton className="h-10 w-48" />
            <Card>
                <CardHeader className="p-4 border-b">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 space-y-6">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-48 w-full" />
                </CardContent>
            </Card>
        </div>
      )
  }

  if (error || !doctor) {
      return <div className="text-center text-red-500 py-10">{error || "Doctor not found."}</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/patients/doctor-profile?id=${doctorId}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Doctor Profile
        </Link>
        <h1 className="text-2xl font-bold mt-2">Request an Appointment</h1>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 p-4 border-b">
          <Avatar className="h-12 w-12">
            <AvatarImage src={doctor.imageUrl} alt={`Dr. ${doctor.firstName}`} data-ai-hint="doctor portrait" />
            <AvatarFallback>{doctor.firstName?.charAt(0)}{doctor.lastName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold">Dr. {doctor.firstName} {doctor.lastName}</h2>
            <p className="text-sm text-muted-foreground">{doctor.specialty || 'General Practice'}</p>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg">{doctor.clinicName || 'General Clinic'}</h3>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                <span>{doctor.clinicAddress || 'Address not available'}</span>
              </div>
            </div>
            <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                    <Button variant="ghost" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}><ChevronLeft /></Button>
                    <p className="font-semibold">{format(currentDate, 'MMMM yyyy')}</p>
                    <Button variant="ghost" size="icon" onClick={() => setCurrentDate(addMonths(currentDate, 1))}><ChevronRight /></Button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-sm text-muted-foreground">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-2 mt-2">
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                        const isSelected = selectedDate && getDate(selectedDate) === day && selectedDate.getMonth() === currentDate.getMonth();
                        const isPastDate = isPast(date) && !isToday(date);
                        return (
                            <Button
                                key={day}
                                variant={isSelected ? 'default' : 'outline'}
                                onClick={() => handleDateSelect(day)}
                                disabled={isPastDate}
                                className={`rounded-md ${isSelected ? 'bg-cyan-500 text-white' : ''} ${isPastDate ? 'text-muted-foreground opacity-50' : ''}`}
                            >
                                {day}
                            </Button>
                        )
                    })}
                </div>
            </div>
            {selectedDate && (
                <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Available Times on {format(selectedDate, 'MMMM do')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot: {start: string, end: string}, index: number) => {
                      const timeRange = `${formatTo12Hour(slot.start)} - ${formatTo12Hour(slot.end)}`;
                      return (
                        <Button
                          key={index}
                          variant={selectedTime === timeRange ? 'default' : 'outline'}
                          onClick={() => setSelectedTime(timeRange)}
                          className={`rounded-md ${selectedTime === timeRange ? 'bg-cyan-500 text-white' : ''}`}
                        >
                          {timeRange}
                        </Button>
                      )
                    })
                  ) : (
                    <p className="text-muted-foreground col-span-full">No available slots for this day.</p>
                  )}
                </div>
                </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end gap-4">
        <Button size="lg" onClick={handleProceedToCheckout} className="bg-cyan-500 hover:bg-cyan-600 text-white" disabled={!selectedDate || !selectedTime}>Proceed to Checkout</Button>
      </div>
    </div>
  );
}


export default function RequestAppointment() {
    return (
        <React.Suspense fallback={<p>Loading...</p>}>
            <RequestAppointmentContent />
        </React.Suspense>
    );
}

    