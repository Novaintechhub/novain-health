
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Printer, Eye } from "lucide-react";
import Link from "next/link";

const billingData = [
  {
    invoiceNo: "#INV-0010",
    doctorName: "Dr. Ruby Perrin",
    doctorSpecialty: "Dental",
    amount: "₦450",
    paidOn: "14 Nov 2019",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor",
  },
  {
    invoiceNo: "#INV-0009",
    doctorName: "Dr. Darren Elder",
    doctorSpecialty: "Dental",
    amount: "₦300",
    paidOn: "13 Nov 2019",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor",
  },
  {
    invoiceNo: "#INV-0008",
    doctorName: "Dr. Deborah Angel",
    doctorSpecialty: "Cardiology",
    amount: "₦150",
    paidOn: "12 Nov 2019",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor portrait",
  },
  {
    invoiceNo: "#INV-0007",
    doctorName: "Dr. Sofia Brient",
    doctorSpecialty: "Urology",
    amount: "₦50",
    paidOn: "11 Nov 2019",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor smiling",
  },
  {
    invoiceNo: "#INV-0006",
    doctorName: "Dr. Marvin Campbell",
    doctorSpecialty: "Ophthalmology",
    amount: "₦600",
    paidOn: "10 Nov 2019",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "male doctor portrait",
  },
   {
    invoiceNo: "#INV-0005",
    doctorName: "Dr. Katharine Berthold",
    doctorSpecialty: "Dental",
    amount: "₦200",
    paidOn: "9 Nov 2019",
    doctorAvatarUrl: "https://placehold.co/40x40.png",
    doctorAvatarHint: "female doctor glasses",
  },
];

export default function Billing() {
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
            </TabsContent>
        </Tabs>
    </div>
  );
}
