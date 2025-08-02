
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Printer, Eye } from "lucide-react";
import Link from "next/link";

const medicalRecords = [
  {
    id: "#MR-0010",
    date: "14 Nov 2019",
    description: "Dental Filling",
    attachment: "dental-test.pdf",
    doctorName: "Dr. Ruby Perrin",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor",
  },
  {
    id: "#MR-0009",
    date: "13 Nov 2019",
    description: "Teeth Cleaning",
    attachment: "dental-test.pdf",
    doctorName: "Dr. Darren Elder",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor",
  },
  {
    id: "#MR-0008",
    date: "12 Nov 2019",
    description: "General Checkup",
    attachment: "cardio-test.pdf",
    doctorName: "Dr. Deborah Angel",
    doctorSpecialty: "Cardiology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor portrait",
  },
  {
    id: "#MR-0007",
    date: "11 Nov 2019",
    description: "General Test",
    attachment: "general-test.pdf",
    doctorName: "Dr. Sofia Brient",
    doctorSpecialty: "Urology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor smiling",
  },
  {
    id: "#MR-0006",
    date: "10 Nov 2019",
    description: "Eye Test",
    attachment: "eye-test.pdf",
    doctorName: "Dr. Marvin Campbell",
    doctorSpecialty: "Ophthalmology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor portrait",
  },
   {
    id: "#MR-0005",
    date: "9 Nov 2019",
    description: "Anaemia",
    attachment: "anaemia-test.pdf",
    doctorName: "Dr. Katharine Berthold",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor glasses",
  },
];

export default function MedicalRecords() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Medical Records</h1>
        <Tabs defaultValue="medical-records">
            <TabsList className="grid w-full grid-cols-4 max-w-lg">
                <Link href="/patients/appointments" className="w-full"><TabsTrigger value="appointments" className="w-full">Appointments</TabsTrigger></Link>
                <Link href="/patients/prescriptions" className="w-full"><TabsTrigger value="prescriptions" className="w-full">Prescriptions</TabsTrigger></Link>
                <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
                <Link href="/patients/billing" className="w-full"><TabsTrigger value="billing" className="w-full">Billing</TabsTrigger></Link>
            </TabsList>
            <TabsContent value="medical-records">
                <Card className="bg-white rounded-lg shadow-sm">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Attachment</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {medicalRecords.map((record, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{record.id}</TableCell>
                                        <TableCell>{record.date}</TableCell>
                                        <TableCell>{record.description}</TableCell>
                                        <TableCell><Link href="#" className="text-blue-600 hover:underline">{record.attachment}</Link></TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={record.doctorAvatarUrl} alt={record.doctorName} data-ai-hint={record.doctorAvatarHint} />
                                                    <AvatarFallback>{record.doctorName.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{record.doctorName}</div>
                                                    <div className="text-sm text-muted-foreground">{record.doctorSpecialty}</div>
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
