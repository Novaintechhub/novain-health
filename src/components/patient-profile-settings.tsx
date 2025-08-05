
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TagInput = ({
  tags,
  setTags,
  placeholder,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder: string;
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
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-input p-2 bg-white">
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
  );
};


export default function PatientProfileSettings() {
    const [allergies, setAllergies] = useState(["Dust", "Lactose"]);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://placehold.co/96x96.png" alt="Tosin Chukwuka" data-ai-hint="woman portrait" />
                            <AvatarFallback>TC</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Upload New Photo</Button>
                            <Button variant="destructive">Remove Photo</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Input id="gender" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zipcode">Zipcode</Label>
                            <Input id="zipcode" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input id="country" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="genotype">Genotype</Label>
                            <Input id="genotype" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weight">Weight</Label>
                            <Input id="weight" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="height">Height</Label>
                            <Input id="height" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="blood-group">Blood Group</Label>
                            <Input id="blood-group" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="medical-conditions">Medical Conditions (Diseases)</Label>
                        <Input id="medical-conditions" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="allergies">Allergies</Label>
                        <TagInput tags={allergies} setTags={setAllergies} placeholder="Add Allergies" />
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-start">
                <Button style={{ backgroundColor: '#46C8F5', color: 'white' }}>Save Changes</Button>
            </div>
        </div>
    );
}
