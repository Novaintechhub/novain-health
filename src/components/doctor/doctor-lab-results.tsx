
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

type LabTest = {
  testName: string;
  date: string;
  status: string;
  patientName: string;
  patientAvatarUrl: string;
  patientAvatarHint: string;
};

// Mock data, in a real app this would come from an API
const labTestsData: LabTest[] = [
    {
        testName: "Complete Blood Count (CBC)",
        date: "14 Nov 2023",
        status: "Completed",
        patientName: "Charlene Reed",
        patientAvatarUrl: "https://placehold.co/40x40.png",
        patientAvatarHint: "woman smiling",
    },
    {
        testName: "Lipid Panel",
        date: "18 Nov 2023",
        status: "Completed",
        patientName: "Travis Trimble",
        patientAvatarUrl: "https://placehold.co/40x40.png",
        patientAvatarHint: "male doctor portrait",
    },
    {
        testName: "Thyroid Stimulating Hormone (TSH)",
        date: "21 Nov 2023",
        status: "Pending Review",
        patientName: "Carl Kelly",
        patientAvatarUrl: "https://placehold.co/40x40.png",
        patientAvatarHint: "man portrait",
    },
];


const StatusBadge = ({ status }: { status: string }) => {
  const statusClasses: { [key: string]: string } = {
    Completed: 'bg-green-100 text-green-800',
    'Pending Review': 'bg-yellow-100 text-yellow-800',
  };

  return <Badge className={`capitalize ${statusClasses[status] || ''}`}>{status}</Badge>;
};

export default function DoctorLabResults() {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
        setLabTests(labTestsData);
        setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Lab Results</h1>
        <Card className="bg-white rounded-lg shadow-sm">
            <CardContent className="p-0">
              {loading ? (
                <div className="p-4 space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {/* Desktop View */}
                  <div className="hidden md:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Test Name</TableHead>
                                <TableHead>Date Uploaded</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Patient</TableHead>
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
                                                <AvatarImage src={test.patientAvatarUrl} alt={test.patientName} data-ai-hint={test.patientAvatarHint} />
                                                <AvatarFallback>{test.patientName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{test.patientName}</span>
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
                  </div>
                  {/* Mobile View */}
                  <div className="md:hidden space-y-4 p-4">
                    {labTests.map((test, index) => (
                      <Card key={index} className="shadow-md">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold">{test.testName}</h3>
                            <StatusBadge status={test.status} />
                          </div>
                          <p className="text-sm text-muted-foreground">{test.date}</p>
                          
                          <div className="border-t pt-3">
                            <p className="text-xs text-muted-foreground mb-2">Patient:</p>
                             <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={test.patientAvatarUrl} alt={test.patientName} data-ai-hint={test.patientAvatarHint} />
                                    <AvatarFallback>{test.patientName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold">{test.patientName}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 justify-end border-t pt-3">
                            <Button variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                            </Button>
                            <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                <Download className="w-4 h-4 mr-1" />
                                Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
        </Card>
    </div>
  );
}
