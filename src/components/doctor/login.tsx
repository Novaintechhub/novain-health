
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LandingHeader from "@/components/shared/landing-header";
import LandingFooter from "@/components/shared/landing-footer";
import { signInWithGoogle, signInWithApple } from "@/lib/auth";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.94 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M15.29,3.68A6.4,6.4,0,0,0,12,2a6.4,6.4,0,0,0-3.29,1.68,6.86,6.86,0,0,0-2,5.22,7.21,7.21,0,0,0,3.33,6.23,6.75,6.75,0,0,0,7.34-.1,1.52,1.52,0,0,0,.61-1.16,1.43,1.43,0,0,0-1.5-1.42,1.38,1.38,0,0,0-1.15.56,3.64,3.64,0,0,1-2.63,1.36,3.48,3.48,0,0,1-3.62-3.65,4.6,4.6,0,0,1,1.2-3.17,4.3,4.3,0,0,1,3.12-1.3,3.7,3.7,0,0,1,2.83,1.21,1.4,1.4,0,0,0,1,.45,1.46,1.46,0,0,0,1.42-1.45A6.93,6.93,0,0,0,15.29,3.68Z" fill="currentColor"/>
        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" fill="currentColor"/>
    </svg>
);

export default function Login() {
  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      window.location.href = "/doctor";
    }
  };

  const handleAppleSignIn = async () => {
    const user = await signInWithApple();
    if (user) {
      window.location.href = "/doctor";
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
              alt="Doctor smiling"
              layout="fill"
              objectFit="cover"
              data-ai-hint="female doctor"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 overflow-y-auto bg-white">
            <div className="w-full max-w-md">
              <div className="flex justify-center mb-8">
                <Image src="/logo.png" alt="NovainHealth Logo" width={124} height={34} />
              </div>
              <h1 className="text-3xl font-bold text-center mb-2">Login</h1>
              <p className="text-center text-muted-foreground mb-6">Hello Doc, welcome back!</p>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-center" onClick={handleGoogleSignIn}>
                  <GoogleIcon className="mr-2 h-5 w-5" />
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full justify-center" onClick={handleAppleSignIn}>
                  <AppleIcon className="mr-2 h-5 w-5" />
                  Continue with Apple
                </Button>
              </div>

              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-muted-foreground text-sm">Or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              
              <form className="space-y-4">
                <Input type="email" placeholder="Email Address" />
                <Input type="password" placeholder="Input password" />
                <Link href="/doctor" className="w-full block">
                  <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white" type="button">Sign In</Button>
                </Link>
              </form>

              <div className="border-t border-gray-300 my-8"></div>

              <p className="text-center text-sm">
                Don't have an account? <Link href="/doctor/register" className="text-cyan-500 font-semibold hover:underline">Sign up</Link>
              </p>

               <div className="flex justify-between text-xs text-muted-foreground mt-12">
                <Link href="/terms-of-service" className="hover:underline">Terms & Conditions</Link>
                <Link href="/privacy-policy" className="hover:underline">Privacy policy</Link>
                <Link href="/privacy-policy" className="hover:underline">Cookies settings</Link>
              </div>

            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
