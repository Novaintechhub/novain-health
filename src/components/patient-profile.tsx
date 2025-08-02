
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const patient = {
  name: "Tosin Chukwuka",
  patientId: "P0016",
  dob: "24 Jul 1983",
  age: 38,
  address: "Newyork, USA",
  email: "tosin.c@novain.com",
  phone: "+1 929-265-5154",
  bloodGroup: "AB-",
  genotype: "AA",
  avatarUrl: "https://placehold.co/128x128.png",
  avatarHint: "woman portrait",
};

const medicalRecords = [
    { name: "Blood Test Results", date: "22 Aug 2024", doctor: "Dr. Susan Mandible" },
    { name: "MRI Scan Report", date: "15 Jul 2024", doctor: "Dr. Leke Alder" },
];

export default function PatientProfile() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={patient.avatarUrl} alt={patient.name} data-ai-hint={patient.avatarHint}/>
                <AvatarFallback>{patient.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{patient.name}</h2>
              <p className="text-muted-foreground">Patient ID: {patient.patientId}</p>
            </div>
            <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-600">Date of Birth</span>
                    <span>{patient.dob} ({patient.age} years)</span>
                </div>
                 <div className="flex justify-between">
                    <span className="font-semibold text-gray-600">Address</span>
                    <span>{patient.address}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-600">Email</span>
                    <span className="truncate">{patient.email}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="font-semibold text-gray-600">Phone</span>
                    <span>{patient.phone}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-gray-600">Blood Group</span>
                    <span>{patient.bloodGroup}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="font-semibold text-gray-600">Genotype</span>
                    <span>{patient.genotype}</span>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Tosin Chukwuka is a 38-year-old patient registered at NovainHealth. She has been actively managing her health through regular check-ups and consultations. Her medical records are consistently updated, and she maintains a proactive approach to her well-being.
            </p>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Medical Records</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {medicalRecords.map((record, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/50">
                            <div className="flex items-center gap-4">
                                <FileText className="h-6 w-6 text-primary"/>
                                <div>
                                    <p className="font-semibold">{record.name}</p>
                                    <p className="text-sm text-muted-foreground">{record.date} - by {record.doctor}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon">
                                <Download className="h-5 w-5"/>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

