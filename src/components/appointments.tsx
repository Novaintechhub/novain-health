
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Video, Phone, MessageSquare, Printer, Eye, AlertCircle, Edit, XCircle, CalendarPlus, Clock, Calendar, CreditCard } from "lucide-react";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { parse, isPast } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Appointment = {
  name: string;
  avatarUrl: string;
  avatarHint: string;
  date: string;
  bookingDate: string;
  type: string;
  status: string;
  amount: string;
  cancellationReason?: string;
};

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
  const statusClasses: { [key: string]: string } = {
    Approved: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Completed: 'bg-blue-100 text-blue-800',
  };

  return <Badge className={`capitalize ${statusClasses[status] || ''}`}>{status}</Badge>;
};

const AppointmentActions = ({ appointment }: { appointment: Appointment }) => {
  const [showReasonDialog, setShowReasonDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);

  const cleanDateStr = appointment.date.replace(/(\d+)(st|nd|rd|th)/, '$1');
  const appointmentDate = parse(cleanDateStr, "do MMMM yyyy, h:mm a", new Date());
  const isAppointmentPast = isPast(appointmentDate);

  const handleCancel = () => {
    // Logic to cancel appointment would go here
    console.log("Appointment cancelled");
    setShowCancelDialog(false);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-end">
        {appointment.status === 'Cancelled' && (
          <AlertDialog open={showReasonDialog} onOpenChange={setShowReasonDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">Reason</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reason for Cancellation</AlertDialogTitle>
                <AlertDialogDescription>
                  {appointment.cancellationReason || "No reason provided."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Close</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {appointment.status === 'Pending' && (
          <>
            <Button asChild variant="outline" size="sm">
              <Link href="/patients/reschedule-appointment"><Edit className="w-4 h-4 mr-1" /> Edit</Link>
            </Button>
            <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm"><XCircle className="w-4 h-4 mr-1" /> Cancel</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently cancel your appointment.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Back</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancel}>Confirm Cancellation</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          </>
        )}
        
        {appointment.status === 'Approved' && !isAppointmentPast && (
            <>
                <AlertDialog open={showViewDialog} onOpenChange={setShowViewDialog}>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Upcoming Appointment</AlertDialogTitle>
                            <AlertDialogDescription>
                            Here are the details for your upcoming appointment.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                    <AvatarImage src={appointment.avatarUrl} alt={appointment.name} data-ai-hint={appointment.avatarHint} />
                                    <AvatarFallback>{appointment.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold">{appointment.name}</h3>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground"/><span>{appointment.date.split(',')[0]}</span></div>
                                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground"/><span>{appointment.date.split(',')[1]}</span></div>
                                <div className="flex items-center gap-2"><Video className="w-4 h-4 text-muted-foreground"/><span>{appointment.type}</span></div>
                            </div>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogAction>Close</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Button asChild variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                    <Link href="/patients/checkout">
                        <CreditCard className="w-4 h-4 mr-1"/> Make Payment
                    </Link>
                </Button>
            </>
        )}

        {appointment.status === 'Approved' && isAppointmentPast && (
          <Button asChild variant="destructive" size="sm">
            <Link href="/patients/report-no-show">
              <AlertCircle className="w-4 h-4 mr-1" />
              Report No-Show
            </Link>
          </Button>
        )}

        {appointment.status === 'Completed' && (
            <>
                <Button variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                    <Printer className="w-4 h-4 mr-1" />
                    Print
                </Button>
                <Button asChild variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                    <Link href="/patients/view-appointment">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                    </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                    <Link href="/patients/request-appointment">
                        <CalendarPlus className="w-4 h-4 mr-1" />
                        Follow-up
                    </Link>
                </Button>
            </>
        )}
      </div>
    </>
  );
};


export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch('/api/appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Appointments</h1>
        <Tabs defaultValue="appointments">
            <ScrollArea className="w-full whitespace-nowrap">
                <TabsList className="inline-flex w-max">
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <Link href="/patients/prescriptions"><TabsTrigger value="prescriptions" className="w-full">Prescriptions</TabsTrigger></Link>
                    <Link href="/patients/medical-records"><TabsTrigger value="medical-records" className="w-full">Medical Records</TabsTrigger></Link>
                    <Link href="/patients/billing"><TabsTrigger value="billing" className="w-full">Billing</TabsTrigger></Link>
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
                                        <TableHead>Doctor</TableHead>
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
                                               <AppointmentActions appointment={appointment} />
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
                        {appointments.map((appointment, index) => (
                            <Card key={index} className="shadow-md">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={appointment.avatarUrl} alt={appointment.name} data-ai-hint={appointment.avatarHint} />
                                    <AvatarFallback>{appointment.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold">{appointment.name}</p>
                                    <StatusBadge status={appointment.status} />
                                </div>
                                </div>
                                <div className="border-t pt-3 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Appt Date:</span>
                                    <span className="font-medium">{appointment.date}</span>
                                </div>
                                    <div className="flex justify-between">
                                    <span className="text-muted-foreground">Booking Date:</span>
                                    <span className="font-medium">{appointment.bookingDate}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Type:</span>
                                    <TypeIcon type={appointment.type} />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Amount:</span>
                                    <span className="font-medium">{appointment.amount}</span>
                                </div>
                                </div>
                                <div className="border-t pt-3">
                                    <AppointmentActions appointment={appointment} />
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
