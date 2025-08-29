
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { PatientProfile } from "@/lib/types";

export default function AdminPatients() {
  const [patients, setPatients] = useState<PatientProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await fetch('/api/admin-patients');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Patients</CardTitle>
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
        <CardTitle>Patients List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Paid</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.map(patient => (
                    <TableRow key={patient.uid}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                <AvatarImage src={patient.avatarUrl} alt={`${patient.firstName} ${patient.lastName}`} data-ai-hint={patient.avatarHint} />
                                <AvatarFallback>{patient.firstName.charAt(0)}{patient.lastName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{`${patient.firstName} ${patient.lastName}`}</span>
                            </div>
                        </TableCell>
                        <TableCell>{patient.age || 'N/A'}</TableCell>
                        <TableCell>{patient.address || `${patient.lga}, ${patient.stateOfResidence}`}</TableCell>
                        <TableCell>{patient.phone}</TableCell>
                        <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                        <TableCell>{patient.paid}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
