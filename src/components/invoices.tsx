
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

const invoices = [
  {
    invoiceNo: "#INV-0010",
    patientName: "Richard Wilson",
    patientId: "#PT0016",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "man portrait",
    amount: "₦450",
    paidOn: "14 Nov 2019",
  },
  {
    invoiceNo: "#INV-0009",
    patientName: "Charlene Reed",
    patientId: "#PT0001",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman smiling",
    amount: "₦200",
    paidOn: "13 Nov 2019",
  },
  {
    invoiceNo: "#INV-0008",
    patientName: "Travis Trimble",
    patientId: "#PT0002",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "male doctor portrait",
    amount: "₦100",
    paidOn: "12 Nov 2019",
  },
  {
    invoiceNo: "#INV-0007",
    patientName: "Carl Kelly",
    patientId: "#PT0003",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "man portrait",
    amount: "₦350",
    paidOn: "11 Nov 2019",
  },
  {
    invoiceNo: "#INV-0006",
    patientName: "Michelle Fairfax",
    patientId: "#PT0004",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman portrait",
    amount: "₦275",
    paidOn: "10 Nov 2019",
  },
  {
    invoiceNo: "#INV-0005",
    patientName: "Gina Moore",
    patientId: "#PT0005",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman portrait",
    amount: "₦600",
    paidOn: "9 Nov 2019",
  },
  {
    invoiceNo: "#INV-0004",
    patientName: "Elsie Gilley",
    patientId: "#PT0006",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman portrait",
    amount: "₦50",
    paidOn: "8 Nov 2019",
  },
  {
    invoiceNo: "#INV-0003",
    patientName: "Joan Gardner",
    patientId: "#PT0007",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman portrait",
    amount: "₦400",
    paidOn: "7 Nov 2019",
  },
];

export default function Invoices() {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Invoices</h1>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
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
        </CardContent>
      </Card>
    </div>
  );
}
