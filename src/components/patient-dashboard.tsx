
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PlusCircle } from "lucide-react";

const HealthCheckCard = ({ title, icon, lastUsed, bgColor, iconClass }: { title: string, icon: React.ReactNode, lastUsed: string, bgColor: string, iconClass?: string }) => (
    <Card className="w-full">
        <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{title}</h3>
            </div>
            <div className="flex items-center justify-center mb-4">
                <div className={`w-24 h-24 rounded-lg flex items-center justify-center ${bgColor}`}>
                    <div className={iconClass}>{icon}</div>
                </div>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Last Used</span>
                <span>{lastUsed}</span>
            </div>
        </CardContent>
    </Card>
);

const TestResultItem = ({ icon, name, date, bgColor }: { icon: React.ReactNode, name: string, date: string, bgColor: string }) => (
    <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-md flex items-center justify-center ${bgColor}`}>
            {icon}
        </div>
        <div>
            <p className="font-medium text-sm">{name}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
        </div>
    </div>
);

export default function PatientDashboard() {
  const patient = {
    name: "Tosin Chukwuka",
    id: "PT00136",
    membership: "Basic",
    avatarUrl: "https://placehold.co/128x128.png",
    avatarHint: "woman portrait",
    info: {
        Gender: "Male",
        "Blood group": "O+ (Positive)",
        Allergies: "Milk, Penicilin",
        Diseases: "Diabetes, Blood Disorders",
        Height: "1.78m",
        Weight: "66kg",
        "Patient ID": "00018",
        "Last Appointment": "18th December 2024",
        DOB: "20th October 1991"
    }
  };

  const appointments = [
      { doctor: "Dr. Susan Mandible", date: "22nd September 2025", time: "4:30pm", type: "Video call" },
      { doctor: "Dr. Esther Against", date: "20th November 2025", time: "4:30pm", type: "On-site" },
  ]

  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Welcome back!</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardContent className="p-6 flex flex-col items-center">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={patient.avatarUrl} alt={patient.name} data-ai-hint={patient.avatarHint} />
                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="font-bold text-lg">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.id}</p>
                        <p className="text-sm text-muted-foreground mt-2">Membership Plan || {patient.membership}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Patient's Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-3 text-sm">
                            {Object.entries(patient.info).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                    <span className="font-semibold text-gray-600">{key}</span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                        <Button className="mt-6 w-full bg-cyan-400 hover:bg-cyan-500 text-white">
                            Read More
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <HealthCheckCard 
                        title="Health Checks"
                        icon={<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2 4 4v10a2 2 0 01-2 2z" stroke="#D90067" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.5 7.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" stroke="#D90067" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        lastUsed="2 Hours ago"
                        bgColor="bg-pink-100"
                    />
                     <HealthCheckCard 
                        title="Dental Checkup"
                        icon={<svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM12 18a6 6 0 100-12 6 6 0 000 12z" stroke="#46C8F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 15l6 6" stroke="#46C8F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 9a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#46C8F5"/></svg>}
                        lastUsed="2 Days ago"
                        bgColor="bg-cyan-50"
                     />
                     <HealthCheckCard 
                        title="Cardio Fitness"
                        icon={<svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h3l3-9 6 18 3-9h3" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        lastUsed="1 Week ago"
                        bgColor="bg-purple-100"
                    />
                </div>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Test Results</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <TestResultItem icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2 4 4v10a2 2 0 01-2 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} name="CT Scan - Full Body" date="12th February 2024" bgColor="bg-pink-400" />
                        <TestResultItem icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2 4 4v10a2 2 0 01-2 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} name="Creatine Kinese - T" date="16th July 2024" bgColor="bg-cyan-400" />
                        <TestResultItem icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2 4 4v10a2 2 0 01-2 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} name="Eye Fluorescein Test" date="21st January 2025" bgColor="bg-green-400" />
                        <TestResultItem icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2 4 4v10a2 2 0 01-2 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>} name="Full Body X-Ray" date="28th September 2024" bgColor="bg-indigo-400" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-end">
                                <Button variant="ghost" className="text-cyan-500">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Book new appointments
                                </Button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-muted-foreground">
                                            <th className="py-2 px-3 font-medium">Doctor</th>
                                            <th className="py-2 px-3 font-medium">Date</th>
                                            <th className="py-2 px-3 font-medium">Time</th>
                                            <th className="py-2 px-3 font-medium">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.map((appt, index) => (
                                            <tr key={index} className="border-t">
                                                <td className="py-3 px-3">{appt.doctor}</td>
                                                <td className="py-3 px-3">{appt.date}</td>
                                                <td className="py-3 px-3">{appt.time}</td>
                                                <td className="py-3 px-3">{appt.type}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
