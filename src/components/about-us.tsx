
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import Image from "next/image";

const teamMembers = [
  {
    name: "Dr. John Doe",
    role: "Chief Medical Officer",
    avatarUrl: "https://placehold.co/128x128.png",
    avatarHint: "male doctor portrait",
    bio: "Dr. Doe has over 20 years of experience in internal medicine and is passionate about leveraging technology to improve patient outcomes."
  },
  {
    name: "Jane Smith, RN",
    role: "Head of Nursing",
    avatarUrl: "https://placehold.co/128x128.png",
    avatarHint: "female nurse",
    bio: "Jane leads our team of dedicated nurses, ensuring the highest standards of care and patient support are maintained."
  },
  {
    name: "Peter Jones",
    role: "CEO & Founder",
    avatarUrl: "https://placehold.co/128x128.png",
    avatarHint: "man professional",
    bio: "Peter founded NovainHealth with the vision of making quality healthcare accessible to everyone, everywhere."
  },
   {
    name: "Emily White",
    role: "Lead Developer",
    avatarUrl: "https://placehold.co/128x128.png",
    avatarHint: "woman developer",
    bio: "Emily is the mastermind behind our user-friendly platform, constantly innovating to create a seamless user experience."
  }
];

export default function AboutUs() {
  return (
    <div className="bg-gray-50/50">
      <LandingHeader />
      <main>
        <section className="relative py-20 sm:py-28 lg:py-32 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1600x600.png')" }} data-ai-hint="hospital hallway">
            <div className="absolute inset-0 bg-indigo-900/70" />
            <div className="relative z-10 px-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif">About NovainHealth</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-100">
                    Your trusted partner in accessible and professional healthcare.
                </p>
            </div>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                    <p className="mt-4 text-muted-foreground">
                        Our mission is to make professional medical assistance accessible to all by connecting patients with certified doctors and healthcare professionals anytime, anywhere. We believe that everyone deserves quality healthcare, and we are committed to breaking down the barriers of distance, time, and complexity that often stand in the way.
                    </p>
                    <h2 className="text-3xl font-bold text-gray-800 mt-8">Our Vision</h2>
                    <p className="mt-4 text-muted-foreground">
                        We envision a world where healthcare is not a privilege but a fundamental right, seamlessly integrated into daily life. Our goal is to be the leading digital health platform, recognized for our innovation, reliability, and unwavering commitment to patient well-being. We strive to empower individuals to take control of their health journey with confidence and ease.
                    </p>
                </div>
                <div>
                    <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="Doctor consulting with patient" className="rounded-lg shadow-lg" data-ai-hint="doctor patient" />
                </div>
            </div>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16 bg-white">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800">Meet Our Team</h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    We are a dedicated team of doctors, nurses, and innovators passionate about revolutionizing healthcare.
                </p>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <Card key={index} className="text-center">
                            <CardContent className="p-6">
                                <Avatar className="h-24 w-24 mx-auto mb-4">
                                    <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.avatarHint} />
                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <h3 className="text-lg font-bold">{member.name}</h3>
                                <p className="text-sm text-cyan-500 font-semibold">{member.role}</p>
                                <p className="mt-2 text-xs text-muted-foreground">{member.bio}</p>
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
