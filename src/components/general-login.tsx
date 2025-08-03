
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";

const NovainHealthLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="258" height="113" viewBox="0 0 258 113" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M53.518 31.0664V1.85547H70.3895V55.0311H53.518V36.2155C53.518 33.722 53.518 31.2285 53.518 28.652C53.4284 26.6026 53.0113 25.2413 51.5273 24.322C49.9537 23.4027 47.7818 23.4027 45.8239 24.225L34.6293 28.1691V4.5498L53.518 31.0664Z" fill="#002244"/>
        <path d="M1.54541 1.85547H18.4169V55.0311H1.54541V1.85547Z" fill="#002244"/>
        <path d="M33.2045 55.0311V38.2519L22.0994 45.029V55.0311H33.2045Z" fill="#002244"/>
        <path d="M33.2045 1.85547H22.0994V35.0349L33.2045 29.6206V1.85547Z" fill="#002244"/>
        <path d="M110.16 30.8262C110.16 33.3197 108.657 34.9082 106.417 34.9082C104.177 34.9082 102.674 33.3197 102.674 30.8262C102.674 28.3327 104.177 26.7441 106.417 26.7441C108.657 26.7441 110.16 28.3327 110.16 30.8262ZM106.417 55.5199C95.2229 55.5199 87.2727 45.7197 87.2727 30.8262C87.2727 15.8555 95.2229 1.85547 106.417 1.85547C117.572 1.85547 125.485 15.8555 125.485 30.8262C125.485 45.7197 117.572 55.5199 106.417 55.5199Z" fill="#002244"/>
        <path d="M165.748 31.0664V1.85547H182.62V55.0311H165.748V36.2155C165.748 33.722 165.748 31.2285 165.748 28.652C165.658 26.6026 165.241 25.2413 163.757 24.322C162.184 23.4027 160.012 23.4027 158.054 24.225L146.859 28.1691V4.5498L165.748 31.0664Z" fill="#002244"/>
        <path d="M132.882 1.85547H149.753V55.0311H132.882V1.85547Z" fill="#002244"/>
        <path d="M192.482 1.85547H209.353V55.0311H192.482V1.85547Z" fill="#002244"/>
        <path d="M211.393 1.85547H228.871L219.866 30.8262L228.563 55.0311H211.536L206.561 41.7335H200.73V55.0311H184.858V1.85547H206.309C208.358 1.85547 210.222 3.11964 210.88 4.8872C211.539 6.65476 211.539 8.58302 210.88 10.3506C210.222 12.1181 208.358 13.2523 206.309 13.2523H200.73V19.2618H205.158L211.393 1.85547Z" fill="#46C8F5"/>
        <path d="M256.744 30.8262C256.744 33.3197 255.241 34.9082 252.999 34.9082C250.759 34.9082 249.256 33.3197 249.256 30.8262C249.256 28.3327 250.759 26.7441 252.999 26.7441C255.241 26.7441 256.744 28.3327 256.744 30.8262ZM252.999 55.5199C241.805 55.5199 233.855 45.7197 233.855 30.8262C233.855 15.8555 241.805 1.85547 252.999 1.85547C264.154 1.85547 272.067 15.8555 272.067 30.8262C272.067 45.7197 264.154 55.5199 252.999 55.5199Z" fill="#002244"/>
        <path d="M129.571 58.7495L213.629 58.7495" stroke="#46C8F5" strokeWidth="2" strokeLinecap="round"/>
        <path d="M152.613 58.75L132.882 112.5" stroke="#46C8F5" strokeWidth="2" strokeLinecap="round"/>
        <path d="M171.18 58.75L190.91 112.5" stroke="#46C8F5" strokeWidth="2" strokeLinecap="round"/>
        <path d="M175.768 83.125C175.768 76.9531 180.634 72.0833 186.806 72.0833H188.94C195.112 72.0833 199.979 76.9531 199.979 83.125V112.5H175.768V83.125Z" stroke="#46C8F5" strokeWidth="2" strokeLinecap="round"/>
        <path d="M211.085 72.0833H207.288V112.5H211.085V72.0833Z" stroke="#46C8F5" strokeWidth="2" strokeLinecap="round"/>
        <path d="M222.061 112.5L212.43 72.0833" stroke="#46C8F5" strokeWidth="2" strokeLinecap="round"/>
        <path d="M213.127 111.667L224.897 72.0833" stroke="#46C8F5" strokeWidth="2" strokeLinecap="round"/>
    </svg>
)

export default function GeneralLogin() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <LandingHeader />
      <main className="flex-1 flex flex-col justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-4xl mx-auto">
          <Image
            src="https://placehold.co/1000x400.png"
            alt="Doctor with a patient"
            width={1000}
            height={400}
            className="w-full h-auto object-cover rounded-lg"
            data-ai-hint="doctor patient"
          />
          <div className="bg-white p-8 md:p-12 text-center -mt-16 relative z-10 mx-4 md:mx-16 rounded-lg shadow-lg">
            <div className="flex justify-center mb-6">
                <NovainHealthLogo className="w-48" />
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-6">Create an account</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/doctor-registration" passHref>
                <Button variant="outline" className="w-full h-12 border-cyan-400 text-cyan-400 hover:bg-cyan-50 hover:text-cyan-500">
                  I am a Medical Professional
                </Button>
              </Link>
              <Link href="/signup" passHref>
                <Button className="w-full h-12 bg-cyan-400 hover:bg-cyan-500 text-white">
                    I am seeking a Medical Professional
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
