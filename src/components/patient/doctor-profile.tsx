
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, ThumbsUp, MessageCircle, DollarSign, Bookmark, Phone, Video, CheckCircle, ArrowRight, Reply, ThumbsDown, Languages } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type DoctorProfile } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const StarRating = ({ rating, count }: { rating: number; count?: number; }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
    {count !== undefined && <span className="text-sm text-muted-foreground">({count})</span>}
  </div>
);

const reviews = [
    {
      name: "Richard Wilson",
      avatar: "https://placehold.co/80x80.png",
      avatarHint: "man portrait",
      date: "Reviewed 2 Days ago",
      rating: 5,
      recommended: true,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Curabitur non nulla sit amet nisl tempus",
      reply: {
        name: "Dr. Darren Elder",
        avatar: "https://placehold.co/80x80.png",
        avatarHint: "male doctor",
        date: "Reviewed 2 Days ago",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Curabitur non nulla sit amet nisl tempus",
      }
    },
];

const PricingTabContent = ({ doctor }: { doctor: DoctorProfile }) => {
  if (doctor.pricingModel === 'free') {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold">Free Consultation</h3>
        <p className="text-muted-foreground mt-2">This doctor offers consultations at no cost.</p>
        <div className="flex justify-center gap-4 mt-4">
          {doctor.freeMethods?.video && <Badge variant="outline">Video Call</Badge>}
          {doctor.freeMethods?.voice && <Badge variant="outline">Voice Call</Badge>}
          {doctor.freeMethods?.chat && <Badge variant="outline">Chat</Badge>}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Duration</TableHead>
            <TableHead className="text-center">Video Call</TableHead>
            <TableHead className="text-center">Voice Call</TableHead>
            <TableHead className="text-center">Chat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {['15', '30', '45', '60'].map(duration => (
            <TableRow key={duration}>
              <TableCell className="font-medium">{duration} mins</TableCell>
              {(['video', 'voice', 'chat'] as const).map(method => {
                const price = doctor.customPricing?.[method]?.[duration as '15'|'30'|'45'|'60'];
                return (
                  <TableCell key={method} className="text-center">
                    {price && price > 0 ? `₦${price.toFixed(2)}` : <span className="text-muted-foreground">-</span>}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};


function DoctorProfileContent() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("id");
  const appointmentIdToEdit = searchParams.get("edit"); // New param
  const [doctor, setDoctor] = React.useState<DoctorProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isAboutMeExpanded, setIsAboutMeExpanded] = React.useState(false);
  const [selectedDuration, setSelectedDuration] = React.useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = React.useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!doctorId) {
      setError("No doctor ID provided.");
      setLoading(false);
      return;
    }

    const fetchDoctorProfile = async () => {
      try {
        const response = await fetch(`/api/doctors/${doctorId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch doctor profile.");
        }
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
  
  const aboutMeText = doctor?.aboutMe || 'No biography available.';
  const canTruncate = aboutMeText.length > 250;
  const truncatedAboutMe = canTruncate ? `${aboutMeText.substring(0, 250)}...` : aboutMeText;

  const getUpcomingWeek = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);
        days.push(nextDay);
    }
    return days;
  };

  const toYYYYMMDD = (date: Date) => {
    return date.toISOString().split('T')[0];
  }
  
  const getPricePerHour = (doctor: DoctorProfile | null): string => {
    if (!doctor) return "N/A";
    if (doctor.pricingModel === 'free') return "Free";
    const price = doctor.customPricing?.video?.[60];
    return price && price > 0 ? `₦${price.toFixed(2)} per hour` : "Not set";
  }

  const consultationOptions = [
      { method: 'Video Call', methodKey: 'video', icon: Video },
      { method: 'Voice Call', methodKey: 'voice', icon: Phone },
      { method: 'Chat', methodKey: 'chat', icon: MessageCircle },
  ] as const;
  
  const handleDurationChange = (duration: string) => {
    setSelectedDuration(duration);
    setSelectedMethod(null); // Reset method when duration changes
    setSelectedPrice(null);
  };
  
  const handleMethodChange = (method: string) => {
    if (!doctor || !selectedDuration) return;

    setSelectedMethod(method);

    if (doctor.pricingModel === 'free') {
        setSelectedPrice(0);
        return;
    }

    const methodOption = consultationOptions.find(opt => opt.method === method);
    if (!methodOption) {
        setSelectedPrice(null);
        return;
    }
    const methodKey = methodOption.methodKey;
    const price = doctor.customPricing?.[methodKey]?.[selectedDuration as '15'|'30'|'45'|'60'] ?? null;
    setSelectedPrice(price);
  };
  
  const isMethodAvailableForDuration = (methodKey: 'video' | 'voice' | 'chat') => {
    if (!doctor || !selectedDuration) return false;
    if (doctor.pricingModel === 'free') {
        return doctor.freeMethods?.[methodKey];
    }
    const price = doctor.customPricing?.[methodKey]?.[selectedDuration as '15'|'30'|'45'|'60'];
    return price !== undefined && price > 0;
  };


  if (loading) {
    return (
        <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        <Skeleton className="w-[150px] h-[150px] rounded-lg" />
                        <div className="flex-grow space-y-3">
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-5 w-1/4" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!doctor) {
    return <div className="text-center py-10">Doctor not found.</div>;
  }
  
  const getYearsOfExperience = (startDate: string) => {
      if (!startDate) return 'N/A';
      const start = new Date(startDate);
      const now = new Date();
      let years = now.getFullYear() - start.getFullYear();
      const m = now.getMonth() - start.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < start.getDate())) {
          years--;
      }
      return `${years} years`;
  }
  
  const formatTo12Hour = (time24: string) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const getRequestAppointmentUrl = () => {
    const params = new URLSearchParams({
        doctorId: doctor.uid,
        method: selectedMethod || '',
        duration: selectedDuration || '',
        price: selectedPrice?.toString() || '0',
    });
    if (appointmentIdToEdit) {
        params.set('edit', appointmentIdToEdit);
    }
    return `/patients/request-appointment?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Home / Doctor Profile</p>
        <h1 className="text-3xl font-bold">Doctor Profile</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <Image
                src={doctor.imageUrl || "https://placehold.co/150x150.png"}
                alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                width={150}
                height={150}
                className="rounded-lg border object-cover"
                data-ai-hint="male doctor"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold">Dr. {doctor.firstName} {doctor.lastName}</h2>
              <p className="text-muted-foreground">{doctor.education?.[0]?.degree}, {doctor.education?.[0]?.college}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-primary font-semibold">{doctor.specialty || 'General Practice'}</span>
              </div>
              <div className="mt-2">
                <StarRating rating={doctor.rating || 0} count={doctor.reviews || 0} />
              </div>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{doctor.lga || 'N/A'}, {doctor.stateOfResidence || 'N/A'}</span>
              </div>
              {doctor.language && (
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <Languages className="h-4 w-4" />
                    <span>{doctor.language}</span>
                </div>
              )}
              {doctor.specializations && doctor.specializations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {doctor.specializations.slice(0, 2).map((spec, i) => (
                    <span key={i} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{spec}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="md:w-64 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><ThumbsUp className="h-4 w-4 text-muted-foreground" /> <span>{doctor.rating ? `${doctor.rating * 20}%` : 'N/A'}</span></div>
                  <div className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-muted-foreground" /> <span>{doctor.reviews} Feedback</span></div>
                </div>
                 <div className="flex items-center gap-2 mt-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /> <span>{doctor.lga}, {doctor.stateOfResidence}</span></div>
                 <div className="flex items-center gap-2 mt-2 text-sm"><DollarSign className="h-4 w-4" /> <span>{getPricePerHour(doctor)}</span></div>
                 <div className="flex justify-start gap-2 mt-4">
                    <Button variant="outline" size="icon"><Bookmark /></Button>
                    <Link href="/patients/messages">
                      <Button variant="outline" size="icon"><MessageCircle /></Button>
                    </Link>
                    <Link href="/patients/voice-call">
                      <Button variant="outline" size="icon"><Phone /></Button>
                    </Link>
                    <Link href="/patients/video-call">
                      <Button variant="outline" size="icon"><Video /></Button>
                    </Link>
                 </div>
              </div>
              <div className="mt-4 space-y-4">
                  <h3 className="font-semibold mb-2">Select Consultation</h3>
                  <div>
                      <Label>Select Duration</Label>
                      <Select onValueChange={handleDurationChange}>
                          <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                              {['15', '30', '45', '60'].map(duration => (
                                  <SelectItem key={duration} value={duration}>{duration} mins</SelectItem>
                              ))}
                          </SelectContent>
                      </Select>
                  </div>

                  {selectedDuration && (
                      <div>
                          <Label>Select Method</Label>
                           <RadioGroup onValueChange={handleMethodChange} value={selectedMethod || ""} className="space-y-2 mt-2">
                              {consultationOptions.map(option => {
                                const isAvailable = isMethodAvailableForDuration(option.methodKey);
                                const price = isAvailable ? (doctor.pricingModel === 'free' ? 0 : doctor.customPricing?.[option.methodKey]?.[selectedDuration as '15'|'30'|'45'|'60'] ?? 0) : 0;

                                return (
                                  <Label 
                                    key={option.methodKey} 
                                    htmlFor={option.methodKey} 
                                    className={cn(
                                        "flex items-center gap-2 rounded-md border p-2 cursor-pointer hover:bg-accent has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary",
                                        !isAvailable && "opacity-50 cursor-not-allowed"
                                    )}
                                  >
                                      <RadioGroupItem value={option.method} id={option.methodKey} disabled={!isAvailable} />
                                      <option.icon className="w-5 h-5 text-muted-foreground" />
                                      <span className="flex-grow">{option.method}</span>
                                      <span className="font-semibold">{isAvailable ? (price > 0 ? `₦${price}` : 'Free') : 'N/A'}</span>
                                  </Label>
                                )
                              })}
                          </RadioGroup>
                      </div>
                  )}
              </div>

              <Button asChild className="w-full bg-cyan-500 hover:bg-cyan-600 text-white mt-4" disabled={!selectedMethod || !selectedDuration}>
                <Link href={getRequestAppointmentUrl()}>
                    Request Appointment
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview">
        <TabsList className="bg-transparent border-b rounded-none p-0">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="business-hours">Business Hours</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-8">
              <div>
                <h3 className="text-lg font-semibold">About Me</h3>
                <p className="mt-2 text-muted-foreground whitespace-pre-line">
                    {isAboutMeExpanded ? aboutMeText : truncatedAboutMe}
                </p>
                {canTruncate && (
                    <Button variant="link" onClick={() => setIsAboutMeExpanded(!isAboutMeExpanded)} className="p-0 h-auto text-primary">
                        {isAboutMeExpanded ? 'Read Less' : 'Read More'}
                    </Button>
                )}
              </div>
              
              {doctor.education && doctor.education.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold">Education</h3>
                  <ul className="mt-2 space-y-2 list-disc list-inside text-muted-foreground">
                    {doctor.education.map((edu, i) => (
                      <li key={i}>{edu.college} - {edu.degree} ({edu.yearStarted} - {edu.yearCompleted})</li>
                    ))}
                  </ul>
                </div>
              )}
               
               {doctor.experience && doctor.experience.length > 0 && (
                 <div>
                    <h3 className="text-lg font-semibold">Work & Experience</h3>
                    <ul className="mt-2 space-y-2 list-disc list-inside text-muted-foreground">
                        {doctor.experience.map((exp, i) => (
                            <li key={i}>{exp.hospital} ({getYearsOfExperience(exp.from)})</li>
                        ))}
                    </ul>
                  </div>
               )}
               
               {doctor.awards && doctor.awards.length > 0 && (
                 <div>
                    <h3 className="text-lg font-semibold mb-4">Awards</h3>
                    <div className="relative border-l-2 border-cyan-200 pl-8 space-y-10">
                        {doctor.awards.map((award, i) => (
                            <div key={i} className="relative">
                                <div className="absolute -left-[42px] top-1 h-4 w-4 rounded-full bg-white border-2 border-cyan-400"></div>
                                <p className="text-sm text-cyan-500">{award.year}</p>
                                <h4 className="font-semibold">{award.name}</h4>
                            </div>
                        ))}
                    </div>
                  </div>
               )}

                {doctor.services && doctor.services.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2">
                        {doctor.services.map((service, i) => (
                            <div key={i} className="flex items-center gap-2 text-muted-foreground">
                                <ArrowRight className="h-4 w-4 text-cyan-500"/>
                                <span>{service}</span>
                            </div>
                        ))}
                    </div>
                  </div>
                )}
               
               {doctor.specializations && doctor.specializations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Specializations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2">
                      {doctor.specializations.map((spec, i) => (
                          <div key={i} className="flex items-center gap-2 text-muted-foreground">
                              <ArrowRight className="h-4 w-4 text-cyan-500"/>
                              <span>{spec}</span>
                          </div>
                      ))}
                  </div>
                </div>
               )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pricing" className="mt-6">
            <Card>
                 <CardContent className="p-6">
                   <PricingTabContent doctor={doctor} />
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-8">
               {reviews.map((review, index) => (
                 <div key={index} className="border-b last:border-b-0 pb-8 last:pb-0">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 shrink-0">
                            <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review.avatarHint} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold">{review.name}</h4>
                                    <p className="text-sm text-muted-foreground">{review.date}</p>
                                </div>
                                <StarRating rating={review.rating} />
                            </div>
                            {review.recommended && (
                                <div className="flex items-center gap-2 mt-2 text-green-600 font-semibold">
                                    <ThumbsUp className="h-4 w-4"/>
                                    <span>I recommend the doctor</span>
                                </div>
                            )}
                            <p className="mt-2 text-muted-foreground">{review.text}</p>
                            {review.reply && (
                                <div className="flex items-start gap-4 mt-6 ml-8 p-4 bg-gray-50 rounded-lg">
                                    <Avatar className="h-12 w-12 shrink-0">
                                        <AvatarImage src={review.reply.avatar} alt={review.reply.name} data-ai-hint={review.reply.avatarHint} />
                                        <AvatarFallback>{review.reply.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold">{review.reply.name}</h4>
                                                <p className="text-sm text-muted-foreground">{review.reply.date}</p>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-muted-foreground">{review.reply.text}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                 </div>
               ))}
               <div className="text-center">
                 <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Show all feedback ({doctor.reviews})</Button>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="business-hours" className="mt-6">
            <Card>
                <CardContent className="p-6">
                    <ul className="space-y-4">
                        {getUpcomingWeek().map((date, index) => {
                            const dateString = toYYYYMMDD(date);
                            // @ts-ignore
                            const slots = doctor.schedule?.[dateString] || [];
                            const isToday = index === 0;

                            return (
                                <li key={date.toISOString()} className="flex justify-between items-center border-b pb-4 last:border-b-0">
                                    <div>
                                        <p className="font-semibold">{isToday ? "Today" : date.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                                        <p className="text-sm text-muted-foreground">{date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</p>
                                    </div>
                                    <div className="text-right">
                                        {slots.length > 0 ? (
                                            <>
                                                <div className="flex flex-wrap gap-2 justify-end">
                                                    {slots.map((slot: { start: string; end: string; }, i: number) => (
                                                        <Badge key={i} variant="outline" className="text-cyan-600 border-cyan-200 bg-cyan-50">
                                                            {formatTo12Hour(slot.start)} - {formatTo12Hour(slot.end)}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                {isToday && <Badge className="bg-green-100 text-green-800 mt-2">Open Now</Badge>}
                                            </>
                                        ) : (
                                            <Badge variant="destructive" className="bg-red-100 text-red-800">Closed</Badge>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                        {(!doctor.schedule || Object.keys(doctor.schedule).length === 0) && (
                            <p className="text-muted-foreground text-center py-4">No schedule set by the doctor.</p>
                        )}
                    </ul>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function DoctorProfilePage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <DoctorProfileContent />
        </React.Suspense>
    )
}
