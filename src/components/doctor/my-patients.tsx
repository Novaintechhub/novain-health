
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { PatientProfile } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

export default function MyPatients() {
  const [patients, setPatients] = useState<PatientProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchPatients() {
        if (!user) return;
        try {
            const idToken = await user.getIdToken();
            const response = await fetch('/api/my-patients', {
                headers: { 'Authorization': `Bearer ${idToken}` }
            });
            if(!response.ok) throw new Error("Failed to fetch patients");
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Failed to fetch patients:", error);
        } finally {
            setLoading(false);
        }
    }
    fetchPatients();
  }, [user]);

  const PatientRowSkeleton = () => (
    <TableRow>
        <TableCell>
            <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                </div>
            </div>
        </TableCell>
        <TableCell><Skeleton className="h-4 w-28" /></TableCell>
        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
        <TableCell><Skeleton className="h-4 w-12" /></TableCell>
        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
    </TableRow>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Patients</CardTitle>
      </CardHeader>
      <CardContent>
         <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Last Appointment</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        [...Array(3)].map((_, i) => <PatientRowSkeleton key={i} />)
                    ) : patients.length > 0 ? (
                        patients.map(patient => (
                        <TableRow key={patient.uid}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={patient.imageUrl} alt={`${patient.firstName} ${patient.lastName}`} data-ai-hint="person portrait" />
                                        <AvatarFallback>{patient.firstName.charAt(0)}{patient.lastName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <span className="font-medium">{`${patient.firstName} ${patient.lastName}`}</span>
                                        <p className="text-sm text-muted-foreground">{patient.patientId}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{patient.mobileNumber}</TableCell>
                            <TableCell>{patient.lga}, {patient.stateOfResidence}</TableCell>
                            <TableCell>
                                <Badge variant="outline">{patient.bloodGroup || 'N/A'}</Badge>
                            </TableCell>
                            <TableCell>{patient.lastVisit}</TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">You have not seen any patients yet.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
         </div>
      </CardContent>
    </Card>
  );
}
