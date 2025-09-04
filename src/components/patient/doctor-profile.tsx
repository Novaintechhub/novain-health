
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, ThumbsUp, MessageCircle, DollarSign, Bookmark, Phone, Video, CheckCircle, ArrowRight, Reply, ThumbsDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type DoctorProfile } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

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

const locations = [
    {
      name: "Smile Cute Dental Care Center",
      specialty: "MDS - Periodontology and Oral Implantology, BDS",
      rating: 4,
      reviewCount: 4,
      address: "2286 Sundown Lane, Austin, Texas 78749, USA",
      images: [
        { src: "https://placehold.co/80x80.png", hint: "dental clinic" },
        { src: "https://placehold.co/80x80.png", hint: "dental equipment" },
        { src: "https://placehold.co/80x80.png", hint: "dentist patient" },
        { src: "https://placehold.co/80x80.png", hint: "dental chair" },
      ],
      hours: [
        { days: "Mon - Sat", time: "10:00 AM - 2:00 PM\n4:00 PM - 9:00 PM" },
        { days: "Sun", time: "10:00 AM - 2:00 PM" },
      ],
      price: 250,
    },
    {
      name: "The Family Dentistry Clinic",
      specialty: "MDS - Periodontology and Oral Implantology, BDS",
      rating: 4,
      reviewCount: 4,
      address: "2883 University Street, Seattle, Texas Washington, 98155",
      images: [
        { src: "https://placehold.co/80x80.png", hint: "clinic reception" },
        { src: "https://placehold.co/80x80.png", hint: "medical tools" },
        { src: "https://placehold.co/80x80.png", hint: "doctor with patient" },
        { src: "https://placehold.co/80x80.png", hint: "operating room" },
      ],
      hours: [
        { days: "Tue - Fri", time: "11:00 AM - 1:00 PM\n6:00 PM - 11:00 PM" },
        { days: "Sat - Sun", time: "8:00 AM - 10:00 AM\n3:00 PM - 7:00 PM" },
      ],
      price: 350,
    },
  ];

function DoctorProfileContent() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("id");
  const [doctor, setDoctor] = React.useState<DoctorProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isAboutMeExpanded, setIsAboutMeExpanded] = React.useState(false);

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

  const formatTo12Hour = (time24: string) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    const formattedMinutes = minutes.padStart(2, '0');
    return `${h12}:${formattedMinutes} ${ampm}`;
  };

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };
  
  const today = new Date().toISOString().split('T')[0];
  const todayDayName = getDayOfWeek(today);

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
                <span>{doctor.city || 'N/A'}, {doctor.stateOfResidence || 'N/A'} - <a href="#" className="text-primary hover:underline">Get Directions</a></span>
              </div>
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
                 <div className="flex items-center gap-2 mt-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /> <span>{doctor.city}, {doctor.stateOfResidence}</span></div>
                 <div className="flex items-center gap-2 mt-2 text-sm"><span className="font-bold text-lg">₦</span> <span>{doctor.pricing === 'Free' ? 'Free' : `${doctor.pricing} per hour`}</span></div>
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
              <Button asChild className="w-full bg-cyan-500 hover:bg-cyan-600 text-white mt-4">
                <Link href={`/patients/request-appointment?doctorId=${doctor.uid}`}>Request Appointment</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview">
        <TabsList className="bg-transparent border-b rounded-none p-0">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
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
        <TabsContent value="locations" className="mt-6">
            <Card>
                 <CardContent className="p-0">
                    {locations.map((location, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-b last:border-b-0">
                            <div className="md:col-span-1 space-y-2">
                                <h4 className="text-lg font-bold">{location.name}</h4>
                                <p className="text-sm text-muted-foreground">{location.specialty}</p>
                                <StarRating rating={location.rating} count={location.reviewCount} />
                                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                    <span>{location.address}</span>
                                </div>
                                <a href="#" className="text-sm text-cyan-500 hover:underline">Get Directions</a>
                                <div className="flex gap-2 pt-2">
                                    {location.images.map((image, i) => (
                                        <Image key={i} src={image.src} alt={`clinic photo ${i + 1}`} width={60} height={60} className="rounded-md object-cover" data-ai-hint={image.hint} />
                                    ))}
                                </div>
                            </div>
                            <div className="md:col-span-1 space-y-2">
                                {location.hours.map((hour, i) => (
                                    <div key={i}>
                                        <p className="font-semibold">{hour.days}</p>
                                        <p className="text-sm text-muted-foreground whitespace-pre-line">{hour.time}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="md:col-span-1 text-right">
                                <p className="text-2xl font-bold">₦{location.price}</p>
                            </div>
                        </div>
                    ))}
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
                        {doctor.schedule && Object.entries(doctor.schedule).map(([date, slots]) => {
                             const dayName = getDayOfWeek(date);
                             const isToday = date === today;
                             return (
                                <li key={date} className="flex justify-between items-center border-b pb-4 last:border-b-0">
                                    <div>
                                        <p className="font-semibold">{isToday ? "Today" : dayName}</p>
                                        <p className="text-sm text-muted-foreground">{new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    </div>
                                    <div className="text-right">
                                    {slots.length > 0 ? (
                                        <>
                                            <p className="text-sm text-muted-foreground">
                                                {slots.map(slot => `${formatTo12Hour(slot.start)} - ${formatTo12Hour(slot.end)}`).join(', ')}
                                            </p>
                                            {isToday && <Badge className="bg-green-100 text-green-800 mt-1">Open Now</Badge>}
                                        </>
                                    ) : (
                                        <Badge variant="destructive" className="bg-red-100 text-red-800">Closed</Badge>
                                    )}
                                    </div>
                                </li>
                             )
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
