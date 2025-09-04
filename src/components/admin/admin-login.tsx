
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LandingHeader from "@/components/shared/landing-header";
import LandingFooter from "@/components/shared/landing-footer";
import { signInWithCustomToken } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrId: email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.role !== 'admin') {
        throw new Error('Access denied. Only administrators can log in here.');
      }
      
      const user = await signInWithCustomToken(data.token);

      if (user) {
        toast({
            title: "Login Successful",
            description: `Welcome back, Admin!`,
        });
        router.push("/admin");
      } else {
        throw new Error('Failed to sign in with custom token.');
      }

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
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
              alt="Admin Dashboard"
              layout="fill"
              objectFit="cover"
              data-ai-hint="office building"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 overflow-y-auto bg-white">
            <div className="w-full max-w-md">
              <div className="flex justify-center mb-8">
                <Image src="/logo.png" alt="NovainHealth Logo" width={124} height={34} />
              </div>
              <h1 className="text-3xl font-bold text-center mb-2">Admin Login</h1>
              <p className="text-center text-muted-foreground mb-6">Welcome back, please enter your details.</p>
              
              <form className="space-y-4" onSubmit={handleSignIn}>
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Input password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                   <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white" type="submit" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="border-t border-gray-300 my-8"></div>

              <p className="text-center text-sm">
                Not an admin? Go to the <Link href="/general-login" className="text-cyan-500 font-semibold hover:underline">main login page</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
