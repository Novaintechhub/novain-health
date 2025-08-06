
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Printer, Download, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const prescriptionData = {
  doctor: {
    name: "Dr. Ruby Perrin",
    specialty: "Dental",
    clinic: "NovainHealth Dental Care",
    address: "2286 Sundown Lane, Austin, Texas 78749, USA",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "female doctor",
  },
  patient: {
    name: "Tosin Chukwuka",
    age: 38,
    address: "299 Star Trek Drive, Panama City, Florida, 32405, USA",
  },
  prescriptionId: "#2024001",
  date: "14 Nov 2024",
  medications: [
    { name: "Amoxicillin", dosage: "500mg", frequency: "Every 8 hours", duration: "7 days", instructions: "Take with food" },
    { name: "Ibuprofen", dosage: "200mg", frequency: "As needed for pain", duration: "5 days", instructions: "Do not exceed 6 tablets a day" },
    { name: "Chlorhexidine Mouthwash", dosage: "15ml", frequency: "Twice daily", duration: "14 days", instructions: "Do not swallow" },
  ],
};

export default function ViewPrescription() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Prescription Details</h1>
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <Card className="p-4 sm:p-8">
        <CardHeader className="p-0 border-b pb-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={prescriptionData.doctor.avatarUrl} alt={prescriptionData.doctor.name} data-ai-hint={prescriptionData.doctor.avatarHint} />
                  <AvatarFallback>{prescriptionData.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{prescriptionData.doctor.name}</h2>
                  <p className="text-muted-foreground">{prescriptionData.doctor.specialty}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-4">
                <p>{prescriptionData.doctor.clinic}</p>
                <p>{prescriptionData.doctor.address}</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:text-right">
              <Image src="/logo.png" alt="NovainHealth Logo" width={124} height={34} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="font-semibold">Patient</p>
              <p>{prescriptionData.patient.name}</p>
              <p className="text-sm text-muted-foreground">{prescriptionData.patient.address}</p>
            </div>
            <div>
              <p className="font-semibold">Date of Issue</p>
              <p>{prescriptionData.date}</p>
            </div>
            <div>
              <p className="font-semibold">Prescription ID</p>
              <p>{prescriptionData.prescriptionId}</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Instructions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescriptionData.medications.map((med, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{med.name}</TableCell>
                    <TableCell>{med.dosage}</TableCell>
                    <TableCell>{med.frequency}</TableCell>
                    <TableCell>{med.duration}</TableCell>
                    <TableCell>{med.instructions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-12 pt-6 border-t">
            <div className="flex justify-between w-full items-end">
                <div className="text-sm text-muted-foreground">
                    <p><strong>Note:</strong> This is a digital prescription. Present this to your pharmacist.</p>
                </div>
                <div className="text-center">
                    <Image src="https://placehold.co/150x50.png" width={150} height={50} alt="Doctor's Signature" data-ai-hint="signature" />
                    <p className="border-t mt-1 pt-1 font-semibold">{prescriptionData.doctor.name}</p>
                </div>
            </div>
        </CardFooter>
      </Card>
      <div className="flex justify-end gap-2">
          <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white"><Download className="mr-2 h-4 w-4" /> Download</Button>
        </div>
    </div>
  );
}
