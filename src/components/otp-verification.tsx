
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LandingHeader from "@/components/shared/landing-header";
import LandingFooter from "@/components/shared/landing-footer";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import type React from 'react';

export default function OtpVerification() {
  const router = useRouter();
  const { toast } = useToast();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would add logic here to verify the OTP with your backend.
    
    toast({
      title: "Success!",
      description: "Your email has been verified successfully.",
    });

    // Redirect to the general login page after verification
    router.push('/general-login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <LandingHeader />
      <main className="flex-grow">
        <div className="flex h-full">
          <div className="hidden lg:block lg:w-1/2 relative">
            <Image
              src="https://placehold.co/800x1200.png"
              alt="Doctor with patient"
              layout="fill"
              objectFit="cover"
              data-ai-hint="doctor patient"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 overflow-y-auto bg-white">
            <div className="w-full max-w-sm text-center">
              <div className="flex justify-center mb-8">
                <Image src="/logo.png" alt="NovainHealth Logo" width={124} height={34} />
              </div>
              <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
              <p className="text-muted-foreground mb-6">
                We've sent a 6-digit code to your email address. Please enter it below to verify your account.
              </p>

              <form className="space-y-6" onSubmit={handleVerify}>
                <div className="flex justify-center gap-2">
                  <Input maxLength={1} className="w-12 h-12 text-center text-2xl" />
                  <Input maxLength={1} className="w-12 h-12 text-center text-2xl" />
                  <Input maxLength={1} className="w-12 h-12 text-center text-2xl" />
                  <Input maxLength={1} className="w-12 h-12 text-center text-2xl" />
                  <Input maxLength={1} className="w-12 h-12 text-center text-2xl" />
                  <Input maxLength={1} className="w-12 h-12 text-center text-2xl" />
                </div>
                
                <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white" type="submit">
                  Verify Account
                </Button>
              </form>

              <p className="text-sm text-muted-foreground mt-6">
                Didn't receive a code?{" "}
                <Button variant="link" className="p-0 h-auto text-cyan-500">
                  Resend Code
                </Button>
              </p>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
