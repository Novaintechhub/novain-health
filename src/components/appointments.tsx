
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Video, Phone, MessageSquare, Printer, Eye } from "lucide-react";
import Link from "next/link";

const appointments = [
  {
    name: "Tosin Adebayo",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman portrait",
    date: "12th October 2025, 4:00 PM",
    bookingDate: "11th October 2025",
    type: "Video Call",
    status: "Confirm",
    amount: "$200",
  },
  {
    name: "Wright Thinker",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman smiling",
    date: "16th October 2025, 4:00 PM",
    bookingDate: "15th October 2025",
    type: "Audio Call",
    status: "Cancelled",
    amount: "$150",
  },
  {
    name: "Kanayo Ike",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "man traditional",
    date: "12th October 2025, 4:00 PM",
    bookingDate: "10th October 2025",
    type: "Chat",
    status: "Confirm",
    amount: "$100",
  },
  {
    name: "Victor Thompson",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "man portrait",
    date: "12th October 2025, 4:00 PM",
    bookingDate: "12th October 2025",
    type: "Video Call",
    status: "Pending",
    amount: "$300",
  },
  {
    name: "Vera Ogechi",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman happy",
    date: "22nd January 2025, 10:00 AM",
    bookingDate: "21st January 2025",
    type: "Video Call",
    status: "Confirm",
    amount: "$250",
  },
  {
    name: "Esther Peterson",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman looking",
    date: "1st February 2025, 9:00 AM",
    bookingDate: "31st January 2025",
    type: "Chat",
    status: "Confirm",
    amount: "$50",
  },
];

const TypeIcon = ({ type }: { type: string }) => {
    let icon;
    let href;
    let className;
    switch (type) {
        case "Video Call":
            icon = <Video className="h-5 w-5 text-green-500" />;
            href = "/patients/video-call";
            className = "text-green-500";
            break;
        case "Audio Call":
            icon = <Phone className="h-5 w-5 text-blue-500" />;
            href = "/patients/voice-call";
            className = "text-blue-500";
            break;
        case "Chat":
            icon = <MessageSquare className="h-5 w-5 text-purple-500" />;
            href = "/patients/messages";
            className = "text-purple-500";
            break;
        default:
            return null;
    }
    return (
        <Link href={href}>
            <div className={`flex items-center gap-2 hover:underline ${className}`}>
                {icon}
                <span>{type}</span>
            </div>
        </Link>
    )
};

const StatusBadge = ({ status }: { status: string }) => {
  let variant: "default" | "destructive" | "secondary" = "default";
  if (status === "Confirm") variant = "default";
  if (status === "Cancelled") variant = "destructive";
  if (status === "Pending") variant = "secondary";
  
  const statusClasses = {
    Confirm: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
    Pending: 'bg-yellow-100 text-yellow-800',
  };

  return <Badge className={`capitalize ${statusClasses[status as keyof typeof statusClasses] || ''}`}>{status}</Badge>;
};


export default function Appointments() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Appointments</h1>
        <Tabs defaultValue="appointments">
            <TabsList className="grid w-full grid-cols-4 max-w-lg">
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <Link href="/patients/prescriptions" className="w-full"><TabsTrigger value="prescriptions" className="w-full">Prescriptions</TabsTrigger></Link>
                <Link href="/patients/medical-records" className="w-full"><TabsTrigger value="medical-records" className="w-full">Medical Records</TabsTrigger></Link>
                <Link href="/patients/billing" className="w-full"><TabsTrigger value="billing" className="w-full">Billing</TabsTrigger></Link>
            </TabsList>
            <TabsContent value="appointments">
                <Card className="bg-white rounded-lg shadow-sm">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Appt Date</TableHead>
                                    <TableHead>Booking Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {appointments.map((appointment, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={appointment.avatarUrl} alt={appointment.name} data-ai-hint={appointment.avatarHint} />
                                                    <AvatarFallback>{appointment.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium">{appointment.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>{appointment.date.split(',')[0]}</div>
                                            <div className="text-sm text-muted-foreground">{appointment.date.split(',')[1]}</div>
                                        </TableCell>
                                        <TableCell>{appointment.bookingDate}</TableCell>
                                        <TableCell>
                                            <TypeIcon type={appointment.type} />
                                        </TableCell>
                                        <TableCell>{appointment.amount}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={appointment.status} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                                    <Printer className="w-4 h-4 mr-1" />
                                                    Print
                                                </Button>
                                                <Button asChild variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                                                    <Link href="/patients/reschedule-appointment">
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
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
