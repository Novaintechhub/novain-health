
"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { DoctorProfile } from "@/lib/types";
import { nigerianStates } from "@/lib/nigeria-data";
import ImageUpload from "@/components/shared/image-upload";
import { useFieldArray, useForm, Controller } from "react-hook-form";

type ProfileFormData = Omit<DoctorProfile, 'uid' | 'email' | 'role' | 'createdAt' | 'isVerified' | 'rating' | 'reviews' | 'location' | 'availability' | 'price' | 'image' | 'hint' | 'memberSince' | 'earned' | 'accountStatus'>;

export default function ProfileSettings() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageToUpload, setImageToUpload] = useState<string | null>(null);
  const [lgas, setLgas] = useState<string[]>([]);
  
  const form = useForm<ProfileFormData>({
      defaultValues: {
          firstName: '',
          lastName: '',
          mobileNumber: '',
          gender: '',
          dateOfBirth: '',
          aboutMe: '',
          clinicName: '',
          clinicAddress: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          stateOfResidence: '',
          lga: '',
          pricing: 'Free',
          services: [],
          specializations: [],
          education: [],
          experience: [],
          awards: [],
          memberships: [],
          registrations: [],
      }
  });

  const { control, register, handleSubmit, reset, watch } = form;

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({ control, name: "education" });
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({ control, name: "experience" });
  const { fields: awardsFields, append: appendAward, remove: removeAward } = useFieldArray({ control, name: "awards" });
  const { fields: membershipsFields, append: appendMembership, remove: removeMembership } = useFieldArray({ control, name: "memberships" });
  const { fields: registrationsFields, append: appendRegistration, remove: removeRegistration } = useFieldArray({ control, name: "registrations" });
  
  const selectedState = watch('stateOfResidence');
  const initialImageUrl = useMemo(() => user?.photoURL, [user]);

  useEffect(() => {
    if (selectedState) {
      const stateData = nigerianStates.find(s => s.name === selectedState);
      setLgas(stateData ? stateData.lgas : []);
    } else {
      setLgas([]);
    }
  }, [selectedState]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/doctor/profile', {
          headers: { 'Authorization': `Bearer ${idToken}` },
        });
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data: DoctorProfile = await response.json();
        reset(data); // Reset form with fetched data
        if (data.stateOfResidence) {
          const stateData = nigerianStates.find(s => s.name === data.stateOfResidence);
          setLgas(stateData ? stateData.lgas : []);
        }
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
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
  }, [user, authLoading, toast, reset]);


  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    setIsSubmitting(true);

    try {
        const idToken = await user.getIdToken();
        const payload = {
            ...data,
            profileImage: imageToUpload,
        };
        
        const response = await fetch('/api/doctor/profile', {
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

  if (authLoading || loading) {
    return <Skeleton className="w-full h-96" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      
      {/* Basic Information */}
      <Card>
        <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
        <CardContent className="space-y-6">
           <ImageUpload onImageChange={setImageToUpload} currentImageUrl={initialImageUrl} />
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label htmlFor="firstName">First Name</Label><Input id="firstName" {...register("firstName")} disabled /></div>
              <div><Label htmlFor="lastName">Last Name</Label><Input id="lastName" {...register("lastName")} disabled /></div>
              <div><Label htmlFor="mobileNumber">Phone Number</Label><Input id="mobileNumber" {...register("mobileNumber")} /></div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Controller name="gender" control={control} render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                        <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem></SelectContent>
                    </Select>
                )}/>
              </div>
              <div><Label htmlFor="dateOfBirth">Date of Birth</Label><Input id="dateOfBirth" type="date" {...register("dateOfBirth")} /></div>
           </div>
        </CardContent>
      </Card>

      {/* About Me */}
      <Card>
        <CardHeader><CardTitle>About Me</CardTitle></CardHeader>
        <CardContent>
          <Label htmlFor="aboutMe" className="sr-only">About Me</Label>
          <Textarea id="aboutMe" rows={5} {...register("aboutMe")} />
        </CardContent>
      </Card>
      
      {/* Clinic Info */}
      <Card>
          <CardHeader><CardTitle>Clinic Info</CardTitle></CardHeader>
          <CardContent className="space-y-4">
              <div><Label htmlFor="clinicName">Clinic Name</Label><Input id="clinicName" {...register("clinicName")} /></div>
              <div><Label htmlFor="clinicAddress">Clinic Address</Label><Input id="clinicAddress" {...register("clinicAddress")} /></div>
          </CardContent>
      </Card>

      {/* Contact Details */}
      <Card>
        <CardHeader><CardTitle>Contact Details</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2"><Label htmlFor="addressLine1">Address</Label><Input id="addressLine1" {...register("addressLine1")} /></div>
            <div><Label htmlFor="city">City</Label><Input id="city" {...register("city")} /></div>
            <div>
              <Label htmlFor="stateOfResidence">State of Residence</Label>
              <Controller name="stateOfResidence" control={control} render={({ field }) => (
                <Select onValueChange={(value) => { field.onChange(value); form.setValue('lga', ''); }} value={field.value}>
                  <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                  <SelectContent>
                    {nigerianStates.map(state => <SelectItem key={state.name} value={state.name}>{state.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              )}/>
            </div>
            <div>
                <Label htmlFor="lga">LGA of Residence</Label>
                <Controller name="lga" control={control} render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} disabled={lgas.length === 0}>
                        <SelectTrigger><SelectValue placeholder="Select LGA" /></SelectTrigger>
                        <SelectContent>{lgas.map(lga => <SelectItem key={lga} value={lga}>{lga}</SelectItem>)}</SelectContent>
                    </Select>
                )}/>
            </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
        <CardContent>
            <Label htmlFor="pricing">Set your pricing tier</Label>
            <Controller name="pricing" control={control} render={({ field }) => (
                 <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Free">Free</SelectItem>
                        <SelectItem value="1000">₦1000</SelectItem>
                        <SelectItem value="2500">₦2500</SelectItem>
                        <SelectItem value="5000">₦5000</SelectItem>
                    </SelectContent>
                </Select>
            )}/>
        </CardContent>
      </Card>
      
      {/* Education */}
      <Card>
          <CardHeader>
              <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              {educationFields.map((field, index) => (
                  <div key={field.id} className="space-y-2 border p-4 rounded-md relative">
                      <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeEducation(index)}><Trash2 className="h-4 w-4" /></Button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><Label>Degree</Label><Input {...register(`education.${index}.degree`)} /></div>
                          <div><Label>College/Institute</Label><Input {...register(`education.${index}.college`)} /></div>
                          <div><Label>Year Started</Label><Input type="number" {...register(`education.${index}.yearStarted`)} /></div>
                          <div><Label>Year Completed</Label><Input type="number" {...register(`education.${index}.yearCompleted`)} /></div>
                      </div>
                  </div>
              ))}
              <Button type="button" variant="outline" onClick={() => appendEducation({ college: '', degree: '', yearStarted: '', yearCompleted: ''})}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
          </CardContent>
      </Card>
      
      {/* Experience */}
      <Card>
          <CardHeader><CardTitle>Experience</CardTitle></CardHeader>
          <CardContent className="space-y-4">
              {experienceFields.map((field, index) => (
                  <div key={field.id} className="space-y-2 border p-4 rounded-md relative">
                       <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeExperience(index)}><Trash2 className="h-4 w-4" /></Button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div><Label>Hospital Name</Label><Input {...register(`experience.${index}.hospital`)} /></div>
                          <div><Label>Designation</Label><Input {...register(`experience.${index}.designation`)} /></div>
                          <div><Label>From</Label><Input type="date" {...register(`experience.${index}.from`)} /></div>
                          <div><Label>To</Label><Input type="date" {...register(`experience.${index}.to`)} /></div>
                      </div>
                  </div>
              ))}
              <Button type="button" variant="outline" onClick={() => appendExperience({ hospital: '', designation: '', from: '', to: ''})}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
          </CardContent>
      </Card>
      
      {/* Other Sections (Awards, Memberships, Registrations) */}
      <Card>
        <CardHeader><CardTitle>Awards</CardTitle></CardHeader>
        <CardContent className="space-y-4">
           {awardsFields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Award</Label><Input {...register(`awards.${index}.name`)} /></div>
                  <div><Label>Year</Label><Input type="number" {...register(`awards.${index}.year`)} /></div>
                </div>
                <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => removeAward(index)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          <Button type="button" variant="outline" onClick={() => appendAward({ name: '', year: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Award</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Memberships</CardTitle></CardHeader>
        <CardContent className="space-y-4">
           {membershipsFields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2">
                <div className="flex-1"><Label>Membership</Label><Input {...register(`memberships.${index}.organization`)} /></div>
                <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => removeMembership(index)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          <Button type="button" variant="outline" onClick={() => appendMembership({ organization: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Membership</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader><CardTitle>Registrations</CardTitle></CardHeader>
        <CardContent className="space-y-4">
            {registrationsFields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Registration</Label><Input {...register(`registrations.${index}.registration`)} /></div>
                  <div><Label>Year</Label><Input type="number" {...register(`registrations.${index}.year`)} /></div>
                </div>
                <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => removeRegistration(index)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          <Button type="button" variant="outline" onClick={() => appendRegistration({ registration: '', year: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Registration</Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="bg-cyan-500 hover:bg-cyan-600 text-white">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
