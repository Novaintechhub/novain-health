
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Printer, Download, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const prescriptionData = {
  id: "PRES-001",
  date: "14 Nov 2023",
  doctor: {
    name: "Dr. Darren Elder",
    specialty: "Cardiology",
    clinic: "NovainHealth Medical Center",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "male doctor",
  },
  medications: [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days", instructions: "Take in the morning with food." },
    { name: "Aspirin", dosage: "81mg", frequency: "Once daily", duration: "Ongoing", instructions: "Take with a full glass of water." },
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "90 days", instructions: "Take with breakfast and dinner." },
  ],
  notes: "Patient to monitor blood pressure daily. Follow-up appointment in 3 months."
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
        <CardHeader className="p-0">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div className="flex items-center gap-4">
                <Image src="/logo-icon.png" alt="NovainHealth Logo" width={48} height={48} />
                <div>
                    <CardTitle className="text-2xl">Prescription</CardTitle>
                    <p className="text-muted-foreground">ID: {prescriptionData.id}</p>
                </div>
            </div>
            <div className="text-left sm:text-right mt-4 sm:mt-0">
                <p className="font-semibold">{prescriptionData.doctor.clinic}</p>
                <p className="text-sm text-muted-foreground">Date: {prescriptionData.date}</p>
            </div>
          </div>
        </CardHeader>
        <Separator className="my-6" />
        <CardContent className="p-0">
            <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={prescriptionData.doctor.avatarUrl} alt={prescriptionData.doctor.name} data-ai-hint={prescriptionData.doctor.avatarHint} />
                    <AvatarFallback>{prescriptionData.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm text-muted-foreground">Prescribed by</p>
                    <p className="font-bold text-lg">{prescriptionData.doctor.name}</p>
                    <p className="text-sm text-muted-foreground">{prescriptionData.doctor.specialty}</p>
                </div>
            </div>

            <h3 className="font-semibold mb-4">Medications</h3>
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

           <div className="mt-8">
            <h3 className="font-semibold">Doctor's Notes</h3>
            <p className="text-muted-foreground mt-2">{prescriptionData.notes}</p>
           </div>
        </CardContent>
        <CardFooter className="p-0 mt-8 pt-6 border-t">
            <div className="flex justify-end w-full gap-2">
                <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
