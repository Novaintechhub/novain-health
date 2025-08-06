
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type Appointment = {
  id: string;
  doctorName: string;
  doctorAvatar: string;
  doctorAvatarHint: string;
  specialty: string;
  patientName: string;
  patientAvatar: string;
  patientAvatarHint: string;
  appointmentTime: string;
  status: "Approved" | "Cancelled";
  amount: string;
};

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch('/api/admin-appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, []);

  const StatusBadge = ({ status }: { status: "Approved" | "Cancelled" }) => {
    const statusClasses = {
      Approved: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800',
    };
    return <Badge className={`capitalize ${statusClasses[status]}`}>{status}</Badge>;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Appointment Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments.map(appointment => (
                    <TableRow key={appointment.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                <AvatarImage src={appointment.doctorAvatar} alt={appointment.doctorName} data-ai-hint={appointment.doctorAvatarHint} />
                                <AvatarFallback>{appointment.doctorName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{appointment.doctorName}</span>
                            </div>
                        </TableCell>
                        <TableCell>{appointment.specialty}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                <AvatarImage src={appointment.patientAvatar} alt={appointment.patientName} data-ai-hint={appointment.patientAvatarHint} />
                                <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{appointment.patientName}</span>
                            </div>
                        </TableCell>
                        <TableCell>{appointment.appointmentTime}</TableCell>
                        <TableCell>
                            <StatusBadge status={appointment.status} />
                        </TableCell>
                        <TableCell>{appointment.amount}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
