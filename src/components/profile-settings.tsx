"use client";

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
import { UploadCloud, Trash2 } from "lucide-react";
import Image from "next/image";


export default function ProfileSettings() {
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

          <div>
             <Button style={{ backgroundColor: '#46C8F5', color: 'white' }}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
