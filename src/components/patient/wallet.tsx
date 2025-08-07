
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, CalendarPlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

type Transaction = {
  date: string;
  description: string;
  amount: string;
  type: "credit" | "debit";
};

type WalletData = {
  balance: string;
  transactions: Transaction[];
};

export default function Wallet() {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWalletData() {
      try {
        const response = await fetch('/api/wallet-transactions');
        const data = await response.json();
        setWalletData(data);
      } catch (error) {
        console.error('Failed to fetch wallet data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchWalletData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Wallet</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-12 w-48" />
          ) : (
            <p className="text-4xl font-bold">{walletData?.balance}</p>
          )}
          <div className="flex gap-4 mt-4">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Funds
            </Button>
            <Button asChild variant="outline">
              <Link href="/patients/find-a-doctor">
                <CalendarPlus className="mr-2 h-4 w-4" /> Request an Appointment
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {walletData?.transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={`text-right font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
