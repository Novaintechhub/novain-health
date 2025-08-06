
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type Prescription = {
  date: string;
  name: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatarUrl: string;
  doctorAvatarHint: string;
};

export default function DoctorPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrescriptions() {
      try {
        const response = await fetch('/api/prescriptions');
        const data = await response.json();
        setPrescriptions(data);
      } catch (error) {
        console.error('Failed to fetch prescriptions:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPrescriptions();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Prescriptions</h1>
        <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
          <Link href="/doctor/create-prescription">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Prescription
          </Link>
        </Button>
      </div>
        <Tabs defaultValue="prescriptions">
            <TabsList className="grid w-full grid-cols-4 max-w-lg">
                <Link href="/doctor/appointments"><TabsTrigger value="appointments" className="w-full">Appointments</TabsTrigger></Link>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                <Link href="/doctor/medical-records"><TabsTrigger value="medical-records" className="w-full">Medical Records</TabsTrigger></Link>
                <Link href="/doctor/billing"><TabsTrigger value="billing" className="w-full">Billing</TabsTrigger></Link>
            </TabsList>
            <TabsContent value="prescriptions">
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
                            {prescriptions.map((prescription, index) => (
                                <Card key={index} className="shadow-md">
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold">{prescription.name}</h3>
                                                <p className="text-sm text-muted-foreground">{prescription.date}</p>
                                            </div>
                                        </div>
                                        <div className="border-t pt-3">
                                            <p className="text-xs text-muted-foreground mb-2">Created by:</p>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={prescription.doctorAvatarUrl} alt={prescription.doctorName} data-ai-hint={prescription.doctorAvatarHint} />
                                                    <AvatarFallback>{prescription.doctorName.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{prescription.doctorName}</p>
                                                    <p className="text-sm text-muted-foreground">{prescription.doctorSpecialty}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-end border-t pt-3">
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
