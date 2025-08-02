
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, ArrowRight, FileText, Stethoscope, HeartPulse } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const HealthCheckCard = ({ title, icon, lastUsed, bgColor, iconColor }: { title: string, icon: React.ReactNode, lastUsed: string, bgColor: string, iconColor: string }) => (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgColor}`}>
                    {icon}
                </div>
                <div>
                    <h3 className="font-semibold text-md">{title}</h3>
                     <p className="text-xs text-muted-foreground">Last used: {lastUsed}</p>
                </div>
            </div>
             <Button variant="ghost" className="w-full justify-start mt-4 text-sm text-primary h-8 p-2">
                Check Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </CardContent>
    </Card>
);

const TestResultItem = ({ icon, name, date, status, statusColor }: { icon: React.ReactNode, name: string, date: string, status: string, statusColor: string }) => (
    <TableRow>
        <TableCell>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md flex items-center justify-center bg-gray-100">
                    {icon}
                </div>
                <div>
                    <p className="font-medium text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground">{date}</p>
                </div>
            </div>
        </TableCell>
        <TableCell>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>{status}</span>
        </TableCell>
        <TableCell className="text-right">
            <Button variant="outline" size="sm">View</Button>
        </TableCell>
    </TableRow>
);


export default function PatientDashboard() {
  const patient = {
    name: "Tosin Chukwuka",
    id: "PT00136",
    membership: "Basic",
    avatarUrl: "https://placehold.co/128x128.png",
    avatarHint: "woman portrait",
    info: {
        "Gender": "Male",
        "Blood group": "O+ (Positive)",
        "Allergies": "Milk, Penicilin",
        "Diseases": "Diabetes, Blood Disorders",
        "Height": "1.78m",
        "Weight": "66kg",
        "Patient ID": "00018",
        "Last Appointment": "18th Dec 2024",
        "DOB": "20th Oct 1991"
    }
  };

  const appointments = [
      { doctor: "Dr. Susan Mandible", date: "22nd Sep 2025", time: "4:30pm", type: "Video call", status: "Confirmed" },
      { doctor: "Dr. Esther Against", date: "20th Nov 2025", time: "4:30pm", type: "On-site", status: "Pending" },
  ]

  const testResults = [
      { name: "CT Scan - Full Body", date: "12th Feb 2024", status: "Completed", statusColor: "bg-green-100 text-green-800" },
      { name: "Creatine Kinese - T", date: "16th Jul 2024", status: "Pending", statusColor: "bg-yellow-100 text-yellow-800" },
      { name: "Eye Fluorescein Test", date: "21st Jan 2025", status: "Completed", statusColor: "bg-green-100 text-green-800" },
      { name: "Full Body X-Ray", date: "28th Sep 2024", status: "Cancelled", statusColor: "bg-red-100 text-red-800" },
  ]

  const ToothIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-cyan-600">
        <path d="M9.5 3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2.4a1 1 0 0 0 .6.9l5.1 2.9a1 1 0 0 1 .3 1.4l-1.9 3.2a1 1 0 0 1-1.4.3l-2-1.2a1 1 0 0 0-1 0l-2 1.2a1 1 0 0 1-1.4-.3l-1.9-3.2a1 1 0 0 1 .3-1.4l5.1-2.9a1 1 0 0 0 .6-.9V3.5Z" />
        <path d="m5 14 2.4-1.4" />
        <path d="M19 14l-2.4-1.4" />
        <path d="m5 18 3.4-2.4" />
        <path d="M19 18l-3.4-2.4" />
    </svg>
  );

  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Welcome back, {patient.name.split(' ')[0]}!</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <Card className="shadow-sm">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                        <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
                            <AvatarImage src={patient.avatarUrl} alt={patient.name} data-ai-hint={patient.avatarHint} />
                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="font-bold text-xl">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.id}</p>
                        <p className="text-sm text-muted-foreground mt-2 bg-primary/10 text-primary px-3 py-1 rounded-full">Membership: {patient.membership}</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Patient's Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                            {Object.entries(patient.info).map(([key, value]) => (
                                <React.Fragment key={key}>
                                    <span className="font-semibold text-gray-600">{key}</span>
                                    <span className="text-right text-muted-foreground">{value}</span>
                                </React.Fragment>
                            ))}
                        </div>
                        <Button variant="outline" className="mt-6 w-full text-primary border-primary hover:bg-primary/5">
                            Show More Details
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <HealthCheckCard
                        title="Health Checks"
                        icon={<Stethoscope className="h-6 w-6 text-pink-600" />}
                        lastUsed="2 Hours ago"
                        bgColor="bg-pink-100"
                        iconColor="text-pink-600"
                    />
                     <HealthCheckCard
                        title="Dental Checkup"
                        icon={<ToothIcon />}
                        lastUsed="2 Days ago"
                        bgColor="bg-cyan-100"
                        iconColor="text-cyan-600"
                     />
                     <HealthCheckCard
                        title="Cardio Fitness"
                        icon={<HeartPulse className="h-6 w-6 text-purple-600" />}
                        lastUsed="1 Week ago"
                        bgColor="bg-purple-100"
                        iconColor="text-purple-600"
                    />
                </div>
                 <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Test Results</CardTitle>
                        <Button variant="ghost" size="sm">View All</Button>
                    </CardHeader>
                    <CardContent>
                       <Table>
                           <TableHeader>
                               <TableRow>
                                   <TableHead>Test</TableHead>
                                   <TableHead>Status</TableHead>
                                   <TableHead className="text-right">Action</TableHead>
                               </TableRow>
                           </TableHeader>
                           <TableBody>
                                {testResults.map((result, index) => (
                                    <TestResultItem key={index} icon={<FileText className="h-5 w-5 text-gray-500" />} {...result} />
                                ))}
                           </TableBody>
                       </Table>
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                         <Button variant="ghost" className="text-primary hover:text-primary">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Book new appointment
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Doctor</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Time</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appointments.map((appt, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{appt.doctor}</TableCell>
                                            <TableCell>{appt.date}</TableCell>
                                            <TableCell>{appt.time}</TableCell>
                                            <TableCell>{appt.type}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs ${appt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {appt.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
