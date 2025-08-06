
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Printer, Eye, UploadCloud, Lock, Users, Globe, Trash2 } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";


type MedicalRecord = {
  id: string;
  date: string;
  description: string;
  attachment: string;
  visibility: "Public" | "Private";
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Medical Records</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Upload New Medical Record</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="record-description">Description</Label>
              <Input id="record-description" placeholder="e.g., Blood Test Results from City Hospital" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="record-file">File</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary">
                <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-muted-foreground">Drag & drop your file here, or <span className="text-primary font-semibold">click to select a file</span></p>
                <Input id="record-file" type="file" className="sr-only" />
              </div>
            </div>

            <div className="space-y-3">
                <Label>Record Visibility</Label>
                <RadioGroup defaultValue="private" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Label htmlFor="private-option" className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
                        <RadioGroupItem value="private" id="private-option" className="mt-1" />
                        <div className="grid gap-1.5">
                            <div className="font-semibold flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Private
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Only you will be able to see this record.
                            </p>
                        </div>
                    </Label>
                     <Label htmlFor="public-option" className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
                        <RadioGroupItem value="public" id="public-option" className="mt-1" />
                        <div className="grid gap-1.5">
                            <div className="font-semibold flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Public
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Doctors you have appointments with will be able to see this record.
                            </p>
                        </div>
                    </Label>
                </RadioGroup>
            </div>

            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
              Upload Record
            </Button>
        </CardContent>
      </Card>

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
                                      <TableHead>Visibility</TableHead>
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
                                            <Badge variant={record.visibility === 'Public' ? 'default' : 'secondary'} className={record.visibility === 'Public' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                                {record.visibility === 'Public' ? <Globe className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                                                {record.visibility}
                                            </Badge>
                                          </TableCell>
                                          <TableCell className="text-right">
                                              <div className="flex gap-2 justify-end">
                                                  <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                                      <Printer className="w-4 h-4 mr-1" />
                                                      Print
                                                  </Button>
                                                  <Button variant="destructive" size="icon">
                                                    <Trash2 className="w-4 h-4" />
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
                                            <Badge variant={record.visibility === 'Public' ? 'default' : 'secondary'} className={record.visibility === 'Public' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                                {record.visibility === 'Public' ? <Globe className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                                                {record.visibility}
                                            </Badge>
                                        </div>
                                        <div className="border-t pt-3 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Attachment:</span>
                                                <Link href="#" className="font-medium text-blue-600 hover:underline">{record.attachment}</Link>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-end border-t pt-3">
                                            <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                                <Printer className="w-4 h-4 mr-1" /> Print
                                            </Button>
                                            <Button variant="destructive" size="sm">
                                                <Trash2 className="w-4 h-4 mr-1" /> Delete
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
