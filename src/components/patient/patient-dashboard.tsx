
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, FileText, Heart, DollarSign } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { Appointment } from "@/lib/types";
import { format } from 'date-fns';

const StatCard = ({ title, value, icon, href }: { title: string; value: string | number; icon: React.ElementType; href: string }) => {
    const Icon = icon;
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <Link href={href} className="text-xs text-muted-foreground hover:underline">
                    View Details
                </Link>
            </CardContent>
        </Card>
    );
};

export default function PatientDashboard() {
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({ appointments: 0, prescriptions: 0, medicalRecords: 0, billing: 12000 }); // Billing is still mock
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
        if (!user) return;
        try {
            const idToken = await user.getIdToken();
            const response = await fetch('/api/appointments', {
                headers: { 'Authorization': `Bearer ${idToken}` }
            });
            if (!response.ok) throw new Error("Failed to fetch appointments");
            const appointmentsData = await response.json();
            setAllAppointments(appointmentsData);
            setStats(prev => ({
                ...prev,
                appointments: appointmentsData.length,
                // In a real app, you would fetch these counts too
                prescriptions: 3, 
                medicalRecords: 2,
            }));
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    }
    if (user) {
        fetchData();
    }
  }, [user]);
  
  const upcomingAppointments = allAppointments.filter(
    appt => appt.status === 'Pending' || appt.status === 'Approved'
  );


  if (loading) {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
            </div>
            <Skeleton className="h-96" />
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Appointments" value={stats.appointments} icon={Calendar} href="/patients/appointments" />
        <StatCard title="Prescriptions" value={stats.prescriptions} icon={FileText} href="/patients/prescriptions" />
        <StatCard title="Medical Records" value={stats.medicalRecords} icon={Heart} href="/patients/medical-records" />
        <StatCard title="Total Billed" value={`₦${stats.billing.toLocaleString()}`} icon={DollarSign} href="/patients/billing" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appt) => (
                    <TableRow key={appt.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={appt.doctorAvatar} alt={appt.doctorName} data-ai-hint={appt.doctorAvatarHint} />
                            <AvatarFallback>{appt.doctorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{appt.doctorName}</p>
                            <p className="text-sm text-muted-foreground">{appt.specialty}</p>
                        </div>
                        </div>
                    </TableCell>
                    <TableCell>{format(new Date(appt.appointmentDate), 'do MMM yyyy')}</TableCell>
                    <TableCell>{format(new Date(appt.appointmentDate), 'p')}</TableCell>
                    <TableCell className="text-right">
                        <Button asChild variant="outline">
                            <Link href={`/patients/view-appointment?id=${appt.id}`}>View</Link>
                        </Button>
                    </TableCell>
                    </TableRow>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No upcoming appointments.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
