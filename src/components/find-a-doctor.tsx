
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, CheckCircle2, Star, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type Doctor = {
  name: string;
  specialty: string;
  image: string;
  hint: string;
  verified: boolean;
  rating: number;
  reviews: number;
  location: string;
  availability: string;
  price: string;
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

export default function FindADoctor() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await fetch('/api/doctors');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <header className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Find the best doctors for your health needs</h1>
          <p className="mt-2 text-lg text-indigo-200">Book appointments with ease</p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card className="shadow-lg -mt-20 relative z-10">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Based on your Location"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Search Doctors or Specialization</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="e.g. Dentist, Sugar checkup, etc"
                    className="pl-10"
                  />
                </div>
              </div>
              <Button style={{ backgroundColor: '#D90067' }} className="w-full text-white">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-wrap items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-700">Filter by:</h3>
            <Select>
                <SelectTrigger className="w-full sm:w-[180px] bg-white">
                    <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-full sm:w-[220px] bg-white">
                    <SelectValue placeholder="Area of specialization" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="dental">Dental</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                </SelectContent>
            </Select>
            <div className="flex-grow"></div>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
                 <Select>
                    <SelectTrigger className="w-full sm:w-[160px] bg-white">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="popular">Popular</SelectItem>
                        <SelectItem value="latest">Latest</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        
        {loading ? (
           <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex justify-between mt-4">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <Card
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-48 object-cover"
                  data-ai-hint={doctor.hint}
                />
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center">
                    <h4 className="text-lg font-bold text-gray-800">{doctor.name}</h4>
                    {doctor.verified && <CheckCircle2 className="w-4 h-4 text-green-500 ml-1 shrink-0" />}
                  </div>
                  <p className="text-muted-foreground text-xs mt-1 h-8">{doctor.specialty}</p>
                  
                  <div className="flex items-center mt-2">
                      <StarRating rating={doctor.rating} />
                      <span className="text-xs text-muted-foreground ml-2">({doctor.reviews} reviews)</span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-600 border-t pt-4">
                      <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{doctor.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{doctor.availability}</span>
                      </div>
                      <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className={`font-semibold ${doctor.price === 'Free' ? 'text-green-600' : 'text-gray-800'}`}>{doctor.price}</span>
                      </div>
                  </div>
                  
                  <div className="mt-auto pt-4 flex gap-2 w-full">
                    <Button asChild variant="outline" className="w-full text-cyan-500 border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600">
                      <Link href="/patients/doctor-profile">View Profile</Link>
                    </Button>
                    <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white">Book Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">Load More</Button>
        </div>
      </main>
    </div>
  );
}
