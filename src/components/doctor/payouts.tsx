
"use client";

import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type Payout = {
  date: string;
  amount: string;
  status: string;
  method: string;
};

export default function Payouts() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayouts() {
      try {
        const response = await fetch('/api/payouts');
        const data = await response.json();
        setPayouts(data);
      } catch (error) {
        console.error('Failed to fetch payouts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPayouts();
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    const statusClasses: { [key: string]: string } = {
      Completed: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Failed: 'bg-red-100 text-red-800',
    };
    return <Badge className={`capitalize ${statusClasses[status] || ''}`}>{status}</Badge>;
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Payouts</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
             <div className="p-4 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payout Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.map((payout, index) => (
                    <TableRow key={index}>
                      <TableCell>{payout.date}</TableCell>
                      <TableCell>{payout.amount}</TableCell>
                      <TableCell>{payout.method}</TableCell>
                      <TableCell>
                        <StatusBadge status={payout.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
