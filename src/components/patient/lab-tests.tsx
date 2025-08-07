
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
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatarUrl: string;
  doctorAvatarHint: string;
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusClasses = {
    Completed: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
  };

  return <Badge className={`capitalize ${statusClasses[status as keyof typeof statusClasses] || ''}`}>{status}</Badge>;
};

export default function LabTests() {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLabTests() {
      try {
        const response = await fetch('/api/lab-tests');
        const data = await response.json();
        setLabTests(data);
      } catch (error) {
        console.error('Failed to fetch lab tests:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLabTests();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Lab Tests</h1>
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
                                            <Button asChild variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                                                <Link href="/patients/view-lab-test">
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    View
                                                </Link>
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
                            <p className="text-xs text-muted-foreground mb-2">Prescribed by:</p>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={test.doctorAvatarUrl} alt={test.doctorName} data-ai-hint={test.doctorAvatarHint} />
                                <AvatarFallback>{test.doctorName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold">{test.doctorName}</p>
                                <p className="text-sm text-muted-foreground">{test.doctorSpecialty}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 justify-end border-t pt-3">
                             <Button asChild variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                                <Link href="/patients/view-lab-test">
                                    <Eye className="w-4 h-4 mr-1" />
                                    View
                                </Link>
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
