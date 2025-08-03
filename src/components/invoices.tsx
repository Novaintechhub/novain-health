
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, Printer } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type Invoice = {
  invoiceNo: string;
  patientName: string;
  patientId: string;
  avatarUrl: string;
  avatarHint: string;
  amount: string;
  paidOn: string;
};

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const response = await fetch('/api/invoices');
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchInvoices();
  }, []);


  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Invoices</h1>
      </div>
      <Card>
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
            <div className="overflow-x-auto hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice No</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{invoice.invoiceNo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={invoice.avatarUrl}
                              alt={invoice.patientName}
                              data-ai-hint={invoice.avatarHint}
                            />
                            <AvatarFallback>
                              {invoice.patientName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{invoice.patientName}</div>
                            <div className="text-xs text-muted-foreground">
                              {invoice.patientId}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>{invoice.paidOn}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="bg-green-100 text-green-600 border-none hover:bg-green-200"
                          >
                            <Link href="/doctor/transactions/invoice-view">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200"
                          >
                            <Printer className="w-4 h-4 mr-1" />
                            Print
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
              {invoices.map((invoice, index) => (
                <Card key={index} className="shadow-md">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={invoice.avatarUrl}
                          alt={invoice.patientName}
                          data-ai-hint={invoice.avatarHint}
                        />
                        <AvatarFallback>
                          {invoice.patientName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">{invoice.patientName}</p>
                        <p className="text-sm text-muted-foreground">{invoice.patientId}</p>
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
                      <Button asChild variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                        <Link href="/doctor/transactions/invoice-view">
                          <Eye className="w-4 h-4 mr-1" /> View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                        <Printer className="w-4 h-4 mr-1" /> Print
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
