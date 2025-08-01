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
import { Eye, Check, X } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const patientData = [
    {
        id: "#00016",
        name: "Tosin Adebayo",
        appointmentDate: "11th Dec 2024",
        appointmentTime: "10:00am",
        purpose: "General",
        type: "New Patient",
        paidAmount: "$150",
    },
    {
        id: "#00028",
        name: "Musa Ahmed",
        appointmentDate: "14th Dec 2024",
        appointmentTime: "1:00pm",
        purpose: "General",
        type: "Old Patient",
        paidAmount: "$350",
    },
    {
        id: "#00118",
        name: "Peter Obi",
        appointmentDate: "16th Dec 2024",
        appointmentTime: "9:30am",
        purpose: "General",
        type: "Old Patient",
        paidAmount: "$50",
    },
    {
        id: "#00118",
        name: "Chima Okenwa",
        appointmentDate: "24th Nov 2024",
        appointmentTime: "6:00pm",
        purpose: "General",
        type: "New Patient",
        paidAmount: "$250",
    },
    {
        id: "#00216",
        name: "Joshua Banks",
        appointmentDate: "3rd Dec 2024",
        appointmentTime: "3:00pm",
        purpose: "General",
        type: "Old Patient",
        paidAmount: "$85",
    },
    {
        id: "#00216",
        name: "Ify Nnachi",
        appointmentDate: "3rd Dec 2024",
        appointmentTime: "12:00pm",
        purpose: "General",
        type: "New Patient",
        paidAmount: "$80",
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
        {icon && <div className="text-2xl font-bold">{icon}</div>}
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <p className="text-xs text-muted-foreground">{subtext}</p>
      {cta && <a href="#" className="text-sm text-cyan-500 hover:underline mt-1">{cta}</a>}
    </div>
);


export default function Dashboard() {
  const stats = {
    totalPatients: 1500,
    todayPatients: 65,
    appointments: 85,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 0-5 5c0 1.66 1.34 3 3 3h4c1.66 0 3-1.34 3-3a5 5 0 0 0-5-5z"/><path d="M20 10c0-2-3-3-3-3s-1 1-3 1-3-1-3-1-3 1-3 3c0 2.5 4 5 6 5s6-2.5 6-5zM12 19.5c-3.5 0-6-1-6-1s2.5-1 6-1 6 1 6 1-2.5 1-6 1z"/></svg>} 
            label="Total Patient" value={stats.totalPatients.toString()} subtext="Till today" 
            progress={(stats.totalPatients % 1000) / 10} color="#D90067" />
        <StatCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h20"/><path d="M2 8h20"/><path d="M2 13h20"/><path d="M2 18h20"/></svg>}
            label="Today Patient" value={stats.todayPatients.toString()} subtext="12, Nov 2024" 
            progress={stats.todayPatients} color="#00A76F" />
        <StatCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>}
            label="Appointment" value={stats.appointments.toString()} subtext="06, Dec 2024"
            progress={stats.appointments} color="#46C8F5" />
      </div>

      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <EarningCard label="Wallet Balance" value="150,000.00" icon={<span className="text-2xl font-normal">₦</span>} subtext="One hundred and fifty thousand naira" cta="View payouts"/>
            <EarningCard label="Total Withdrawal" value="65,000" icon={<span className="text-2xl font-normal">₦</span>} subtext="" />
            <div className="flex justify-between items-center w-full md:w-1/3">
              <EarningCard label="Total Earnings" value="172,000" icon={<span className="text-2xl font-normal">₦</span>} subtext="After 20% commission" />
              <Button variant="ghost" size="icon">...</Button>
            </div>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-lg shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Patient Appointment</h3>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full bg-cyan-400 text-white border-cyan-400 hover:bg-cyan-500 hover:text-white">Upcoming</Button>
              <Button variant="ghost" className="rounded-full">Today</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Appointment</TableHead>
                  <TableHead className="hidden md:table-cell">Purpose</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
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
                    <TableCell className="hidden md:table-cell">{patient.purpose}</TableCell>
                    <TableCell className="hidden md:table-cell">{patient.type}</TableCell>
                    <TableCell>{patient.paidAmount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col sm:flex-row gap-2 justify-end">
                          <Button variant="ghost" size="sm" className="text-cyan-500 hover:bg-cyan-50">
                              <Eye className="h-4 w-4 mr-1"/> View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-500 hover:bg-green-50">
                              <Check className="h-4 w-4 mr-1"/> Accept
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">
                              <X className="h-4 w-4 mr-1"/> Cancel
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
