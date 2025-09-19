
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Video, Phone, MessageSquare, Printer, Eye } from "lucide-react";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import type { Appointment } from "@/lib/types";
import { format } from 'date-fns';

const TypeIcon = ({ type }: { type: string }) => {
    let icon;
    let href;
    let className;
    switch (type) {
        case "Video Call":
            icon = <Video className="h-5 w-5 text-green-500" />;
            href = "/doctor/video-call";
            className = "text-green-500";
            break;
        case "Audio Call":
            icon = <Phone className="h-5 w-5 text-blue-500" />;
            href = "/doctor/voice-call";
            className = "text-blue-500";
            break;
        case "Chat":
            icon = <MessageSquare className="h-5 w-5 text-purple-500" />;
            href = "/doctor/messages";
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

const StatusBadge = ({ status }: { status: Appointment['status'] }) => {
  const statusClasses: { [key: string]: string } = {
    Approved: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-blue-100 text-blue-800',
  };

  return <Badge className={`capitalize ${statusClasses[status] || ''}`}>{status}</Badge>;
};


export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchAppointments() {
      if (!user) {
          setLoading(false);
          return;
      }
      try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/doctor/appointments', {
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [user]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Appointments</h1>
        <Tabs defaultValue="appointments">
            <ScrollArea className="w-full whitespace-nowrap">
                <TabsList className="inline-flex w-max">
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <Link href="/doctor/prescriptions"><TabsTrigger value="prescriptions" className="w-full">Prescriptions</TabsTrigger></Link>
                    <Link href="/doctor/medical-records"><TabsTrigger value="medical-records" className="w-full">Medical Records</TabsTrigger></Link>
                    <Link href="/doctor/billing"><TabsTrigger value="billing" className="w-full">Billing</TabsTrigger></Link>
                </TabsList>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <TabsContent value="appointments">
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
                  <>
                    {/* Desktop View */}
                    <div className="hidden md:block">
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
                                    {appointments.map((appointment) => (
                                        <TableRow key={appointment.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={appointment.patientAvatar} alt={appointment.patientName} data-ai-hint={appointment.patientAvatarHint} />
                                                        <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{appointment.patientName}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div>{format(new Date(appointment.appointmentDate), 'do MMM yyyy')}</div>
                                                <div className="text-sm text-muted-foreground">{format(new Date(appointment.appointmentDate), 'p')}</div>
                                            </TableCell>
                                            <TableCell>{format(new Date(appointment.bookingDate), 'do MMM yyyy')}</TableCell>
                                            <TableCell>
                                                <TypeIcon type={appointment.type} />
                                            </TableCell>
                                            <TableCell>₦{appointment.amount}</TableCell>
                                            <TableCell>
                                                <StatusBadge status={appointment.status} />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex flex-row gap-2 justify-end">
                                                    <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                                        <Printer className="w-4 h-4 mr-1" />
                                                        Print
                                                    </Button>
                                                    <Button asChild variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                                                        <Link href={`/doctor/view-appointment?id=${appointment.id}`}>
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
                    </div>
                    {/* Mobile View */}
                    <div className="md:hidden space-y-4">
                        {appointments.map((appointment) => (
                            <Card key={appointment.id} className="shadow-md">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={appointment.patientAvatar} alt={appointment.patientName} data-ai-hint={appointment.patientAvatarHint} />
                                    <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold">{appointment.patientName}</p>
                                    <StatusBadge status={appointment.status} />
                                </div>
                                </div>
                                <div className="border-t pt-3 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Appt Date:</span>
                                    <span className="font-medium">{format(new Date(appointment.appointmentDate), 'PPp')}</span>
                                </div>
                                    <div className="flex justify-between">
                                    <span className="text-muted-foreground">Booking Date:</span>
                                    <span className="font-medium">{format(new Date(appointment.bookingDate), 'PP')}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Type:</span>
                                    <TypeIcon type={appointment.type} />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Amount:</span>
                                    <span className="font-medium">₦{appointment.amount}</span>
                                </div>
                                </div>
                                <div className="flex gap-2 justify-end border-t pt-3">
                                    <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                        <Printer className="w-4 h-4 mr-1" />
                                        Print
                                    </Button>
                                    <Button asChild variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                                        <Link href={`/doctor/view-appointment?id=${appointment.id}`}>
                                            <Eye className="w-4 h-4 mr-1" />
                                            View
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                            </Card>
                        ))}
                    </div>
                  </>
                )}
            </TabsContent>
        </Tabs>
    </div>
  );
}
