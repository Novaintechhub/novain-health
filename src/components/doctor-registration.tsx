
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


const NovainHealthLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="148" height="64" viewBox="0 0 148 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M30.4105 17.584V1.36963H44.0155V39.4628H30.4105V22.2541C30.4105 19.8932 30.4105 17.5324 30.4105 15.0883C30.322 13.1259 29.9329 11.8311 28.532 10.9634C27.0425 10.0957 24.9922 10.0957 23.0827 10.8801L12.553 15.0094V4.07227L30.4105 17.584Z" fill="#002244"/>
        <path d="M0.999878 1.36963H16.8924V39.4628H0.999878V1.36963Z" fill="#002244"/>
        <path d="M22.083 39.4628V24.0858L11.6669 30.4326V39.4628H22.083Z" fill="#002244"/>
        <path d="M22.083 1.36963H11.6669V20.913L22.083 16.0826V1.36963Z" fill="#002244"/>
        <path d="M69.1213 17.3164C69.1213 19.6773 67.6974 21.178 65.5971 21.178C63.4969 21.178 62.073 19.6773 62.073 17.3164C62.073 14.9556 63.4969 13.4548 65.5971 13.4548C67.6974 13.4548 69.1213 14.9556 69.1213 17.3164ZM65.5971 39.9237C56.6896 39.9237 49.0908 30.5694 49.0908 17.3164C49.0908 3.98016 56.6896 1.36963 65.5971 1.36963C74.4754 1.36963 82.0349 3.98016 82.0349 17.3164C82.0349 30.5694 74.4754 39.9237 65.5971 39.9237Z" fill="#002244"/>
        <path d="M104.926 17.584V1.36963H118.531V39.4628H104.926V22.2541C104.926 19.8932 104.926 17.5324 104.926 15.0883C104.837 13.1259 104.448 11.8311 103.047 10.9634C101.558 10.0957 99.5076 10.0957 97.5981 10.8801L87.0684 15.0094V4.07227L104.926 17.584Z" fill="#002244"/>
        <path d="M84.9843 1.36963H100.877V39.4628H84.9843V1.36963Z" fill="#002244"/>
        <path d="M124.405 1.36963H140.298V39.4628H124.405V1.36963Z" fill="#002244"/>
        <path d="M141.492 1.36963H157.942L149.336 17.3164L157.73 39.4628H141.636L136.96 27.5372H131.544V39.4628H118.531V1.36963H136.721C138.63 1.36963 140.384 2.58105 141.002 4.41907C141.62 6.25708 141.62 8.24158 141.002 10.0796C140.384 11.9176 138.63 13.0132 136.721 13.0132H131.544V18.6675H135.702L141.492 1.36963Z" fill="#46C8F5"/>
        <path d="M78.3278 44.1543L157.11 44.1543" stroke="#46C8F5" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M99.3093 44.1548L78.3279 63.9375" stroke="#46C8F5" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M116.818 44.1548L137.799 63.9375" stroke="#46C8F5" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M121.155 57.391C121.155 51.528 125.751 46.9316 131.614 46.9316H133.626C139.489 46.9316 144.084 51.528 144.084 57.391V63.9375H121.155V57.391Z" stroke="#46C8F5" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M151.722 46.9316H148.117V63.9375H151.722V46.9316Z" stroke="#46C8F5" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M162.067 63.9375L152.88 46.9316" stroke="#46C8F5" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M153.541 63.3853L164.71 46.9316" stroke="#46C8F5" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
)


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
                <NovainHealthLogo />
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
