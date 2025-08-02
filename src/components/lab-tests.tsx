
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";

const labTests = [
  {
    testName: "Complete Blood Count (CBC)",
    date: "14 Nov 2023",
    status: "Completed",
    doctorName: "Dr. Ruby Perrin",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor",
  },
  {
    testName: "Lipid Panel",
    date: "18 Nov 2023",
    status: "Completed",
    doctorName: "Dr. Darren Elder",
    doctorSpecialty: "Dental",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor",
  },
  {
    testName: "Thyroid Stimulating Hormone (TSH)",
    date: "21 Nov 2023",
    status: "Pending",
    doctorName: "Dr. Deborah Angel",
    doctorSpecialty: "Cardiology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor portrait",
  },
  {
    testName: "Urinalysis",
    date: "25 Nov 2023",
    status: "Completed",
    doctorName: "Dr. Sofia Brient",
    doctorSpecialty: "Urology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor smiling",
  },
  {
    testName: "Glucose Tolerance Test",
    date: "28 Nov 2023",
    status: "Pending",
    doctorName: "Dr. Marvin Campbell",
    doctorSpecialty: "Ophthalmology",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor portrait",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  const statusClasses = {
    Completed: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
  };

  return <Badge className={`capitalize ${statusClasses[status as keyof typeof statusClasses] || ''}`}>{status}</Badge>;
};

export default function LabTests() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Lab Tests</h1>
        <Card className="bg-white rounded-lg shadow-sm">
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Test Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Doctor</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {labTests.map((test, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{test.testName}</TableCell>
                                <TableCell>{test.date}</TableCell>
                                <TableCell><StatusBadge status={test.status} /></TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={test.doctorAvatarUrl} alt={test.doctorName} data-ai-hint={test.doctorAvatarHint} />
                                            <AvatarFallback>{test.doctorName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{test.doctorName}</div>
                                            <div className="text-sm text-muted-foreground">{test.doctorSpecialty}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex gap-2 justify-end">
                                        <Button variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                                            <Eye className="w-4 h-4 mr-1" />
                                            View
                                        </Button>
                                        <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                            <Download className="w-4 h-4 mr-1" />
                                            Download
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
