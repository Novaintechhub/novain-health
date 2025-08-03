
"use client";

import { Card, CardContent } from "@/components/ui/card";
import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="bg-gray-50/50">
      <LandingHeader />
      <main>
        <section className="relative py-20 sm:py-28 lg:py-32 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1600x600.png')" }} data-ai-hint="office building">
            <div className="absolute inset-0 bg-indigo-900/70" />
            <div className="relative z-10 px-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif">Contact Us</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-100">
                    We're here to help. Reach out to us with any questions or concerns.
                </p>
            </div>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1 space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-cyan-100 text-cyan-600 p-3 rounded-full">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Our Location</h3>
                            <p className="text-muted-foreground">3556 Beech Street, San Francisco, California, CA 94108</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-cyan-100 text-cyan-600 p-3 rounded-full">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Phone</h3>
                            <p className="text-muted-foreground">+1 315 369 5943</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-cyan-100 text-cyan-600 p-3 rounded-full">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">Email</h3>
                            <p className="text-muted-foreground">support@novainhealth.com</p>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <Card>
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Enter your name" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="Enter your email" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" placeholder="Subject of your message" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" placeholder="Type your message here..." rows={5} />
                                </div>
                                <Button style={{ backgroundColor: '#46C8F5', color: 'white' }} size="lg">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
