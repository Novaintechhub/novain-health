
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, ThumbsUp, MessageCircle, DollarSign, Bookmark, Phone, Video, CheckCircle, ArrowRight } from "lucide-react";

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
    <span className="text-sm text-muted-foreground">({count})</span>
  </div>
);

const awards = [
    {
        date: "July 2019",
        title: "Humanitarian Award",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
        date: "March 2011",
        title: "Certificate for International Volunteer Service",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    },
    {
        date: "May 2008",
        title: "The Dental Professional of The Year Award",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus."
    }
];

const services = [
    "Tooth cleaning", "Root Canal Therapy", "Implants",
    "Composite Bonding", "Fissure Sealants", "Surgical Extractions"
];

const specializations = [
    "Children Care", "Dental Care", "Oral and Maxillofacial Surgery",
    "Orthodontist", "Periodontist", "Prosthodontics"
];

export default function DoctorProfile() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Home / Doctor Profile</p>
        <h1 className="text-3xl font-bold">Doctor Profile</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <Image
                src="https://placehold.co/150x150.png"
                alt="Dr. Darren Elder"
                width={150}
                height={150}
                className="rounded-lg border"
                data-ai-hint="male doctor"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold">Dr. Darren Elder</h2>
              <p className="text-muted-foreground">BDS, MDS - Oral & Maxillofacial Surgery</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-primary font-semibold">Dentist</span>
              </div>
              <div className="mt-2">
                <StarRating rating={4} count={35} />
              </div>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Newyork, USA - <a href="#" className="text-primary hover:underline">Get Directions</a></span>
              </div>
              <div className="flex gap-2 mt-4">
                <Image src="https://placehold.co/80x80.png" alt="clinic photo 1" width={80} height={80} className="rounded-md" data-ai-hint="dental clinic" />
                <Image src="https://placehold.co/80x80.png" alt="clinic photo 2" width={80} height={80} className="rounded-md" data-ai-hint="dental equipment" />
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Dental Fillings</span>
                <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Teeth Whitening</span>
              </div>
            </div>
            <div className="md:w-64 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><ThumbsUp className="h-4 w-4 text-muted-foreground" /> <span>99%</span></div>
                  <div className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-muted-foreground" /> <span>35 Feedback</span></div>
                </div>
                 <div className="flex items-center gap-2 mt-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" /> <span>Newyork, USA</span></div>
                 <div className="flex items-center gap-2 mt-2 text-sm"><DollarSign className="h-4 w-4 text-muted-foreground" /> <span>$100 per hour</span></div>
                 <div className="flex justify-start gap-2 mt-4">
                    <Button variant="outline" size="icon"><Bookmark /></Button>
                    <Button variant="outline" size="icon"><MessageCircle /></Button>
                    <Button variant="outline" size="icon"><Phone /></Button>
                    <Button variant="outline" size="icon"><Video /></Button>
                 </div>
              </div>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white mt-4">Book Appointment</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview">
        <TabsList className="bg-transparent border-b rounded-none p-0">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="business-hours">Business Hours</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-8">
              <div>
                <h3 className="text-lg font-semibold">About Me</h3>
                <p className="mt-2 text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Education</h3>
                <ul className="mt-2 space-y-2 list-disc list-inside text-muted-foreground">
                  <li>American Dental Medical University - BDS (1998 - 2003)</li>
                  <li>American Dental Medical University - MDS (2003 - 2005)</li>
                </ul>
              </div>
               <div>
                <h3 className="text-lg font-semibold">Work & Experience</h3>
                <ul className="mt-2 space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Glowing Smiles Family Dental Clinic (2010 - Present) (5 years)</li>
                  <li>Comfort Care Dental Clinic (2007 - 2010) (3 years)</li>
                  <li>Dream Smile Dental Practice (2005 - 2007) (2 years)</li>
                </ul>
              </div>
               <div>
                <h3 className="text-lg font-semibold mb-4">Awards</h3>
                 <div className="relative border-l-2 border-cyan-200 pl-8 space-y-10">
                    {awards.map((award, index) => (
                        <div key={index} className="relative">
                            <div className="absolute -left-[42px] top-1 h-4 w-4 rounded-full bg-white border-2 border-cyan-400"></div>
                            <p className="text-sm text-cyan-500">{award.date}</p>
                            <h4 className="font-semibold">{award.title}</h4>
                            <p className="text-muted-foreground text-sm">{award.description}</p>
                        </div>
                    ))}
                 </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2">
                    {services.map((service, index) => (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground">
                            <ArrowRight className="h-4 w-4 text-cyan-500"/>
                            <span>{service}</span>
                        </div>
                    ))}
                </div>
              </div>
               <div>
                <h3 className="text-lg font-semibold mb-4">Specializations</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-2">
                    {specializations.map((spec, index) => (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground">
                            <ArrowRight className="h-4 w-4 text-cyan-500"/>
                            <span>{spec}</span>
                        </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="locations">
          <Card>
            <CardContent className="p-6">
              <p>Locations content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardContent className="p-6">
              <p>Reviews content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="business-hours">
          <Card>
            <CardContent className="p-6">
              <p>Business hours content goes here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
