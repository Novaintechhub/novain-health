
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
import { X, PlusCircle, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import ImageUpload from "@/components/shared/image-upload";
import type { DoctorProfile } from "@/lib/types";
import { nigerianStates, nigerianLanguages } from "@/lib/nigeria-data";


const DoctorProfileUpdateSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    mobileNumber: z.string().optional().nullable(),
    gender: z.string().optional().nullable(),
    dateOfBirth: z.string().optional().nullable(),
    aboutMe: z.string().optional().nullable(),
    profileImage: z.string().optional().nullable(),
    imageUrl: z.string().optional().nullable(),
    
    clinicName: z.string().optional().nullable(),
    clinicAddress: z.string().optional().nullable(),
    
    addressLine1: z.string().optional().nullable(),
    addressLine2: z.string().optional().nullable(),
    city: z.string().optional().nullable(),
    state: z.string().optional().nullable(),
    
    pricing: z.string().optional().nullable(),
  
    services: z.array(z.string()).optional(),
    specializations: z.array(z.string()).optional(),
  
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
    stateOfResidence: z.string().optional().nullable(),
    lga: z.string().optional().nullable(),
    language: z.string().optional().nullable(),
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
  const [lgas, setLgas] = useState<string[]>([]);
  
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
        education: [],
        experience: [],
        awards: [],
        memberships: [],
        registrations: [],
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

  const selectedState = form.watch("stateOfResidence");

  useEffect(() => {
    if (selectedState) {
        const state = nigerianStates.find(s => s.name === selectedState);
        setLgas(state ? state.lgas : []);
    } else {
        setLgas([]);
    }
  }, [selectedState]);

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
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : "",
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
      await user.reload();
      const freshTokenResult = await user.getIdTokenResult(true);
      await fetchProfile();
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
                <Controller
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                      <ImageUpload onImageChange={field.onChange} currentImageUrl={form.watch('imageUrl')}/>
                  )}
                />
              <h3 className="text-xl font-semibold mt-4">{form.watch('firstName')} {form.watch('lastName')}</h3>
              <p className="text-sm text-muted-foreground">BDS, MDS - Oral & Maxillofacial Surgery</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="address-line-1">Address Line 1</Label>
                    <Input id="address-line-1" {...form.register('addressLine1')} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="address-line-2">Address Line 2</Label>
                    <Input id="address-line-2" {...form.register('addressLine2')} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...form.register('city')} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" {...form.register('state')} />
                </div>
            </CardContent>
           </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent>
                    <Controller
                        control={form.control}
                        name="pricing"
                        render={({ field }) => (
                            <RadioGroup onValueChange={field.onChange} value={field.value ?? undefined} className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Free" id="free" />
                                    <Label htmlFor="free">Free</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Custom" id="custom" />
                                    <Label htmlFor="custom">Custom Price (per hour)</Label>
                                </div>
                                {field.value?.startsWith('Custom') && (
                                     <Input 
                                        type="number" 
                                        placeholder="30" 
                                        className="mt-2"
                                        onChange={(e) => field.onChange(`Custom ${e.target.value}`)}
                                        value={field.value.replace('Custom ', '')}
                                     />
                                )}
                            </RadioGroup>
                        )}
                    />
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
                  <Input id="first-name" {...form.register("firstName")} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" {...form.register("lastName")} disabled />
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
                      <Select onValueChange={field.onChange} value={field.value ?? undefined}>
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
                <div className="space-y-2">
                    <Label>State of Residence</Label>
                    <Controller
                        control={form.control} name="stateOfResidence"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value ?? ''}>
                                <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                                <SelectContent>
                                    {nigerianStates.map(state => (<SelectItem key={state.name} value={state.name}>{state.name}</SelectItem>))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
                <div className="space-y-2">
                    <Label>LGA of Residence</Label>
                    <Controller
                        control={form.control} name="lga"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value ?? ''} disabled={lgas.length === 0}>
                                <SelectTrigger><SelectValue placeholder="Select LGA" /></SelectTrigger>
                                <SelectContent>
                                    {lgas.map(lga => (<SelectItem key={lga} value={lga}>{lga}</SelectItem>))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
                 <div className="space-y-2">
                    <Label>Language</Label>
                     <Controller
                        control={form.control} name="language"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value ?? ''}>
                                <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
                                <SelectContent>
                                    {nigerianLanguages.map(lang => (<SelectItem key={lang} value={lang}>{lang}</SelectItem>))}
                                </SelectContent>
                            </Select>
                        )}
                    />
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

            <Card>
                <CardHeader><CardTitle>Professional Details</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                    {/* Education */}
                    <div className="space-y-4">
                        <Label>Education</Label>
                        {educationFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md relative">
                             <div className="space-y-2"><Label>College/Institute</Label><Input {...form.register(`education.${index}.college`)} /></div>
                             <div className="space-y-2"><Label>Degree</Label><Input {...form.register(`education.${index}.degree`)} /></div>
                             <div className="space-y-2"><Label>Year Started</Label><Input type="number" {...form.register(`education.${index}.yearStarted`)} /></div>
                             <div className="space-y-2"><Label>Year Completed</Label><Input type="number" {...form.register(`education.${index}.yearCompleted`)} /></div>
                             <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeEducation(index)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => appendEducation({ college: '', degree: '', yearStarted: '', yearCompleted: '' })}><PlusCircle className="mr-2 w-4 h-4" /> Add Education</Button>
                    </div>

                     {/* Experience */}
                     <div className="space-y-4">
                        <Label>Experience</Label>
                        {experienceFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md relative">
                             <div className="space-y-2"><Label>Hospital Name</Label><Input {...form.register(`experience.${index}.hospital`)} /></div>
                             <div className="space-y-2"><Label>Designation</Label><Input {...form.register(`experience.${index}.designation`)} /></div>
                             <div className="space-y-2"><Label>From</Label><Input type="date" {...form.register(`experience.${index}.from`)} /></div>
                             <div className="space-y-2"><Label>To</Label><Input type="date" {...form.register(`experience.${index}.to`)} /></div>
                             <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeExperience(index)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => appendExperience({ hospital: '', designation: '', from: '', to: '' })}><PlusCircle className="mr-2 w-4 h-4" /> Add Experience</Button>
                    </div>

                    {/* Awards */}
                    <div className="space-y-4">
                        <Label>Awards</Label>
                        {awardsFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md relative">
                             <div className="space-y-2"><Label>Award</Label><Input {...form.register(`awards.${index}.name`)} /></div>
                             <div className="space-y-2"><Label>Year</Label><Input type="number" {...form.register(`awards.${index}.year`)} /></div>
                             <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeAward(index)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => appendAward({ name: '', year: '' })}><PlusCircle className="mr-2 w-4 h-4" /> Add Award</Button>
                    </div>

                    {/* Memberships */}
                    <div className="space-y-4">
                        <Label>Memberships</Label>
                        {membershipsFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 gap-4 border p-4 rounded-md relative">
                             <div className="space-y-2"><Label>Membership</Label><Input {...form.register(`memberships.${index}.organization`)} /></div>
                             <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeMembership(index)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => appendMembership({ organization: '' })}><PlusCircle className="mr-2 w-4 h-4" /> Add Membership</Button>
                    </div>

                    {/* Registrations */}
                    <div className="space-y-4">
                        <Label>Registrations</Label>
                        {registrationsFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md relative">
                             <div className="space-y-2"><Label>Registration</Label><Input {...form.register(`registrations.${index}.registration`)} /></div>
                             <div className="space-y-2"><Label>Year</Label><Input type="number" {...form.register(`registrations.${index}.year`)} /></div>
                             <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeRegistration(index)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => appendRegistration({ registration: '', year: '' })}><PlusCircle className="mr-2 w-4 h-4" /> Add Registration</Button>
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
