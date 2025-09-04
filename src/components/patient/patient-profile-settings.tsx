
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { PatientProfile } from "@/lib/types";
import ImageUpload from "@/components/shared/image-upload";

export default function PatientProfileSettings() {
  const { user, loading: authLoading } = useAuth() || {};
  const { toast } = useToast();
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/patient/profile', {
          headers: { 'Authorization': `Bearer ${idToken}` },
        });
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching patient profile:", error);
        toast({ variant: "destructive", title: "Error", description: "Could not load your profile." });
      } finally {
        setLoading(false);
      }
    };
    if (user) {
        fetchProfile();
    } else if (!authLoading) {
        setLoading(false); // If there's no user and we are not loading auth, stop loading profile.
    }
  }, [user, authLoading, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically have a POST request to update the profile
    toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
    });
  };
  
  const isLoading = authLoading || loading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Card>
            <CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-center"><Skeleton className="h-24 w-24 rounded-full" /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                </div>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className="space-y-6">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <Card>
            <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <ImageUpload onImageChange={() => {}} currentImageUrl={profile?.imageUrl || user?.photoURL} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue={profile?.firstName} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue={profile?.lastName} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" defaultValue="1983-07-24" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="blood-group">Blood Group</Label>
                        <Select defaultValue={profile?.bloodGroup}>
                            <SelectTrigger id="blood-group">
                                <SelectValue placeholder="Select Blood Group" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="A+">A+</SelectItem>
                                <SelectItem value="A-">A-</SelectItem>
                                <SelectItem value="B+">B+</SelectItem>
                                <SelectItem value="B-">B-</SelectItem>
                                <SelectItem value="AB+">AB+</SelectItem>
                                <SelectItem value="AB-">AB-</SelectItem>
                                <SelectItem value="O+">O+</SelectItem>
                                <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={profile?.email} disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue={profile?.mobileNumber} />
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Address Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue={profile?.address} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue={profile?.lga} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" defaultValue={profile?.stateOfResidence} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" defaultValue="Nigeria" />
                    </div>
                </div>
            </CardContent>
        </Card>
        <div className="flex justify-end">
            <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white">Save Changes</Button>
        </div>
        </div>
    </form>
  );
}
