
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search, CheckCircle2 } from "lucide-react";

const doctors = [
  {
    name: "Michael Smith",
    specialty: "MBBS - Gynecology and Pediatric Medicine",
    image: "https://placehold.co/250x250.png",
    hint: "male doctor",
    verified: true,
  },
  {
    name: "Tom Hanky",
    specialty: "BDS, MDS - Oral & Maxillofacial Surgery",
    image: "https://placehold.co/250x250.png",
    hint: "doctor portrait",
    verified: true,
  },
  {
    name: "Leke Alder",
    specialty: "MDS - Periodontology and Oral implantology, BDS",
    image: "https://placehold.co/250x250.png",
    hint: "female doctor",
    verified: true,
  },
  {
    name: "Chisom Agu",
    specialty: "MDS - Periodontology and Oral implantology, BDS",
    image: "https://placehold.co/250x250.png",
    hint: "female doctor glasses",
    verified: true,
  },
  {
    name: "Precious Brownson",
    specialty: "MDS - Periodontology and Oral implantology, BDS",
    image: "https://placehold.co/250x250.png",
    hint: "female doctor looking",
    verified: true,
  },
  {
    name: "Gideon Anthony",
    specialty: "MBBS - Neurosurgeon and Brain Expert",
    image: "https://placehold.co/250x250.png",
    hint: "doctor smiling",
    verified: true,
  },
  {
    name: "Glory Felix",
    specialty: "BDS, MDS - Optometrist, and Eye Surgeon",
    image: "https://placehold.co/250x250.png",
    hint: "woman smiling",
    verified: true,
  },
  {
    name: "Ferdinand Lucios",
    specialty: "MDS - Obsteriology, Oncology, and Dietetics BDS",
    image: "https://placehold.co/250x250.png",
    hint: "male doctor portrait",
    verified: true,
  },
];

export default function FindADoctor() {
  return (
    <div className="bg-gray-50/50">
      <header className="bg-indigo-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Find the best doctors for your health needs</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-4 rounded-lg shadow-md -mt-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search Location"
                className="pl-10"
              />
              <p className="text-xs text-gray-500 mt-1">Based on your Location</p>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search Doctors, Clinics, Hospitals, etc"
                  className="pl-10"
                />
                 <p className="text-xs text-gray-500 mt-1">Example: Dentist, Sugar checkup, Blood test, etc</p>
              </div>
              <Button style={{ backgroundColor: '#D90067' }} size="icon" className="h-10 w-12 self-start">
                <Search className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
            <h3 className="text-lg font-semibold">Search filters</h3>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Area of specialization" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="dental">Dental</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 object-cover rounded-full mb-4"
                data-ai-hint={doctor.hint}
              />
              <div className="flex items-center">
                <h4 className="text-lg font-bold">{doctor.name}</h4>
                {doctor.verified && <CheckCircle2 className="w-4 h-4 text-green-500 ml-1" />}
              </div>
              <p className="text-muted-foreground text-sm mt-1 h-10">{doctor.specialty}</p>
              
              <div className="mt-4 flex gap-2 w-full">
                <Button variant="outline" className="w-full text-cyan-500 border-cyan-500">
                  View Profile
                </Button>
                <Button className="w-full" style={{ backgroundColor: '#38bdf8' }}>Book Now</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
            <Button style={{ backgroundColor: '#38bdf8' }}>Load More</Button>
        </div>
      </main>
    </div>
  );
}
