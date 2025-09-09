
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, MapPin, Upload } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import type { DoctorProfile, ConsultationDetails } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { addMonths, subMonths, format, startOfMonth, getDay, getDate, getDaysInMonth, isPast, setHours, setMinutes, isBefore, startOfHour, isToday } from 'date-fns';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function ConsultationForm({ onSubmit, isSubmitting }: { onSubmit: (data: ConsultationDetails) => void; isSubmitting: boolean; }) {
    const [formData, setFormData] = React.useState<ConsultationDetails>({
        symptoms: '',
        symptomsStartDate: '',
        existingConditions: '',
        currentMedications: '',
        allergies: '',
        seenDoctorBefore: 'No',
        medicalRecordUri: '',
    });
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRadioChange = (value: 'Yes' | 'No') => {
        setFormData({ ...formData, seenDoctorBefore: value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setFormData(prev => ({ ...prev, medicalRecordUri: result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="border-t pt-6 space-y-6">
            <h3 className="text-xl font-bold">Start Your Consultation</h3>
            <p className="text-muted-foreground">Tell us a bit about how you're feeling so the doctor can prepare and respond quickly.</p>
            
            <div className="space-y-4">
                <div>
                    <Label htmlFor="symptoms">What are you experiencing right now?</Label>
                    <Textarea id="symptoms" name="symptoms" value={formData.symptoms} onChange={handleChange} placeholder="Describe your symptoms in your own words." required />
                </div>
                <div>
                    <Label htmlFor="symptomsStartDate">When did your symptoms start?</Label>
                    <Input id="symptomsStartDate" name="symptomsStartDate" value={formData.symptomsStartDate} onChange={handleChange} placeholder="E.g., 3 days ago, this morning, last week" required />
                </div>
                <div>
                    <Label htmlFor="existingConditions">Do you have any existing medical conditions?</Label>
                    <Input id="existingConditions" name="existingConditions" value={formData.existingConditions} onChange={handleChange} placeholder="E.g., Hypertension, Ulcer, Diabetes" required />
                </div>
                <div>
                    <Label htmlFor="currentMedications">Are you currently taking any medications?</Label>
                    <Input id="currentMedications" name="currentMedications" value={formData.currentMedications} onChange={handleChange} placeholder="I'm taking amlodipine daily for blood pressure" required />
                </div>
                 <div>
                    <Label htmlFor="allergies">Do you have any allergies?</Label>
                    <Input id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} placeholder="E.g. Penicillin, nuts" required />
                </div>
                <div>
                    <Label>Have you seen another doctor about this before?</Label>
                    <RadioGroup value={formData.seenDoctorBefore} onValueChange={handleRadioChange} className="flex gap-4 mt-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id="seen-yes" />
                            <Label htmlFor="seen-yes">Yes I have</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="seen-no" />
                            <Label htmlFor="seen-no">No, I haven't</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div>
                    <Label>Upload recent medical records (optional)</Label>
                    <div
                        className="mt-2 flex justify-center items-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-cyan-400 hover:bg-cyan-50"
                        onClick={() => fileInputRef.current?.click()}
                    >
                         <Input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf,.doc,.docx"/>
                         <div className="text-center">
                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            <p className="mt-2 text-sm text-cyan-500">
                                {formData.medicalRecordUri ? "File Selected" : "Upload recent medical records"}
                            </p>
                            {formData.medicalRecordUri && <p className="text-xs text-muted-foreground">Click to change file</p>}
                         </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button type="submit" size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Confirm Request'}
                </Button>
            </div>
        </form>
    );
}

function RequestAppointmentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const doctorId = searchParams.get("doctorId");
  const method = searchParams.get("method");
  const duration = searchParams.get("duration");
  const price = searchParams.get("price");
  const appointmentIdToEdit = searchParams.get("edit"); // New param

  const [doctor, setDoctor] = React.useState<DoctorProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const formatTo12Hour = (time24: string) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };
  
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
  
  const handleProceedToCheckout = (consultationDetails: ConsultationDetails) => {
    if (!selectedDate || !selectedTime || !doctor || !method || !duration || price === null) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Missing required information to book an appointment.",
        });
        return;
    }
    
    // Here we will call the API directly instead of going to checkout
    // as the checkout is now for payment.
    const payload = {
      doctorId,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      method,
      duration,
      price: parseFloat(price),
      consultationDetails,
    };
    
    // TODO: Send this payload to the booking API
    console.log("Submitting appointment request:", payload);
    
    // For now, let's just show a success message and redirect
     toast({
      title: "Appointment Requested",
      description: "Your request has been sent to the doctor.",
    });
    router.push('/patients/appointments');
  };

  const firstDayOfMonth = getDay(startOfMonth(currentDate));
  const daysInMonth = getDaysInMonth(currentDate);

  const selectedDateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  
  
  // @ts-ignore
  const availableSlots = doctor?.schedule?.[selectedDateString] || [];

  const approvedAppointmentTimes = React.useMemo(() => {
    if (!doctor?.approvedAppointments || !selectedDate) return new Set();
    
    return new Set(
        doctor.approvedAppointments
            .map(appt => new Date(appt.appointmentDate!))
            .filter(apptDate => format(apptDate, 'yyyy-MM-dd') === selectedDateString)
            .map(apptDate => formatTo12Hour(format(apptDate, 'HH:mm')))
    );
  }, [doctor?.approvedAppointments, selectedDate, selectedDateString]);
  
  const isTimeSlotPast = (startTime: string): boolean => {
    if (!selectedDate || !isToday(selectedDate)) return false;

    const [time, ampm] = startTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;

    const slotDateTime = new Date(selectedDate);
    slotDateTime.setHours(hours, minutes, 0, 0);

    return isBefore(slotDateTime, new Date());
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

  const backLink = appointmentIdToEdit 
    ? `/patients/appointments` 
    : `/patients/doctor-profile?id=${doctorId}`;

  return (
    <div className="space-y-6">
      <div>
        <Link href={backLink} className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-4 h-4 mr-1" />
          {appointmentIdToEdit ? 'Back to Appointments' : 'Back to Doctor Profile'}
        </Link>
        <h1 className="text-2xl font-bold mt-2">{appointmentIdToEdit ? 'Reschedule Appointment' : 'Request an Appointment'}</h1>
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
                      const startTime12hr = formatTo12Hour(slot.start);
                      const isBooked = approvedAppointmentTimes.has(startTime12hr);
                      const isPastSlot = isTimeSlotPast(startTime12hr);
                      const timeRange = `${startTime12hr} - ${formatTo12Hour(slot.end)}`;
                      
                      return (
                        <Button
                          key={index}
                          variant={selectedTime === timeRange ? 'default' : 'outline'}
                          onClick={() => setSelectedTime(timeRange)}
                          disabled={isBooked || isPastSlot}
                          className={`rounded-md ${selectedTime === timeRange ? 'bg-cyan-500 text-white' : ''} ${(isBooked || isPastSlot) ? 'cursor-not-allowed bg-gray-100 text-gray-400 line-through' : ''}`}
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
             {selectedDate && selectedTime && (
                <ConsultationForm onSubmit={handleProceedToCheckout} isSubmitting={isSubmitting} />
             )}
          </div>
        </CardContent>
      </Card>
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
