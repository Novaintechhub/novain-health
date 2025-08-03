
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Check, X, MoreVertical } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type Patient = {
    id: string;
    name: string;
    appointmentDate: string;
    appointmentTime: string;
    purpose: string;
    type: string;
    paidAmount: string;
};

type Stats = {
    totalPatients: number;
    todayPatients: number;
    appointments: number;
};

const StatCard = ({ icon, label, value, subtext, progress, color }: { icon: React.ReactNode, label: string, value: string, subtext: string, progress: number, color: string }) => {
  const data = [
    { name: 'Progress', value: progress },
    { name: 'Remaining', value: 100 - progress }
  ];

  return (
    <Card className="bg-white rounded-lg shadow-sm p-4">
      <CardContent className="flex items-center gap-4 p-0">
        <div className="relative h-20 w-20">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={35}
                startAngle={90}
                endAngle={450}
                dataKey="value"
                stroke="none"
              >
                <Cell fill={color} />
                <Cell fill="#f0f0f0" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center text-white" style={{ color }}>
            {icon}
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{subtext}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const EarningCard = ({ label, value, icon, subtext, cta }: { label: string, value: string, icon?: React.ReactNode, subtext: string, cta?: string }) => (
    <div className="flex flex-col">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        {icon && <div className="text-2xl font-normal">{icon}</div>}
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <p className="text-xs text-muted-foreground">{subtext}</p>
      {cta && <a href="#" className="text-sm text-cyan-500 hover:underline mt-1">{cta}</a>}
    </div>
);


export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [patientData, setPatientData] = useState<Patient[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/dashboard-stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoadingStats(false);
      }
    }
    
    async function fetchAppointments() {
      try {
        const response = await fetch('/api/dashboard-appointments');
        const data = await response.json();
        setPatientData(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoadingAppointments(false);
      }
    }
    
    fetchStats();
    fetchAppointments();
  }, []);

  const TotalPatientIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  );

  const TodayPatientIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 0-5 5c0 1.66 1.34 3 3 3h4c1.66 0 3-1.34 3-3a5 5 0 0 0-5-5z"/><path d="M20 10c0-2-3-3-3-3s-1 1-3 1-3-1-3-1-3 1-3 3c0 2.5 4 5 6 5s6-2.5 6-5zM12 19.5c-3.5 0-6-1-6-1s2.5-1 6-1 6 1 6 1-2.5 1-6 1z"/></svg>
  );
  
  const AppointmentIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loadingStats || !stats ? (
          <>
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </>
        ) : (
          <>
            <StatCard 
                icon={<TotalPatientIcon />}
                label="Total Patient" value={stats.totalPatients.toString()} subtext="Till today" 
                progress={(stats.totalPatients % 1000) / 10} color="#D90067" />
            <StatCard 
                icon={<TodayPatientIcon />}
                label="Today Patient" value={stats.todayPatients.toString()} subtext="12, Nov 2024" 
                progress={stats.todayPatients} color="#00A76F" />
            <StatCard 
                icon={<AppointmentIcon />}
                label="Appointment" value={stats.appointments.toString()} subtext="06, Dec 2024"
                progress={stats.appointments} color="#46C8F5" />
          </>
        )}
      </div>

      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <EarningCard label="Wallet Balance" value="150,000.00" icon={<span className="text-2xl font-normal">₦</span>} subtext="One hundred and fifty thousand naira" cta="View payouts"/>
            <EarningCard label="Total Withdrawal" value="65,000" icon={<span className="text-2xl font-normal">₦</span>} subtext="" />
            <div className="flex justify-between items-center w-full md:w-auto">
              <EarningCard label="Total Earnings" value="172,000" icon={<span className="text-2xl font-normal">₦</span>} subtext="After 20% commission" />
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h3 className="text-lg font-semibold">Patient Appointment</h3>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full bg-cyan-400 text-white border-cyan-400 hover:bg-cyan-500 hover:text-white">Upcoming</Button>
              <Button variant="ghost" className="rounded-full">Today</Button>
            </div>
          </div>
          {loadingAppointments ? (
             <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                 <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Desktop View */}
              <div className="overflow-x-auto hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Appointment</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Paid Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientData.map((patient, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={`https://placehold.co/40x40.png?text=${patient.name.charAt(0)}`} alt={patient.name} />
                              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-xs text-muted-foreground">{patient.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{patient.appointmentDate}</div>
                          <div className="text-cyan-500">{patient.appointmentTime}</div>
                        </TableCell>
                        <TableCell>{patient.purpose}</TableCell>
                        <TableCell>{patient.type}</TableCell>
                        <TableCell>{patient.paidAmount}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-row gap-2 justify-end">
                              <Button asChild variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200">
                                  <Link href="/doctor/view-appointment">
                                    <Eye className="h-4 w-4 mr-1"/> View
                                  </Link>
                              </Button>
                              <Button variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200">
                                  <Check className="h-4 w-4 mr-1"/> Accept
                              </Button>
                              <Button variant="outline" size="sm" className="bg-red-100 text-red-600 border-none hover:bg-red-200">
                                  <X className="h-4 w-4 mr-1"/> Cancel
                              </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                {patientData.map((patient, index) => (
                  <Card key={index} className="shadow-md">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`https://placehold.co/40x40.png?text=${patient.name.charAt(0)}`} alt={patient.name} />
                          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.id}</p>
                        </div>
                      </div>
                      <div className="border-t pt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Appointment:</span>
                          <span className="font-medium text-right">{patient.appointmentDate} <br/> <span className="text-cyan-500">{patient.appointmentTime}</span></span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Purpose:</span>
                          <span className="font-medium">{patient.purpose}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="font-medium">{patient.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Paid Amount:</span>
                          <span className="font-medium">{patient.paidAmount}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end border-t pt-3">
                        <Button asChild variant="outline" size="sm" className="bg-blue-100 text-blue-600 border-none hover:bg-blue-200 flex-1">
                            <Link href="/doctor/view-appointment">
                              <Eye className="w-4 h-4 mr-1"/> View
                            </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="bg-green-100 text-green-600 border-none hover:bg-green-200 flex-1">
                            <Check className="h-4 w-4 mr-1"/> Accept
                        </Button>
                        <Button variant="outline" size="sm" className="bg-red-100 text-red-600 border-none hover:bg-red-200 flex-1">
                            <X className="h-4 w-4 mr-1"/> Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
