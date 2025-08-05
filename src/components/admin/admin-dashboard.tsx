
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCog, Calendar, CreditCard, Star, User } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
};

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 text-muted-foreground ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const chartData = [
  { name: 'Jan', revenue: 4000, appointments: 2400 },
  { name: 'Feb', revenue: 3000, appointments: 1398 },
  { name: 'Mar', revenue: 2000, appointments: 9800 },
  { name: 'Apr', revenue: 2780, appointments: 3908 },
  { name: 'May', revenue: 1890, appointments: 4800 },
  { name: 'Jun', revenue: 2390, appointments: 3800 },
];

type Doctor = {
  id: string;
  name: string;
  avatarUrl: string;
  avatarHint: string;
  specialty: string;
  earned: string;
};

type Patient = {
    id: string;
    name: string;
    avatarUrl: string;
    avatarHint: string;
    lastVisit: string;
    paid: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalPatients: 0, totalDoctors: 0, totalAppointments: 0, totalRevenue: 0 });
  const [recentDoctors, setRecentDoctors] = useState<Doctor[]>([]);
  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, doctorsRes, patientsRes] = await Promise.all([
          fetch('/api/admin-stats'),
          fetch('/api/admin-doctors'),
          fetch('/api/admin-patients')
        ]);
        const statsData = await statsRes.json();
        const doctorsData = await doctorsRes.json();
        const patientsData = await patientsRes.json();
        
        setStats(statsData);
        setRecentDoctors(doctorsData.slice(0, 5));
        setRecentPatients(patientsData.slice(0,5));
      } catch (error) {
        console.error("Failed to fetch admin dashboard data:", error);
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
              <Skeleton className="h-80" />
              <div className="grid gap-4 md:grid-cols-2">
                  <Skeleton className="h-96" />
                  <Skeleton className="h-96" />
              </div>
          </div>
      )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Doctors" value={stats.totalDoctors} icon={UserCog} color="text-blue-500" />
        <StatCard title="Total Patients" value={stats.totalPatients} icon={Users} color="text-green-500" />
        <StatCard title="Appointments" value={stats.totalAppointments} icon={Calendar} color="text-yellow-500" />
        <StatCard title="Total Revenue" value={`₦${stats.totalRevenue.toLocaleString()}`} icon={CreditCard} color="text-red-500" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue & Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#8884d8" name="Revenue (₦)" />
              <Bar yAxisId="right" dataKey="appointments" fill="#82ca9d" name="Appointments" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Earned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDoctors.map(doctor => (
                  <TableRow key={doctor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={doctor.avatarUrl} alt={doctor.name} data-ai-hint={doctor.avatarHint} />
                          <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{doctor.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.earned}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Paid</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPatients.map(patient => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={patient.avatarUrl} alt={patient.name} data-ai-hint={patient.avatarHint} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{patient.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>{patient.paid}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
