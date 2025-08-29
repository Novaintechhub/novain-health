
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LandingHeader from "@/components/shared/landing-header";
import LandingFooter from "@/components/shared/landing-footer";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import type React from 'react';

export default function OtpVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setIsResendDisabled(true);
    setCountdown(60);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleResend = async () => {
    setIsResending(true);
    try {
        const email = searchParams.get('email');
        if (!email) {
            toast({ variant: "destructive", title: "Error", description: "Email not found in URL." });
            return;
        }

        const response = await fetch('/api/auth/resend-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Failed to resend OTP.");

        toast({
            title: "Success!",
            description: "A new OTP has been sent to your email.",
        });
        startTimer();
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Failed to Resend OTP",
            description: error.message,
        });
    } finally {
        setIsResending(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
      
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error?.otp?._errors[0] || result.error || "Failed to verify OTP.");
      }
      
      toast({
        title: "Success!",
        description: "Your email has been verified successfully.",
      });

      const role = searchParams.get('role');

      if (role === 'doctor') {
        router.push('/doctor-login');
      } else if (role === 'patient') {
        router.push('/patient-login');
      } else {
        router.push('/general-login');
      }
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error.message,
      });
    } finally {
      setIsVerifying(false);
    }
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
                We've sent a 6-character code to your email address. Please enter it below to verify your account.
              </p>

              <form className="space-y-6" onSubmit={handleVerify}>
                <div>
                  <Input 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.toUpperCase())}
                    maxLength={6} 
                    className="w-full h-14 text-center text-2xl tracking-[8px]" 
                    placeholder="______"
                  />
                </div>
                
                <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white" type="submit" disabled={otp.length < 6 || isVerifying}>
                  {isVerifying ? 'Verifying...' : 'Verify Account'}
                </Button>
              </form>

              <p className="text-sm text-muted-foreground mt-6">
                Didn't receive a code?{" "}
                <Button variant="link" className="p-0 h-auto text-cyan-500" onClick={handleResend} disabled={isResendDisabled || isResending}>
                  {isResending ? 'Sending...' : `Resend Code ${isResendDisabled ? `(${countdown}s)` : ''}`}
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
