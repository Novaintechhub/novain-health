
"use client";

import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import Image from "next/image";
import { Button } from "./ui/button";
import { Search, UserPlus, Calendar, Video } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "1. Find a Doctor",
        description: "Use our search and filtering tools to find the right doctor for your needs. You can search by specialty, location, and more."
    },
    {
        icon: UserPlus,
        title: "2. Create Your Account",
        description: "Sign up for a free account to manage your appointments, view medical records, and communicate securely with your doctor."
    },
    {
        icon: Calendar,
        title: "3. Book an Appointment",
        description: "Select an available time slot from the doctor's calendar and book your consultation with just a few clicks."
    },
    {
        icon: Video,
        title: "4. Start Your Consultation",
        description: "Connect with your doctor via secure video call, voice call, or chat at the scheduled time. Get prescriptions and medical advice."
    }
]

export default function HowItWorks() {
  return (
    <div className="bg-gray-50/50">
      <LandingHeader />
      <main>
        <section className="relative py-20 sm:py-28 lg:py-32 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1600x600.png')" }} data-ai-hint="person on laptop">
            <div className="absolute inset-0 bg-indigo-900/70" />
            <div className="relative z-10 px-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif">How It Works</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-100">
                    Accessing quality healthcare has never been easier. Follow these simple steps to get started.
                </p>
            </div>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="bg-cyan-100 text-cyan-600 p-6 rounded-full">
                                <step.icon className="w-12 h-12" />
                            </div>
                            <h3 className="text-2xl font-bold mt-6 text-gray-800">{step.title}</h3>
                            <p className="mt-2 text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">For Patients</h2>
                    <p className="mt-4 text-muted-foreground">
                        Take control of your health journey with our intuitive platform. Easily find doctors, book appointments, and access your medical history all in one place. Your health, your way.
                    </p>
                    <ul className="mt-6 space-y-4">
                        <li className="flex items-start gap-3">
                            <div className="bg-green-100 text-green-600 p-1 rounded-full mt-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg></div>
                            <span>Instant access to a wide network of verified specialists.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="bg-green-100 text-green-600 p-1 rounded-full mt-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg></div>
                            <span>Secure and confidential video consultations from home.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <div className="bg-green-100 text-green-600 p-1 rounded-full mt-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg></div>
                            <span>Manage prescriptions and medical records with ease.</span>
                        </li>
                    </ul>
                     <Button className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white">Register as Patient</Button>
                </div>
                <div>
                     <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="Patient using app" className="rounded-lg shadow-lg" data-ai-hint="patient phone" />
                </div>
            </div>
             <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
                 <div className="order-2 md:order-1">
                     <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="Doctor using laptop" className="rounded-lg shadow-lg" data-ai-hint="doctor laptop" />
                </div>
                <div className="order-1 md:order-2">
                    <h2 className="text-3xl font-bold text-gray-800">For Doctors</h2>
                    <p className="mt-4 text-muted-foreground">
                        Expand your practice and connect with patients who need your expertise. Our platform provides the tools you need to offer seamless virtual care, manage your schedule, and grow your patient base.
                    </p>
                    <ul className="mt-6 space-y-4">
                        <li className="flex items-start gap-3">
                            <div className="bg-green-100 text-green-600 p-1 rounded-full mt-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg></div>
                            <span>Flexible scheduling to fit your professional life.</span>
                        </li>
                        <li className="flex items-start gap-3">
                             <div className="bg-green-100 text-green-600 p-1 rounded-full mt-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg></div>
                            <span>Easy-to-use tools for patient management and communication.</span>
                        </li>
                        <li className="flex items-start gap-3">
                             <div className="bg-green-100 text-green-600 p-1 rounded-full mt-1"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg></div>
                            <span>Join a growing community of healthcare professionals.</span>
                        </li>
                    </ul>
                    <Button className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white">Register as Doctor</Button>
                </div>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
