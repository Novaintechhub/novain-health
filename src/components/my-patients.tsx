"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const patients = [
  {
    id: "P0017",
    name: "Tosin Adebayo",
    location: "New York, United States",
    gender: "Female",
    age: "29 Years",
    genotype: "AS",
    bloodGroup: "AB+",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait",
  },
  {
    id: "P0018",
    name: "Tosin Adebayo",
    location: "New York, United States",
    gender: "Female",
    age: "29 Years",
    genotype: "AS",
    bloodGroup: "AB+",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait",
  },
  {
    id: "P0019",
    name: "Tosin Adebayo",
    location: "New York, United States",
    gender: "Female",
    age: "29 Years",
    genotype: "AS",
    bloodGroup: "AB+",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait",
  },
  {
    id: "P0020",
    name: "Tosin Adebayo",
    location: "New York, United States",
    gender: "Female",
    age: "29 Years",
    genotype: "AS",
    bloodGroup: "AB+",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait",
  },
  {
    id: "P0021",
    name: "Tosin Adebayo",
    location: "New York, United States",
    gender: "Female",
    age: "29 Years",
    genotype: "AS",
    bloodGroup: "AB+",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait",
  },
  {
    id: "P0022",
    name: "Tosin Adebayo",
    location: "New York, United States",
    gender: "Female",
    age: "29 Years",
    genotype: "AS",
    bloodGroup: "AB+",
    avatarUrl: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait",
  },
];

const PatientCard = ({ patient }: { patient: (typeof patients)[0] }) => (
  <Card className="bg-white rounded-lg shadow-sm">
    <CardContent className="p-6 flex flex-col items-center">
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src={patient.avatarUrl} alt={patient.name} data-ai-hint={patient.avatarHint} />
        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <p className="font-bold text-lg">{patient.name}</p>
      <p className="text-sm text-muted-foreground">Patient ID: {patient.id}</p>
      <p className="text-sm text-muted-foreground mb-4">{patient.location}</p>
      <Separator className="my-4" />
      <div className="w-full space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Gender</span>
          <span>{patient.gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Age</span>
          <span>{patient.age}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Genotype</span>
          <span>{patient.genotype}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-600">Blood Group</span>
          <span>{patient.bloodGroup}</span>
        </div>
      </div>
      <Button className="mt-6 w-full bg-cyan-400 hover:bg-cyan-500 text-white">
        Read More
      </Button>
    </CardContent>
  </Card>
);

export default function MyPatients() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Patients</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
}
