
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, Star, MapPin, ThumbsUp, GraduationCap, Briefcase, Award, Users, BadgeCheck, Video, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DoctorProfile } from "@/lib/types";

const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
    ))}
    <span className="text-sm font-semibold ml-2">{rating.toFixed(1)}</span>
    <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
  </div>
);

const DoctorProfileContent = () => {
    const searchParams = useSearchParams();
    const doctorId = searchParams.get('id');
    const [doctor, setDoctor] = useState<DoctorProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!doctorId) {
            setLoading(false);
            return;
        }
        async function fetchDoctorProfile() {
            try {
                const response = await fetch(`/api/doctors/${doctorId}`);
                if (!response.ok) throw new Error("Failed to fetch doctor profile");
                const data = await response.json();
                setDoctor(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchDoctorProfile();
    }, [doctorId]);
    
    if (loading) {
        return <Skeleton className="w-full h-[500px]" />;
    }

    if (!doctor) {
        return <p>Doctor not found.</p>;
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1 flex justify-center">
                            <Avatar className="h-40 w-40 border-4 border-white shadow-lg">
                                <AvatarImage src={doctor.imageUrl} alt={`Dr. ${doctor.firstName} ${doctor.lastName}`} />
                                <AvatarFallback className="text-4xl">{doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="md:col-span-2 space-y-3">
                            <div className="flex items-center gap-2">
                                <h1 className="text-3xl font-bold">Dr. {doctor.firstName} {doctor.lastName}</h1>
                                {doctor.isVerified && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                            </div>
                            <p className="text-muted-foreground">{doctor.specialty}</p>
                            <StarRating rating={doctor.rating || 0} reviewCount={doctor.reviews || 0} />
                             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{doctor.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-600">
                                <ThumbsUp className="w-4 h-4" />
                                <p>98% ({doctor.reviews} patients)</p>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2">
                                <Button size="sm" variant="outline" className="text-blue-500 border-blue-500"><Phone className="mr-2 h-4 w-4"/> Audio Call</Button>
                                <Button size="sm" variant="outline" className="text-green-500 border-green-500"><Video className="mr-2 h-4 w-4"/> Video Call</Button>
                                <Button size="sm" variant="outline" className="text-purple-500 border-purple-500"><MessageSquare className="mr-2 h-4 w-4"/> Chat</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <Card>
                        <CardContent className="p-6 space-y-6">
                             <div>
                                <h3 className="text-lg font-bold mb-2">About Dr. {doctor.lastName}</h3>
                                <p className="text-muted-foreground">{doctor.aboutMe}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><GraduationCap/> Education</h3>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                        {doctor.education?.map((edu, i) => <li key={i}>{edu.degree}, {edu.college} - {edu.yearCompleted}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Briefcase/> Work & Experience</h3>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                        {doctor.experience?.map((exp, i) => <li key={i}>{exp.designation} at {exp.hospital} ({exp.from} - {exp.to})</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Award/> Awards</h3>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                        {doctor.awards?.map((award, i) => <li key={i}>{award.name} ({award.year})</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Users/> Memberships</h3>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                        {doctor.memberships?.map((mem, i) => <li key={i}>{mem.organization}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><BadgeCheck/> Registrations</h3>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                        {doctor.registrations?.map((reg, i) => <li key={i}>{reg.registration} - {reg.year}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="reviews">
                    <Card>
                        <CardContent className="p-6">
                            <p>Reviews will be displayed here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
             <Card>
                <CardHeader>
                    <CardTitle>Book an Appointment</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">Select a consultation type and proceed to book your slot.</p>
                    <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
                        <Link href={`/patients/request-appointment?doctorId=${doctor.uid}`}>Book Appointment</Link>
                    </Button>
                </CardContent>
             </Card>
        </div>
    )
}

export default function DoctorProfile() {
    return (
        <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
            <DoctorProfileContent />
        </Suspense>
    )
}
