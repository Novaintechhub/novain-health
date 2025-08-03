
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Printer, Eye } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type MedicalRecord = {
  id: string;
  date: string;
  description: string;
  attachment: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatarUrl: string;
  doctorAvatarHint: string;
};

export default function MedicalRecords() {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const response = await fetch('/api/medical-records');
        const data = await response.json();
        setMedicalRecords(data);
      } catch (error) {
        console.error('Failed to fetch medical records:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecords();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Medical Records</h1>
        <Tabs defaultValue="medical-records">
            <TabsList className="grid w-full grid-cols-4 max-w-lg">
                <Link href="/patients/appointments"><TabsTrigger value="appointments" className="w-full">Appointments</TabsTrigger></Link>
                <Link href="/patients/prescriptions"><TabsTrigger value="prescriptions" className="w-full">Prescriptions</TabsTrigger></Link>
                <TabsTrigger value="medical-records">Medical Records</TabsTrigger>
                <Link href="/patients/billing"><TabsTrigger value="billing" className="w-full">Billing</TabsTrigger></Link>
            </TabsList>
            <TabsContent value="medical-records">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="p-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white rounded-lg shadow-sm">
                    <CardContent className="p-0">
                        {/* Desktop View */}
                        <div className="hidden md:block">
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
                        </div>
                        {/* Mobile View */}
                        <div className="md:hidden space-y-4 p-4">
                            {medicalRecords.map((record, index) => (
                                <Card key={index} className="shadow-md">
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold">{record.description}</h3>
                                                <p className="text-sm text-muted-foreground">{record.id} - {record.date}</p>
                                            </div>
                                        </div>
                                        <div className="border-t pt-3 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Attachment:</span>
                                                <Link href="#" className="font-medium text-blue-600 hover:underline">{record.attachment}</Link>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-muted-foreground">Created by:</span>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={record.doctorAvatarUrl} alt={record.doctorName} data-ai-hint={record.doctorAvatarHint} />
                                                        <AvatarFallback>{record.doctorName.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{record.doctorName}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-end border-t pt-3">
                                            <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                                <Printer className="w-4 h-4 mr-1" /> Print
                                            </Button>
                                            <Button variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                                                <Eye className="w-4 h-4 mr-1" /> View
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
              )}
            </TabsContent>
        </Tabs>
    </div>
  );
}
