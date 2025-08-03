
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
import { Skeleton } from "@/components/ui/skeleton";

type Transaction = {
  name: string;
  id: string;
  amount: string;
  transactionId: string;
  avatarUrl: string;
  avatarHint: string;
};

export default function ConsultationPayments() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch('/api/consultation-payments');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Home / Transactions / Consultation Payments
        </p>
        <h1 className="text-2xl font-bold">Consultation Payments</h1>
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
                      <TableHead>Patient</TableHead>
                      <TableHead>Amount Paid</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={transaction.avatarUrl}
                                alt={transaction.name}
                                data-ai-hint={transaction.avatarHint}
                              />
                              <AvatarFallback>
                                {transaction.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{transaction.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {transaction.id}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.transactionId}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-100 text-green-600 border-none hover:bg-green-200"
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
                {transactions.map((transaction, index) => (
                  <Card key={index} className="shadow-md">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={transaction.avatarUrl}
                            alt={transaction.name}
                            data-ai-hint={transaction.avatarHint}
                          />
                          <AvatarFallback>
                            {transaction.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold">{transaction.name}</p>
                          <p className="text-sm text-muted-foreground">{transaction.id}</p>
                        </div>
                      </div>
                      <div className="border-t pt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount Paid:</span>
                          <span className="font-medium">{transaction.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Transaction ID:</span>
                          <span className="font-medium truncate">{transaction.transactionId}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end border-t pt-3">
                        <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                            <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                        <Button variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
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
