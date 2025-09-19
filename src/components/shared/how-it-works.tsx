
"use client";

import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import { Search, Calendar, Video, FileText } from "lucide-react";

const steps = [
    {
        icon: Search,
        title: "Find a Doctor",
        description: "Browse our extensive network of certified doctors. You can filter by specialty, location, and availability to find the perfect match for your needs."
    },
    {
        icon: Calendar,
        title: "Book an Appointment",
        description: "Select a convenient time slot from the doctor's schedule. Provide some basic information about your condition to help the doctor prepare."
    },
    {
        icon: Video,
        title: "Start Your Consultation",
        description: "Join a secure video call, voice call, or chat with your doctor at the scheduled time. Discuss your symptoms and get professional medical advice."
    },
    {
        icon: FileText,
        title: "Get Your Prescription",
        description: "If necessary, the doctor will issue a digital prescription which you can access directly from your patient dashboard and use at any pharmacy."
    }
]

export default function HowItWorks() {
  return (
    <div className="bg-white">
      <LandingHeader />
      <main>
        <section className="py-20 px-4 text-center bg-cyan-500 text-white">
          <h1 className="text-5xl font-bold font-serif">How NovainHealth Works</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Accessing quality healthcare is as simple as these four steps.
          </p>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-6">
                            <div className="flex-shrink-0 bg-cyan-100 text-cyan-600 p-4 rounded-full">
                                <step.icon className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{step.title}</h3>
                                <p className="mt-2 text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
