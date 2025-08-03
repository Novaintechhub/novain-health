
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

type Billing = {
  invoiceNo: string;
  doctorName: string;
  doctorSpecialty: string;
  amount: string;
  paidOn: string;
  doctorAvatarUrl: string;
  doctorAvatarHint: string;
};

export default function Billing() {
  const [billingData, setBillingData] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBilling() {
      try {
        const response = await fetch('/api/billing');
        const data = await response.json();
        setBillingData(data);
      } catch (error) {
        console.error('Failed to fetch billing data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBilling();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Billing</h1>
        <Tabs defaultValue="billing">
            <TabsList className="grid w-full grid-cols-4 max-w-lg">
                <Link href="/patients/appointments"><TabsTrigger value="appointments" className="w-full">Appointments</TabsTrigger></Link>
                <Link href="/patients/prescriptions"><TabsTrigger value="prescriptions" className="w-full">Prescriptions</TabsTrigger></Link>
                <Link href="/patients/medical-records"><TabsTrigger value="medical-records" className="w-full">Medical Records</TabsTrigger></Link>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="billing">
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
                                      <TableHead>Invoice No</TableHead>
                                      <TableHead>Doctor</TableHead>
                                      <TableHead>Amount</TableHead>
                                      <TableHead>Paid On</TableHead>
                                      <TableHead className="text-right">Action</TableHead>
                                  </TableRow>
                              </TableHeader>
                              <TableBody>
                                  {billingData.map((invoice, index) => (
                                      <TableRow key={index}>
                                          <TableCell>{invoice.invoiceNo}</TableCell>
                                          <TableCell>
                                              <div className="flex items-center gap-3">
                                                  <Avatar className="h-10 w-10">
                                                      <AvatarImage src={invoice.doctorAvatarUrl} alt={invoice.doctorName} data-ai-hint={invoice.doctorAvatarHint} />
                                                      <AvatarFallback>{invoice.doctorName.charAt(0)}</AvatarFallback>
                                                  </Avatar>
                                                  <div>
                                                      <div className="font-medium">{invoice.doctorName}</div>
                                                      <div className="text-sm text-muted-foreground">{invoice.doctorSpecialty}</div>
                                                  </div>
                                              </div>
                                          </TableCell>
                                          <TableCell>{invoice.amount}</TableCell>
                                          <TableCell>{invoice.paidOn}</TableCell>
                                          <TableCell className="text-right">
                                              <div className="flex gap-2 justify-end">
                                                  <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                                      <Printer className="w-4 h-4 mr-1" />
                                                      Print
                                                  </Button>
                                                  <Button asChild variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                                                      <Link href="/patients/invoice-view">
                                                          <Eye className="w-4 h-4 mr-1" />
                                                          View
                                                      </Link>
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
                            {billingData.map((invoice, index) => (
                                <Card key={index} className="shadow-md">
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src={invoice.doctorAvatarUrl} alt={invoice.doctorName} data-ai-hint={invoice.doctorAvatarHint} />
                                                <AvatarFallback>{invoice.doctorName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold">{invoice.doctorName}</p>
                                                <p className="text-sm text-muted-foreground">{invoice.doctorSpecialty}</p>
                                            </div>
                                        </div>
                                        <div className="border-t pt-3 space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Invoice No:</span>
                                                <span className="font-medium">{invoice.invoiceNo}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Amount:</span>
                                                <span className="font-medium">{invoice.amount}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Paid On:</span>
                                                <span className="font-medium">{invoice.paidOn}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-end border-t pt-3">
                                            <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                                <Printer className="w-4 h-4 mr-1" /> Print
                                            </Button>
                                            <Button asChild variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                                                <Link href="/patients/invoice-view">
                                                    <Eye className="w-4 h-4 mr-1" /> View
                                                </Link>
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
