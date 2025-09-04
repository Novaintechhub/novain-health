
"use client";

import { useState, useEffect, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Printer, Download, ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

type InvoiceItem = {
    description: string;
    quantity: number;
    price: string;
};

type InvoiceData = {
    id: string;
    date: string;
    patient: {
        name: string;
        address: string;
        avatarUrl: string;
        avatarHint: string;
    };
    doctor: {
        name: string;
        specialty: string;
        clinic: string;
        avatarUrl: string;
        avatarHint: string;
    };
    items: InvoiceItem[];
    subtotal: string;
    tax: string;
    discount: string;
    total: string;
    paymentMethod: string;
};

function InvoiceViewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const invoiceId = searchParams.get("id");
    const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!invoiceId) {
            setLoading(false);
            return;
        }

        async function fetchInvoice() {
            try {
                const response = await fetch(`/api/invoice/${invoiceId}`);
                if (!response.ok) throw new Error("Failed to fetch invoice");
                const data = await response.json();
                setInvoiceData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchInvoice();
    }, [invoiceId]);


    const calculateTotal = (quantity: number, price: string) => {
        const numericPrice = parseFloat(price.replace('₦', ''));
        return `₦${(quantity * numericPrice).toFixed(2)}`;
    };

    if (loading) {
        return (
             <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-64" />
                    <Skeleton className="h-10 w-24" />
                </div>
                <Card className="p-4 sm:p-8">
                    <CardHeader className="p-0 border-b pb-6 mb-6">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-1/2 mt-2" />
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Skeleton className="h-24" />
                            <Skeleton className="h-24" />
                        </div>
                        <Skeleton className="h-40 w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!invoiceData) {
      return (
          <div className="text-center py-10">
              <h2 className="text-xl font-semibold">Invoice Not Found</h2>
              <p className="text-muted-foreground mt-2">The invoice you are looking for does not exist or could not be loaded.</p>
              <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
          </div>
      )
    }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Invoice Details</h1>
        <Button variant="outline" onClick={() => router.back()}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <Card className="p-4 sm:p-8">
        <CardHeader className="p-0">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div className="flex items-center gap-4">
                <Image src="/logo-icon.png" alt="NovainHealth Logo" width={48} height={48} />
                <div>
                    <CardTitle className="text-2xl">Invoice</CardTitle>
                    <p className="text-muted-foreground">ID: {invoiceData.id}</p>
                </div>
            </div>
            <div className="text-left sm:text-right mt-4 sm:mt-0">
                <p className="font-semibold">{invoiceData.doctor.clinic}</p>
                <p className="text-sm text-muted-foreground">Date Issued: {invoiceData.date}</p>
            </div>
          </div>
        </CardHeader>
        <Separator className="my-6" />
        <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div>
                    <h3 className="font-semibold mb-2">Billed to:</h3>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={invoiceData.patient.avatarUrl} alt={invoiceData.patient.name} data-ai-hint={invoiceData.patient.avatarHint} />
                            <AvatarFallback>{invoiceData.patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-lg">{invoiceData.patient.name}</p>
                            <p className="text-sm text-muted-foreground max-w-xs">{invoiceData.patient.address}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">From:</h3>
                     <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={invoiceData.doctor.avatarUrl} alt={invoiceData.doctor.name} data-ai-hint={invoiceData.doctor.avatarHint} />
                            <AvatarFallback>{invoiceData.doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-lg">{invoiceData.doctor.name}</p>
                            <p className="text-sm text-muted-foreground">{invoiceData.doctor.specialty}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-center">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoiceData.items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{item.description}</TableCell>
                            <TableCell className="text-center">{item.quantity}</TableCell>
                            <TableCell className="text-center">{item.price}</TableCell>
                            <TableCell className="text-right">{calculateTotal(item.quantity, item.price)}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-end mt-6">
                <div className="w-full max-w-sm space-y-2">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span>{invoiceData.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (10%):</span>
                        <span>{invoiceData.tax}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Discount:</span>
                        <span className="text-green-600">{invoiceData.discount}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>{invoiceData.total}</span>
                    </div>
                </div>
            </div>
             <div className="mt-8">
                <h3 className="font-semibold">Payment Details</h3>
                <p className="text-muted-foreground mt-2">Paid using {invoiceData.paymentMethod}</p>
             </div>
        </CardContent>
        <CardFooter className="p-0 mt-8 pt-6 border-t">
            <div className="flex justify-end w-full gap-2">
                <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}


export default function InvoiceView() {
    return (
        <Suspense fallback={<p>Loading invoice...</p>}>
            <InvoiceViewContent />
        </Suspense>
    )
}
