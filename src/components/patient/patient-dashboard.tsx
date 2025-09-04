
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, FileText, Heart, DollarSign } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type Appointment = {
    doctorName: string;
    doctorSpecialty: string;
    doctorAvatar: string;
    doctorAvatarHint: string;
    date: string;
    time: string;
    status: string;
};

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
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({ appointments: 0, prescriptions: 0, medicalRecords: 0, billing: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        try {
            // In a real app, you would fetch this data from your API
            const dummyAppointments: Appointment[] = [
                {
                    doctorName: "Dr. Tosin Adebayo",
                    doctorSpecialty: "Cardiologist",
                    doctorAvatar: "https://placehold.co/40x40.png",
                    doctorAvatarHint: "female doctor",
                    date: "2024-12-11",
                    time: "10:00 AM",
                    status: "Upcoming"
                },
                {
                    doctorName: "Dr. Musa Ahmed",
                    doctorSpecialty: "Neurologist",
                    doctorAvatar: "https://placehold.co/40x40.png",
                    doctorAvatarHint: "male doctor portrait",
                    date: "2024-12-14",
                    time: "01:00 PM",
                    status: "Upcoming"
                }
            ];
            const dummyStats = {
                appointments: 5,
                prescriptions: 3,
                medicalRecords: 2,
                billing: 12000
            };
            setAppointments(dummyAppointments);
            setStats(dummyStats);
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    }
    fetchData();
  }, []);

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
              {appointments.map((appt, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={appt.doctorAvatar} alt={appt.doctorName} data-ai-hint={appt.doctorAvatarHint} />
                        <AvatarFallback>{appt.doctorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{appt.doctorName}</p>
                        <p className="text-sm text-muted-foreground">{appt.doctorSpecialty}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(appt.date).toLocaleDateString()}</TableCell>
                  <TableCell>{appt.time}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline">
                        <Link href="/patients/appointments">View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

