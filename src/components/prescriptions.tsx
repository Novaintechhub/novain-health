
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Printer, Eye } from "lucide-react";
import Link from "next/link";

const prescriptions = [
  {
    date: "14 Nov 2019",
    name: "Prescription 1",
    doctorName: "Dr. Ruby Perrin",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor",
  },
  {
    date: "13 Nov 2019",
    name: "Prescription 2",
    doctorName: "Dr. Darren Elder",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor",
  },
  {
    date: "12 Nov 2019",
    name: "Prescription 3",
    doctorName: "Dr. Deborah Angel",
    doctorSpecialty: "Cardiology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor portrait",
  },
  {
    date: "11 Nov 2019",
    name: "Prescription 4",
    doctorName: "Dr. Sofia Brient",
    doctorSpecialty: "Urology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor smiling",
  },
  {
    date: "10 Nov 2019",
    name: "Prescription 5",
    doctorName: "Dr. Marvin Campbell",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor portrait",
  },
   {
    date: "9 Nov 2019",
    name: "Prescription 6",
    doctorName: "Dr. Katharine Berthold",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor glasses",
  },
];

export default function Prescriptions() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Prescriptions</h1>
        <Tabs defaultValue="prescriptions">
            <TabsList className="grid w-full grid-cols-4 max-w-lg">
                <Link href="/patients/appointments" className="w-full"><TabsTrigger value="appointments" className="w-full">Appointments</TabsTrigger></Link>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="prescriptions">
                <Card className="bg-white rounded-lg shadow-sm">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Created by</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {prescriptions.map((prescription, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{prescription.date}</TableCell>
                                        <TableCell>{prescription.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={prescription.doctorAvatarUrl} alt={prescription.doctorName} data-ai-hint={prescription.doctorAvatarHint} />
                                                    <AvatarFallback>{prescription.doctorName.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{prescription.doctorName}</div>
                                                    <div className="text-sm text-muted-foreground">{prescription.doctorSpecialty}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                                    <Printer className="w-4 h-4 mr-1" />
                                                    Print
                                                </Button>
                                                <Button variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    View
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
