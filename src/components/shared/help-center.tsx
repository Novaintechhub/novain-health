
"use client";

import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import { Input } from "../ui/input";
import { Search, LifeBuoy, BookOpen, Shield } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const helpTopics = [
  {
    icon: LifeBuoy,
    title: "Getting Started",
    description: "Learn how to create an account, complete your profile, and book your first appointment.",
    link: "#"
  },
  {
    icon: BookOpen,
    title: "Billing & Payments",
    description: "Find information about payment methods, insurance, and understanding your bills.",
    link: "#"
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Read about how we protect your data and ensure your consultations are confidential.",
    link: "#"
  }
]

export default function HelpCenter() {
  return (
    <div className="bg-gray-50/50">
      <LandingHeader />
      <main>
        <section className="relative py-20 sm:py-28 lg:py-32 text-center bg-cyan-500">
            <div className="relative z-10 px-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif">How can we help?</h1>
                <div className="mt-8 max-w-2xl mx-auto">
                    <div className="relative">
                        <Input placeholder="Search for answers..." className="pl-12 h-14 text-lg" />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
                    </div>
                </div>
            </div>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800">Browse Help Topics</h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {helpTopics.map((topic, index) => (
                       <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                           <CardHeader>
                               <div className="mx-auto bg-cyan-100 text-cyan-600 p-4 rounded-full w-fit">
                                   <topic.icon className="w-8 h-8" />
                               </div>
                               <CardTitle className="mt-4">{topic.title}</CardTitle>
                           </CardHeader>
                           <CardContent>
                               <p className="text-muted-foreground">{topic.description}</p>
                               <Link href={topic.link} className="text-cyan-500 hover:underline mt-4 inline-block">
                                   Learn More &rarr;
                               </Link>
                           </CardContent>
                       </Card>
                    ))}
                </div>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
