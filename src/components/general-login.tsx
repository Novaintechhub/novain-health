
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";

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
                <Image src="/logo.png" alt="NovainHealth Logo" width={148} height={64} />
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
