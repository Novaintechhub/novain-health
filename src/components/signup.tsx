
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail } from "lucide-react";

const NovainLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="124" height="34" viewBox="0 0 124 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.8079 9.30872V1.02734H33.0116V22.613H25.8079V14.1201C25.8079 13.091 25.8079 12.062 25.8079 10.9907C25.7656 10.1508 25.5562 9.56208 24.8827 9.17721C24.2092 8.79234 23.3241 8.79234 22.4812 9.135L17.6713 10.8142V2.8858L25.8079 9.30872Z" fill="#002244"/>
        <path d="M0.852051 1.02734H8.05574V22.613H0.852051V1.02734Z" fill="#002244"/>
        <path d="M17.0689 22.613V14.9961L9.65361 17.792V22.613H17.0689Z" fill="#002244"/>
        <path d="M17.0689 1.02734H9.65361V13.6264L17.0689 11.2371V1.02734Z" fill="#002244"/>
        <path d="M51.841 11.8949C51.841 12.9239 51.1528 13.5915 50.1534 13.5915C49.154 13.5915 48.4658 12.9239 48.4658 11.8949C48.4658 10.8658 49.154 10.1982 50.1534 10.1982C51.1528 10.1982 51.841 10.8658 51.841 11.8949ZM50.1534 22.8245C45.3435 22.8245 41.5173 18.7844 41.5173 11.8949C41.5173 4.96299 45.3435 1.02734 50.1534 1.02734C54.9633 1.02734 58.7472 4.96299 58.7472 11.8949C58.7472 18.7844 54.9633 22.8245 50.1534 22.8245Z" fill="#002244"/>
        <path d="M78.6942 9.30872V1.02734H85.8979V22.613H78.6942V14.1201C78.6942 13.091 78.6942 12.062 78.6942 10.9907C78.6519 10.1508 78.4425 9.56208 77.769 9.17721C77.0955 8.79234 76.2104 8.79234 75.3675 9.135L70.5576 10.8142V2.8858L78.6942 9.30872Z" fill="#002244"/>
        <path d="M63.7383 1.02734H70.942V22.613H63.7383V1.02734Z" fill="#002244"/>
        <path d="M93.3039 1.02734H100.508V22.613H93.3039V1.02734Z" fill="#002244"/>
        <path d="M101.455 1.02734H110.384L105.107 11.8949L110.173 22.613H101.58L98.636 16.3421H93.1345V22.613H85.9308V1.02734H98.4665C99.4659 1.02734 100.351 1.54188 100.815 2.43962C101.279 3.33736 101.279 4.40871 100.815 5.30645C100.351 6.20419 99.4659 6.71873 98.4665 6.71873H93.1345V10.1135H97.7497L101.455 1.02734Z" fill="#46C8F5"/>
        <path d="M40.2458 31.5208L34.1171 25.8624L40.2458 31.5208Z" fill="#46C8F5"/>
        <path d="M40.542 31.2417L34.1171 25.2842L40.542 31.2417Z" fill="#46C8F5"/>
        <path d="M34.1171 25.2842L40.5843 31.2839L34.1171 25.2842Z" fill="#46C8F5"/>
        <path d="M40.5843 31.2839L34.1171 25.2842L40.5843 31.2839Z" fill="#46C8F5"/>
        <path d="M34.1171 25.2842L40.542 31.2417L34.1171 25.2842Z" fill="#46C8F5"/>
        <path d="M40.542 31.2417L34.1171 25.2842L40.542 31.2417Z" fill="#46C8F5"/>
        <path d="M34.1171 25.2842L40.2458 31.5208L34.1171 25.2842Z" fill="#46C8F5"/>
        <path d="M40.2458 31.5208L34.1171 25.2842L40.2458 31.5208Z" fill="#46C8F5"/>
        <path d="M40.2035 25.0938H33.8208L40.2035 25.0938Z" fill="#46C8F5"/>
        <path d="M40.2035 25.0938H33.8208" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M45.5426 25.0938H41.6885" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M45.416 31.5208L40.2458 25.2842" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M40.542 31.2417L34.1171 25.2842" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M49.4912 31.5208H55.8739" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M52.6826 31.5208V25.2419" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M59.3204 31.5208H65.7031" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M62.5118 31.5208V25.2419" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M69.0494 28.3813C69.0494 26.5925 70.472 25.2419 72.1866 25.2419H73.0336C74.7482 25.2419 76.1708 26.5925 76.1708 28.3813V31.5208H69.0494V28.3813Z" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M80.0197 25.2419H78.291V31.5208H80.0197V25.2419Z" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M86.317 31.5208L81.1467 25.2842" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M81.4258 31.2417L87.8507 25.2842" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M90.3113 25.2419V31.5208" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M90.3113 27.5029H93.3039" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M95.6698 25.2419L99.6384 31.5208L103.607 25.2419" stroke="#46C8F5" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M123.148 11.8949C123.148 12.9239 122.46 13.5915 121.461 13.5915C120.461 13.5915 119.773 12.9239 119.773 11.8949C119.773 10.8658 120.461 10.1982 121.461 10.1982C122.46 10.1982 123.148 10.8658 123.148 11.8949ZM121.461 22.8245C116.651 22.8245 112.825 18.7844 112.825 11.8949C112.825 4.96299 116.651 1.02734 121.461 1.02734C126.271 1.02734 130.055 4.96299 130.055 11.8949C130.055 18.7844 126.271 22.8245 121.461 22.8245Z" fill="#002244"/>
    </svg>
);

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


export default function Signup() {
  return (
    <div className="flex h-screen">
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute top-4 left-4 text-white font-bold text-lg z-10">DOCTORS Sign up</div>
        <Image
          src="https://placehold.co/800x1200.png"
          alt="Smiling doctor"
          layout="fill"
          objectFit="cover"
          data-ai-hint="male doctor smiling"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 overflow-y-auto bg-white">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-8">
            <NovainLogo />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Create an account</h1>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-center">
              <GoogleIcon className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full justify-center">
              <AppleIcon className="mr-2 h-5 w-5" />
              Continue with Apple
            </Button>
            <Link href="/doctor-registration" passHref>
              <Button variant="outline" className="w-full justify-center">
                <Mail className="mr-2 h-5 w-5" />
                Continue with Email
              </Button>
            </Link>
          </div>

          <div className="flex items-start mt-6 space-x-2">
            <Checkbox id="promotions" className="mt-1" />
            <label htmlFor="promotions" className="text-sm text-muted-foreground">
              I do not wish to receive news and promotions from Novain Health by email.
            </label>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing, you agree to Novain Health's{" "}
            <Link href="#" className="text-cyan-500 hover:underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-cyan-500 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-500 font-semibold hover:underline">
              Log in
            </Link>
          </p>

           <div className="flex justify-between text-xs text-muted-foreground mt-12">
            <Link href="#" className="hover:underline">Terms & Conditions</Link>
            <Link href="#" className="hover:underline">Privacy policy</Link>
            <Link href="#" className="hover:underline">Cookies settings</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
