
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
import { nigerianStates, nigerianLanguages } from "@/lib/nigeria-data";


export default function PatientProfileSettings() {
  const { user, loading: authLoading } = useAuth() || {};
  const { toast } = useToast();
  const [profile, setProfile] = useState<Partial<PatientProfile>>({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageToUpload, setImageToUpload] = useState<string | null>(null);
  const [lgas, setLgas] = useState<string[]>([]);

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
        if (data.stateOfResidence) {
          const state = nigerianStates.find(s => s.name === data.stateOfResidence);
          if (state) setLgas(state.lgas);
        }
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
        setLoading(false);
    }
  }, [user, authLoading, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };
  
  const handleSelectChange = (field: keyof PatientProfile) => (value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleStateChange = (stateName: string) => {
    const state = nigerianStates.find(s => s.name === stateName);
    setLgas(state ? state.lgas : []);
    setProfile(prev => ({ ...prev, stateOfResidence: stateName, lga: '' })); // Reset LGA on state change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    try {
        const idToken = await user.getIdToken();
        const payload = {
            ...profile,
            profileImage: imageToUpload,
        };
        
        const response = await fetch('/api/patient/profile', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update profile");
        }

        toast({
            title: "Profile Updated",
            description: "Your changes have been saved successfully.",
        });
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: error.message,
        });
    } finally {
        setIsSubmitting(false);
    }
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
                <ImageUpload onImageChange={setImageToUpload} currentImageUrl={profile?.imageUrl || user?.photoURL} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" value={profile.firstName || ''} onChange={handleChange} disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" value={profile.lastName || ''} onChange={handleChange} disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input id="dateOfBirth" type="date" value={profile.dateOfBirth || '1983-07-24'} onChange={handleChange}/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <Select value={profile.bloodGroup} onValueChange={handleSelectChange('bloodGroup')}>
                            <SelectTrigger id="bloodGroup">
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
                        <Input id="email" type="email" value={profile.email || ''} disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="mobileNumber">Phone Number</Label>
                        <Input id="mobileNumber" value={profile.mobileNumber || ''} onChange={handleChange} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="language">Preferred Language</Label>
                         <Select value={profile.language} onValueChange={handleSelectChange('language')}>
                            <SelectTrigger id="language">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                {nigerianLanguages.map(lang => (
                                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" value={profile.address || ''} onChange={handleChange}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stateOfResidence">State</Label>
                        <Select value={profile.stateOfResidence} onValueChange={handleStateChange}>
                            <SelectTrigger id="stateOfResidence">
                                <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent>
                                {nigerianStates.map(state => (
                                    <SelectItem key={state.name} value={state.name}>{state.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lga">LGA</Label>
                         <Select value={profile.lga} onValueChange={handleSelectChange('lga')} disabled={lgas.length === 0}>
                            <SelectTrigger id="lga">
                                <SelectValue placeholder="Select LGA" />
                            </SelectTrigger>
                            <SelectContent>
                                {lgas.map(lga => (
                                    <SelectItem key={lga} value={lga}>{lga}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" defaultValue="Nigeria" disabled />
                    </div>
                </div>
            </CardContent>
        </Card>
        <div className="flex justify-end">
            <Button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
        </div>
        </div>
    </form>
  );
}
