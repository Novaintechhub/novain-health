
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { DoctorProfile } from "@/lib/types";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await fetch('/api/admin-doctors');
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  const StatusBadge = ({ status }: { status: "active" | "inactive" }) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
    };
    return <Badge className={`capitalize ${statusClasses[status]}`}>{status}</Badge>;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Doctors</CardTitle>
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
        <CardTitle>Doctors List</CardTitle>
      </CardHeader>
      <CardContent>
         <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Doctor Name</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Member Since</TableHead>
                    <TableHead>Earned</TableHead>
                    <TableHead>Account Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {doctors.map(doctor => (
                    <TableRow key={doctor.uid}>
                        <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar>
                            <AvatarImage src={doctor.image} alt={`${doctor.firstName} ${doctor.lastName}`} data-ai-hint={doctor.hint} />
                            <AvatarFallback>{doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</span>
                        </div>
                        </TableCell>
                        <TableCell>{doctor.specialty || 'N/A'}</TableCell>
                        <TableCell>{new Date(doctor.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{doctor.earned}</TableCell>
                        <TableCell>
                            <StatusBadge status={doctor.accountStatus} />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
         </div>
      </CardContent>
    </Card>
  );
}
