
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FilePen } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function PatientProfile() {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-8 w-1/3" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={user.photoURL || "https://placehold.co/96x96.png"} alt={user.displayName || "Patient"} data-ai-hint="woman portrait" />
                <AvatarFallback>{user.displayName?.charAt(0) || 'P'}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl">{user.displayName || "Tosin Chukwuka"}</CardTitle>
                <p className="text-muted-foreground">Patient ID: {user.uid.substring(0, 8).toUpperCase()}</p>
              </div>
            </div>
            <Button asChild variant="outline" className="text-primary border-primary hover:bg-primary/5 hover:text-primary">
              <Link href="/patients/profile-settings">
                <FilePen className="mr-2 h-4 w-4" /> Edit Profile
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Full Name</span>
                        <span className="font-medium">{user.displayName}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Email Address</span>
                        <span className="font-medium">{user.email}</span>
                    </div>
                     <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Date of Birth</span>
                        <span className="font-medium">24 Jul 1983</span>
                    </div>
                     <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Phone Number</span>
                        <span className="font-medium">{user.phoneNumber || "Not provided"}</span>
                    </div>
                </div>
            </div>
            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Medical Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Blood Group</span>
                        <span className="font-medium">O+</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Genotype</span>
                        <span className="font-medium">AA</span>
                    </div>
                     <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Allergies</span>
                        <span className="font-medium">None reported</span>
                    </div>
                     <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Current Medications</span>
                        <span className="font-medium">None</span>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
