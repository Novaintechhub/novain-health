

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";


const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.94 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
);

export default function Login() {
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

              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-20 w-20 mb-3">
                  <AvatarImage src="https://placehold.co/80x80.png" alt="Dr. Susan" data-ai-hint="woman doctor"/>
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
                <p className="font-medium">susanmandible@gmail.com</p>
              </div>

              <Button type="button" variant="outline" className="w-full mb-4">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src="https://placehold.co/24x24.png" alt="Dr. Susan" data-ai-hint="woman doctor"/>
                            <AvatarFallback>DS</AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                            <p className="text-sm font-semibold">Continue as Dr. Susan</p>
                            <p className="text-xs text-muted-foreground">susanmandible@gmail.com</p>
                        </div>
                    </div>
                    <GoogleIcon className="h-6 w-6" />
                </div>
              </Button>

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

              <p className="text-center text-sm mt-4">
                Not you? <Link href="#" className="text-cyan-500 hover:underline">Use another account</Link>
              </p>

              <div className="border-t border-gray-300 my-8"></div>

              <p className="text-center text-sm">
                Don't have an account? <Link href="/signup" className="text-cyan-500 font-semibold hover:underline">Sign up</Link>
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
