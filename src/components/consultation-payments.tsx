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

const transactions = [
  {
    name: "Vera Ogechi",
    id: "#00016",
    amount: "$150",
    transactionId: "25JN03/67890/TN04",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman happy",
  },
  {
    name: "Ovie Whiskey",
    id: "#02016",
    amount: "$150",
    transactionId: "25JN03/67890/TN04",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "man smiling",
  },
  {
    name: "Peter Ogene",
    id: "#140016",
    amount: "$150",
    transactionId: "25JN03/67890/TN04",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "man portrait",
  },
  {
    name: "Sophia Zara",
    id: "#00016",
    amount: "$150",
    transactionId: "25JN03/67890/TN04",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman portrait",
  },
  {
    name: "Chicha Tobe",
    id: "#00066",
    amount: "$150",
    transactionId: "25JN03/67890/TN04",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman traditional",
  },
  {
    name: "Carol Susan",
    id: "#110016",
    amount: "$150",
    transactionId: "25JN03/67890/TN04",
    avatarUrl: "https://placehold.co/40x40.png",
    avatarHint: "woman smiling",
  },
];

export default function ConsultationPayments() {
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
          <div className="overflow-x-auto">
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
        </CardContent>
      </Card>
    </div>
  );
}
