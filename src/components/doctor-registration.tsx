
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";
import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";

export default function DoctorRegistration() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <LandingHeader />
      <main className="flex-grow">
        <div className="flex min-h-full">
          <div className="hidden lg:block lg:w-1/2 relative">
            <Image
              src="https://placehold.co/800x1200.png"
              alt="Smiling doctor"
              layout="fill"
              objectFit="cover"
              data-ai-hint="male doctor smiling"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto bg-white">
            <div className="w-full max-w-lg">
                <div className="mb-6">
                    <Link href="#" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back
                    </Link>
                </div>
              <div className="flex justify-center mb-6">
                <Image src="/logo.png" alt="NovainHealth Logo" width={148} height={64} />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                <h1 className="text-xl font-bold">Doctor Registration</h1>
                <Link href="#" className="text-sm text-cyan-500 hover:underline">Not a Doctor?</Link>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input placeholder="Mobile Number" />
                <Input type="email" placeholder="Email Address" />
                <Input type="password" placeholder="Input password" />
                <Input type="password" placeholder="Confirm password" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Country of residence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="ng">Nigeria</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="State" />
                <Input placeholder="Local Government of residence" />
                 <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-start text-xs text-gray-500">
                    <span className="mr-2 mt-1">&#9432;</span>
                    <p>When you select languages, Patients that understand same language can be paired with you.</p>
                </div>

                <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white h-12" type="submit">Sign Up</Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By signing up, you agree to our{" "}
                <Link href="#" className="text-cyan-500 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-cyan-500 hover:underline">
                  Privacy Policy
                </Link>
                , including consent to securely share your information with medical professionals for consultation purposes.
              </p>
              
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/doctor/login" className="text-cyan-500 font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
