
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LandingHeader from "@/components/shared/landing-header";
import LandingFooter from "@/components/shared/landing-footer";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft } from "lucide-react";

const RESEND_INTERVAL = 60; // 60 seconds

export default function OtpVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const role = searchParams.get("role") || "patient";

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_INTERVAL);
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No email address provided. Please start the registration process again.",
      });
      const registrationPath = role === "doctor" ? "/doctor-registration" : "/patient-registration";
      router.push(registrationPath);
    }
  }, [email, router, toast, role]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  
  const startCountdown = () => {
    setCountdown(RESEND_INTERVAL);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Verification failed');
      }

      toast({
        title: "Success!",
        description: "Your email has been verified successfully.",
      });

      const loginPath = role === "doctor" ? "/doctor-login" : "/patient-login";
      router.push(loginPath);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setIsResending(true);
    try {
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

       const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to resend OTP');
      }
      
      startCountdown();
      toast({
        title: "OTP Resent",
        description: "A new OTP has been sent to your email address.",
      });

    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Failed to Resend",
        description: error.message,
      });
    } finally {
        setIsResending(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <LandingHeader />
      <main className="flex-grow">
        <div className="flex min-h-full">
           <div className="hidden lg:block lg:w-1/2 relative">
            <Image
              src="/patient-signup.png"
              alt="Smiling person"
              layout="fill"
              objectFit="cover"
              data-ai-hint="woman smiling"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-8 overflow-y-auto bg-white">
            <div className="w-full max-w-md">
                <div className="mb-6">
                    <button onClick={() => router.back()} className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back
                    </button>
                </div>
              <div className="flex justify-center mb-6">
                <Image src="/logo.png" alt="NovainHealth Logo" width={148} height={64} />
              </div>

              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold">Email Verification</h1>
                <p className="text-muted-foreground mt-2">
                  Please enter the 6-digit code sent to <span className="font-semibold text-primary">{email}</span>.
                </p>
              </div>

              <form onSubmit={handleVerification} className="space-y-6">
                 <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.trim())}
                    maxLength={6}
                    className="h-12 text-center text-lg tracking-[8px]"
                    required
                />
                <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white h-12" type="submit" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify Account"}
                </Button>
              </form>
              
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                    Didn't receive the code?{' '}
                    <Button 
                      variant="link" 
                      onClick={handleResendOtp} 
                      disabled={isResending || countdown > 0} 
                      className="p-0 h-auto text-cyan-500"
                    >
                        {isResending 
                            ? "Resending..." 
                            : countdown > 0 
                                ? `Resend in ${countdown}s` 
                                : "Resend Code"}
                    </Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
