
"use client";

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
import { Eye, X, MoreVertical, Calendar, Briefcase, FlaskConical } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

const patientData = [
    {
        id: "#00016",
        name: "Dr. Tosin Adebayo",
        appointmentDate: "11th Dec 2024",
        appointmentTime: "10:00am",
        purpose: "General",
        type: "New Patient",
        paidAmount: "₦150",
    },
    {
        id: "#00028",
        name: "Dr. Musa Ahmed",
        appointmentDate: "14th Dec 2024",
        appointmentTime: "1:00pm",
        purpose: "General",
        type: "Old Patient",
        paidAmount: "₦350",
    },
    {
        id: "#00118",
        name: "Dr. Peter Obi",
        appointmentDate: "16th Dec 2024",
        appointmentTime: "9:30am",
        purpose: "General",
        type: "Old Patient",
        paidAmount: "₦50",
    },
    {
        id: "#00118",
        name: "Dr. Chima Okenwa",
        appointmentDate: "24th Nov 2024",
        appointmentTime: "6:00pm",
        purpose: "General",
        type: "New Patient",
        paidAmount: "₦250",
    },
];

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


export default function PatientDashboard() {
  const stats = {
    appointments: 12,
    medicalRecords: 5,
    labTests: 3,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
            icon={<Calendar />}
            label="Appointments" value={stats.appointments.toString()} subtext="Scheduled" 
            progress={75} color="#D90067" />
        <StatCard 
            icon={<Briefcase />}
            label="Medical Records" value={stats.medicalRecords.toString()} subtext="Files" 
            progress={40} color="#00A76F" />
        <StatCard 
            icon={<FlaskConical />}
            label="Lab Tests" value={stats.labTests.toString()} subtext="Results Pending"
            progress={60} color="#46C8F5" />
      </div>

      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <EarningCard label="Last Bill" value="250.00" icon={<span className="text-2xl font-normal">₦</span>} subtext="For general checkup" cta="View payment history"/>
            <EarningCard label="Prescriptions" value="3" subtext="Active" />
            <div className="flex justify-between items-center w-full md:w-auto">
              <EarningCard label="Next Appointment" value="Dec 11, 2024" subtext="with Dr. Tosin Adebayo" />
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full bg-cyan-400 text-white border-cyan-400 hover:bg-cyan-500 hover:text-white">Upcoming</Button>
              <Button variant="ghost" className="rounded-full">Today</Button>
            </div>
          </div>
          {/* Desktop View */}
          <div className="overflow-x-auto hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor Name</TableHead>
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
                              <Link href="/patients/reschedule-appointment">
                                <Eye className="h-4 w-4 mr-1"/> View
                              </Link>
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
                          <Link href="/patients/reschedule-appointment">
                            <Eye className="h-4 w-4 mr-1"/> View
                          </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="bg-red-100 text-red-600 border-none hover:bg-red-200 flex-1">
                          <X className="h-4 w-4 mr-1"/> Cancel
                      </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
