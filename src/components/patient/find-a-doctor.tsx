
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, Heart, MapPin, Star, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import type { DoctorProfile } from "@/lib/types";

const StarRating = ({ rating, reviewCount }: { rating: number, reviewCount: number }) => (
  <div className="flex items-center gap-1">
    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
    <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
    <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
  </div>
);


const DoctorCard = ({ doctor }: { doctor: DoctorProfile }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-4">
      <div className="flex items-start gap-4">
        <div className="relative">
            <Avatar className="h-24 w-24 border">
                <AvatarImage src={doctor.imageUrl} alt={`Dr. ${doctor.firstName} ${doctor.lastName}`} data-ai-hint="doctor portrait" />
                <AvatarFallback>{doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="icon" className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full bg-white">
                <Heart className="h-4 w-4" />
            </Button>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">Dr. {doctor.firstName} {doctor.lastName}</h3>
            {doctor.isVerified && <CheckCircle2 className="w-5 h-5 text-green-500" />}
          </div>
          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
          <div className="mt-2">
            <StarRating rating={doctor.rating || 0} reviewCount={doctor.reviews || 0} />
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{doctor.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
        <ThumbsUp className="w-4 h-4" />
        <p>98% ({doctor.reviews} patients)</p>
      </div>
    </CardContent>
    <CardFooter className="bg-gray-50/50 p-4 flex justify-between items-center">
        <div>
            <p className="text-xs text-muted-foreground">Available on</p>
            <p className="font-semibold text-sm">{doctor.availability}</p>
        </div>
        <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
            <Link href={`/patients/doctor-profile?id=${doctor.uid}`}>Book Now</Link>
        </Button>
    </CardFooter>
  </Card>
);

const DoctorCardSkeleton = () => (
    <Card>
        <CardContent className="p-4">
            <div className="flex items-start gap-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
             <Skeleton className="h-4 w-1/4 mt-4" />
        </CardContent>
        <CardFooter className="bg-gray-50/50 p-4 flex justify-between items-center">
            <div className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-10 w-24" />
        </CardFooter>
    </Card>
)

export default function FindADoctor() {
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
        try {
            const response = await fetch('/api/doctors');
            if(!response.ok) throw new Error("Failed to fetch doctors");
            const data = await response.json();
            setDoctors(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    fetchDoctors();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input placeholder="Search by name, specialty..." className="md:col-span-2" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => <DoctorCardSkeleton key={i} />)
        ) : (
          doctors.map((doctor) => <DoctorCard key={doctor.uid} doctor={doctor} />)
        )}
      </div>
    </div>
  );
}
