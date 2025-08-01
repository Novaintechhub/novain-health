
"use client";

import { useState } from "react";
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


const TagInput = ({
  tags,
  setTags,
  placeholder,
  note,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder: string;
  note: string;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
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
  const [services, setServices] = useState(["Tooth Cleaning", "Teeth Whitening"]);
  const [specializations, setSpecializations] = useState(["Children Care", "Dental Care"]);
  const [educationFields, setEducationFields] = useState([
    {
      college: "",
      degree: "",
      yearStarted: "",
      yearCompleted: "",
    },
  ]);
  const [workExperience, setWorkExperience] = useState([
    {
      hospital: "",
      designation: "",
      from: "",
      to: "",
    },
  ]);
  const [awards, setAwards] = useState([{ name: "", year: "" }]);
  const [memberships, setMemberships] = useState([{ organization: "" }]);
  const [registrations, setRegistrations] = useState([{ registration: "", year: "" }]);

  const addEducationField = () => {
    setEducationFields([
      ...educationFields,
      { college: "", degree: "", yearStarted: "", yearCompleted: "" },
    ]);
  };

  const addWorkExperienceField = () => {
    setWorkExperience([
      ...workExperience,
      { hospital: "", designation: "", from: "", to: "" },
    ]);
  };

  const addAwardField = () => {
    setAwards([...awards, { name: "", year: "" }]);
  };

  const addMembershipField = () => {
    setMemberships([...memberships, { organization: "" }]);
  };

  const addRegistrationField = () => {
    setRegistrations([...registrations, { registration: "", year: "" }]);
  };


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src="https://placehold.co/128x128.png" alt="Dr. Susan Mandible" data-ai-hint="female doctor" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">Dr. Susan Mandible</h3>
              <p className="text-sm text-muted-foreground">BDS, MDS - Oral & Maxillofacial Surgery</p>
              <div className="flex gap-4 mt-4">
                <Button style={{ backgroundColor: '#46C8F5', color: 'white' }}>Upload Photo</Button>
                <Button variant="outline">Delete</Button>
              </div>
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
                  <Input id="first-name" placeholder="Susan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Mandible" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input id="phone-number" placeholder="+1 234 567 890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="susan.m@novain.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Say something about yourself" rows={5} />
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
                  <Input id="clinic-name" placeholder="NovainHealth Clinic" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinic-address">Clinic Address</Label>
                  <Input id="clinic-address" placeholder="123 Health St, MedCity" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Clinic Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-muted-foreground">Drag files here to upload</p>
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  <div className="relative">
                    <Image src="https://placehold.co/100x100.png" alt="Clinic Image 1" width={100} height={100} className="rounded-md" data-ai-hint="mri machine" />
                    <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full">
                      <Trash2 className="h-4 w-4"/>
                    </Button>
                  </div>
                  <div className="relative">
                    <Image src="https://placehold.co/100x100.png" alt="Clinic Image 2" width={100} height={100} className="rounded-md" data-ai-hint="pharmacy shelves" />
                    <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full">
                      <Trash2 className="h-4 w-4"/>
                    </Button>
                  </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="address1">Address Line 1</Label>
                <Input id="address1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address2">Address Line 2</Label>
                <Input id="address2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal-code">Postal Code</Label>
                <Input id="postal-code" />
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="free" className="flex items-center gap-8">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="free" id="free" />
                  <Label htmlFor="free">Free</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Custom price (per hour)</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services and Specialization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Services</Label>
                <TagInput
                  tags={services}
                  setTags={setServices}
                  placeholder="Add Services"
                  note="NB: Type and Press Enter to add new service"
                />
              </div>
              <div className="space-y-2">
                <Label>Specialization</Label>
                <TagInput
                  tags={specializations}
                  setTags={setSpecializations}
                  placeholder="Add Specialization"
                  note="NB: Type and Press Enter to add new specialization"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {educationFields.map((field, index) => (
                <div key={index} className="space-y-4 border-b pb-4 last:border-b-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>College/Institute</Label>
                      <Input placeholder="e.g. University of Medical Sciences" />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree Obtained</Label>
                      <Input placeholder="e.g. Bachelor of Dental Surgery" />
                    </div>
                    <div className="space-y-2">
                      <Label>Year Started</Label>
                      <Input type="number" placeholder="e.g. 2010" />
                    </div>
                    <div className="space-y-2">
                      <Label>Year of Completion</Label>
                      <Input type="number" placeholder="e.g. 2015" />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" onClick={addEducationField} className="text-cyan-500 hover:text-cyan-600">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add more
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {workExperience.map((field, index) => (
                <div key={index} className="space-y-4 border-b pb-4 last:border-b-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Hospital</Label>
                      <Input />
                    </div>
                    <div className="space-y-2">
                      <Label>Designation</Label>
                      <Input />
                    </div>
                    <div className="space-y-2">
                      <Label>From</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>To</Label>
                      <Input type="date" />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" onClick={addWorkExperienceField} className="text-cyan-500 hover:text-cyan-600">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add more
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Awards</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {awards.map((award, index) => (
                <div key={index} className="space-y-4 border-b pb-4 last:border-b-0">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Name of Award</Label>
                      <Input />
                    </div>
                    <div className="space-y-2">
                      <Label>Year</Label>
                      <Input type="number" />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" onClick={addAwardField} className="text-cyan-500 hover:text-cyan-600">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add more
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Memberships</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {memberships.map((field, index) => (
                <div key={index} className="space-y-4 border-b pb-4 last:border-b-0">
                   <div className="space-y-2">
                    <Label>Name of Organization</Label>
                    <Input />
                  </div>
                </div>
              ))}
              <Button variant="ghost" onClick={addMembershipField} className="text-cyan-500 hover:text-cyan-600">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add more
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registrations and Licenses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {registrations.map((field, index) => (
                <div key={index} className="space-y-4 border-b pb-4 last:border-b-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Registration</Label>
                      <Input />
                    </div>
                    <div className="space-y-2">
                      <Label>Year</Label>
                      <Input type="number" />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <p className="text-sm text-muted-foreground">Drag to upload licensing document</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <Button variant="ghost" onClick={addRegistrationField} className="text-cyan-500 hover:text-cyan-600">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add more
                </Button>
                <Button variant="link" className="text-cyan-500">See all (4)</Button>
              </div>
            </CardContent>
          </Card>


          <div>
             <Button style={{ backgroundColor: '#46C8F5', color: 'white' }}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
