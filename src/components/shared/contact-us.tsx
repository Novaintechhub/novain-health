
"use client";

import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="bg-gray-50/50">
      <LandingHeader />
      <main>
        <section className="py-20 px-4 text-center bg-cyan-500 text-white">
          <h1 className="text-5xl font-bold font-serif">Contact Us</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            We're here to help. Reach out to us with any questions or concerns.
          </p>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
              <form className="mt-8 space-y-6">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Input placeholder="Subject" />
                <Textarea placeholder="Your Message" rows={5} />
                <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">Send Message</Button>
              </form>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Contact Information</h2>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-cyan-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Our Location</h3>
                    <p className="text-muted-foreground">3556 Beech Street, San Francisco, CA 94108</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-cyan-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone Number</h3>
                    <p className="text-muted-foreground">+1 315 369 5943</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-cyan-500 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email Address</h3>
                    <p className="text-muted-foreground">doccure@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
