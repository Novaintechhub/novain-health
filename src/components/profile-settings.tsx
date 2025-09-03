
"use client";

import { useState, useEffect, useCallback } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud, Trash2, X, PlusCircle } from "lucide-react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import ImageUpload from "@/components/shared/image-upload";
import type { DoctorProfile } from "@/lib/types";


const DoctorProfileUpdateSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    mobileNumber: z.string().optional(),
    gender: z.string().optional(),
    dateOfBirth: z.string().optional(),
    aboutMe: z.string().optional(),
    profileImage: z.string().optional(),
    imageUrl: z.string().optional(),
    
    // Clinic Info
    clinicName: z.string().optional(),
    clinicAddress: z.string().optional(),
    
    // Contact Details
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
  
    // Pricing
    pricing: z.any().optional(),
  
    // Services and Specialization
    services: z.array(z.string()).optional(),
    specializations: z.array(z.string()).optional(),
  
    // Professional Details
    education: z.array(z.object({
        college: z.string(),
        degree: z.string(),
        yearStarted: z.string(),
        yearCompleted: z.string(),
    })).optional(),
    experience: z.array(z.object({
        hospital: z.string(),
        designation: z.string(),
        from: z.string(),
        to: z.string(),
    })).optional(),
    awards: z.array(z.object({
        name: z.string(),
        year: z.string(),
    })).optional(),
    memberships: z.array(z.object({
        organization: z.string(),
    })).optional(),
    registrations: z.array(z.object({
        registration: z.string(),
        year: z.string(),
    })).optional(),
});
  
type DoctorProfileUpdateInput = z.infer<typeof DoctorProfileUpdateSchema>;


const TagInput = ({
  tags,
  onTagsChange,
  placeholder,
  note,
}: {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder: string;
  note: string;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        onTagsChange([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-input p-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 rounded-md bg-cyan-400 px-2 py-1 text-sm text-white"
          >
            <span>{tag}</span>
            <button onClick={() => removeTag(tag)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 border-0 shadow-none focus-visible:ring-0"
        />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  );
};


export default function ProfileSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  
  const form = useForm<DoctorProfileUpdateInput>({
    resolver: zodResolver(DoctorProfileUpdateSchema),
    defaultValues: {
        firstName: "",
        lastName: "",
        mobileNumber: "",
        gender: "",
        dateOfBirth: "",
        aboutMe: "",
        profileImage: "",
        imageUrl: "",
        services: [],
        specializations: [],
        education: [{ college: "", degree: "", yearStarted: "", yearCompleted: "" }],
        experience: [{ hospital: "", designation: "", from: "", to: "" }],
        awards: [{ name: "", year: "" }],
        memberships: [{ organization: "" }],
        registrations: [{ registration: "", year: "" }],
    },
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: "education",
  });
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control: form.control,
    name: "experience",
  });
  const { fields: awardsFields, append: appendAward, remove: removeAward } = useFieldArray({
    control: form.control,
    name: "awards",
  });
  const { fields: membershipsFields, append: appendMembership, remove: removeMembership } = useFieldArray({
    control: form.control,
    name: "memberships",
  });
  const { fields: registrationsFields, append: appendRegistration, remove: removeRegistration } = useFieldArray({
    control: form.control,
    name: "registrations",
  });

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/doctor/profile', {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!response.ok) throw new Error("Failed to fetch profile");
      const data: DoctorProfile = await response.json();
      form.reset({
        ...data,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : "", // Format date for input
      });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not load profile data." });
    } finally {
      setLoading(false);
    }
  }, [user, form, toast]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);


  const onSubmit = async (data: DoctorProfileUpdateInput) => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/doctor/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }
      
      toast({ title: "Success", description: "Profile updated successfully." });
      await fetchProfile(); // Refetch to get the latest data including new image URL
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };
  
  if (loading) {
      return (
          <div className="space-y-6">
              <Skeleton className="h-8 w-1/4" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                      <Skeleton className="h-64 w-full" />
                  </div>
                  <div className="lg:col-span-2 space-y-8">
                      <Skeleton className="h-80 w-full" />
                      <Skeleton className="h-40 w-full" />
                  </div>
              </div>
          </div>
      )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
                <Controller
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                      <ImageUpload onImageChange={field.onChange} currentImageUrl={form.getValues('imageUrl')}/>
                  )}
                />
              <h3 className="text-xl font-semibold mt-4">{form.watch('firstName')} {form.watch('lastName')}</h3>
              <p className="text-sm text-muted-foreground">BDS, MDS - Oral & Maxillofacial Surgery</p>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" {...form.register("firstName")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" {...form.register("lastName")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input id="phone-number" {...form.register("mobileNumber")} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Controller
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="gender"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" {...form.register("dateOfBirth")} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea {...form.register("aboutMe")} placeholder="Say something about yourself" rows={5} />
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Clinic Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="clinic-name">Clinic Name</Label>
                  <Input id="clinic-name" {...form.register("clinicName")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinic-address">Clinic Address</Label>
                  <Input id="clinic-address" {...form.register("clinicAddress")} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle>Services and Specialization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                <Label>Services</Label>
                 <Controller
                    control={form.control}
                    name="services"
                    render={({ field }) => (
                        <TagInput
                            tags={field.value || []}
                            onTagsChange={field.onChange}
                            placeholder="Add Services"
                            note="NB: Type and Press Enter to add new service"
                        />
                    )}
                    />
                </div>
                <div className="space-y-2">
                <Label>Specialization</Label>
                 <Controller
                    control={form.control}
                    name="specializations"
                    render={({ field }) => (
                        <TagInput
                        tags={field.value || []}
                        onTagsChange={field.onChange}
                        placeholder="Add Specialization"
                        note="NB: Type and Press Enter to add new specialization"
                        />
                    )}
                    />
                </div>
            </CardContent>
           </Card>

          <div>
             <Button type="submit" style={{ backgroundColor: '#46C8F5', color: 'white' }} disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
             </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

    