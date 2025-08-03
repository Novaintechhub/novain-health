
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type Patient = {
  id: string;
  name: string;
  location: string;
  gender: string;
  age: string;
  genotype: string;
  bloodGroup: string;
  avatarUrl: string;
  avatarHint: string;
};

const PatientCard = ({ patient }: { patient: Patient }) => (
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
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await fetch('/api/my-patients');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Patients</h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex flex-col items-center">
                <Skeleton className="h-24 w-24 rounded-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Separator className="my-4" />
                <div className="w-full space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-10 w-full mt-6" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
}
