
"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, ThumbsUp, MessageCircle, DollarSign, Bookmark, Phone, Video, CheckCircle, ArrowRight, Reply, ThumbsDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const StarRating = ({ rating, count, onRatingChange, interactive = false }: { rating: number; count?: number; onRatingChange?: (rating: number) => void; interactive?: boolean }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        } ${interactive ? 'cursor-pointer' : ''}`}
        onClick={() => onRatingChange?.(i + 1)}
      />
    ))}
    {count !== undefined && <span className="text-sm text-muted-foreground">({count})</span>}
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
    "Orthodontist", "Periododontist", "Prosthodontics"
];

const locations = [
    {
      name: "Smile Cute Dental Care Center",
      specialty: "MDS - Periodontology and Oral Implantology, BDS",
      rating: 4,
      reviewCount: 4,
      address: "2286 Sundown Lane, Austin, Texas 78749, USA",
      images: [
        { src: "https://placehold.co/80x80.png", hint: "dental clinic" },
        { src: "https://placehold.co/80x80.png", hint: "dental equipment" },
        { src: "https://placehold.co/80x80.png", hint: "dentist patient" },
        { src: "https://placehold.co/80x80.png", hint: "dental chair" },
      ],
      hours: [
        { days: "Mon - Sat", time: "10:00 AM - 2:00 PM\n4:00 PM - 9:00 PM" },
        { days: "Sun", time: "10:00 AM - 2:00 PM" },
      ],
      price: 250,
    },
    {
      name: "The Family Dentistry Clinic",
      specialty: "MDS - Periodontology and Oral Implantology, BDS",
      rating: 4,
      reviewCount: 4,
      address: "2883 University Street, Seattle, Texas Washington, 98155",
      images: [
        { src: "https://placehold.co/80x80.png", hint: "clinic reception" },
        { src: "https://placehold.co/80x80.png", hint: "medical tools" },
        { src: "https://placehold.co/80x80.png", hint: "doctor with patient" },
        { src: "https://placehold.co/80x80.png", hint: "operating room" },
      ],
      hours: [
        { days: "Tue - Fri", time: "11:00 AM - 1:00 PM\n6:00 PM - 11:00 PM" },
        { days: "Sat - Sun", time: "8:00 AM - 10:00 AM\n3:00 PM - 7:00 PM" },
      ],
      price: 350,
    },
  ];

  const reviews = [
    {
      name: "Richard Wilson",
      avatar: "https://placehold.co/80x80.png",
      avatarHint: "man portrait",
      date: "Reviewed 2 Days ago",
      rating: 5,
      recommended: true,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Curabitur non nulla sit amet nisl tempus",
      reply: {
        name: "Dr. Darren Elder",
        avatar: "https://placehold.co/80x80.png",
        avatarHint: "male doctor",
        date: "Reviewed 2 Days ago",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Curabitur non nulla sit amet nisl tempus",
      }
    },
    {
      name: "Charlene Reed",
      avatar: "https://placehold.co/80x80.png",
      avatarHint: "woman smiling",
      date: "Reviewed 3 Days ago",
      rating: 4,
      recommended: false,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Curabitur non nulla sit amet nisl tempus",
      reply: null,
    },
    {
      name: "Travis Trimble",
      avatar: "https://placehold.co/80x80.png",
      avatarHint: "male doctor portrait",
      date: "Reviewed 4 Days ago",
      rating: 5,
      recommended: false,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Curabitur non nulla sit amet nisl tempus",
      reply: null,
    },
  ];

const businessHours = [
    { day: "Today", date: "5 Nov 2019", time: "07:00 AM - 09:00 PM", status: "Open Now" },
    { day: "Monday", time: "07:00 AM - 09:00 PM" },
    { day: "Tuesday", time: "07:00 AM - 09:00 PM" },
    { day: "Wednesday", time: "07:00 AM - 09:00 PM" },
    { day: "Thursday", time: "07:00 AM - 09:00 PM" },
    { day: "Friday", time: "07:00 AM - 09:00 PM" },
    { day: "Saturday", time: "07:00 AM - 09:00 PM" },
    { day: "Sunday", time: "", status: "Closed" },
];

export default function DoctorProfile() {
  const [reviewRating, setReviewRating] = React.useState(0);
  const [reviewText, setReviewText] = React.useState('');
  const MAX_REVIEW_LENGTH = 100;

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
                    <Link href="/patients/messages">
                      <Button variant="outline" size="icon"><MessageCircle /></Button>
                    </Link>
                    <Link href="/patients/voice-call">
                      <Button variant="outline" size="icon"><Phone /></Button>
                    </Link>
                    <Link href="/patients/video-call">
                      <Button variant="outline" size="icon"><Video /></Button>
                    </Link>
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
        <TabsContent value="locations" className="mt-6">
            <Card>
                <CardContent className="p-0">
                    {locations.map((location, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-b last:border-b-0">
                            <div className="md:col-span-1 space-y-2">
                                <h4 className="text-lg font-bold">{location.name}</h4>
                                <p className="text-sm text-muted-foreground">{location.specialty}</p>
                                <StarRating rating={location.rating} count={location.reviewCount} />
                                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                    <span>{location.address}</span>
                                </div>
                                <a href="#" className="text-sm text-cyan-500 hover:underline">Get Directions</a>
                                <div className="flex gap-2 pt-2">
                                    {location.images.map((image, i) => (
                                        <Image key={i} src={image.src} alt={`clinic photo ${i + 1}`} width={60} height={60} className="rounded-md object-cover" data-ai-hint={image.hint} />
                                    ))}
                                </div>
                            </div>
                            <div className="md:col-span-1 space-y-2">
                                {location.hours.map((hour, i) => (
                                    <div key={i}>
                                        <p className="font-semibold">{hour.days}</p>
                                        <p className="text-sm text-muted-foreground whitespace-pre-line">{hour.time}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="md:col-span-1 text-right">
                                <p className="text-2xl font-bold">${location.price}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-8">
               {reviews.map((review, index) => (
                 <div key={index} className="border-b last:border-b-0 pb-8 last:pb-0">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 shrink-0">
                            <AvatarImage src={review.avatar} alt={review.name} data-ai-hint={review.avatarHint} />
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold">{review.name}</h4>
                                    <p className="text-sm text-muted-foreground">{review.date}</p>
                                </div>
                                <StarRating rating={review.rating} />
                            </div>
                            {review.recommended && (
                                <div className="flex items-center gap-2 mt-2 text-green-600 font-semibold">
                                    <ThumbsUp className="h-4 w-4"/>
                                    <span>I recommend the doctor</span>
                                </div>
                            )}
                            <p className="mt-2 text-muted-foreground">{review.text}</p>
                            <div className="flex items-center justify-between mt-4">
                                <Button variant="ghost" className="p-0 text-cyan-500 hover:text-cyan-600">
                                    <Reply className="h-4 w-4 mr-2"/> Reply
                                </Button>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>Recommend?</span>
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <ThumbsUp className="h-4 w-4 text-green-500"/> Yes
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <ThumbsDown className="h-4 w-4 text-red-500"/> No
                                    </Button>
                                </div>
                            </div>
                            {review.reply && (
                                <div className="flex items-start gap-4 mt-6 ml-8 p-4 bg-gray-50 rounded-lg">
                                    <Avatar className="h-12 w-12 shrink-0">
                                        <AvatarImage src={review.reply.avatar} alt={review.reply.name} data-ai-hint={review.reply.avatarHint} />
                                        <AvatarFallback>{review.reply.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold">{review.reply.name}</h4>
                                                <p className="text-sm text-muted-foreground">{review.reply.date}</p>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-muted-foreground">{review.reply.text}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                 </div>
               ))}
               <div className="text-center">
                 <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Show all feedback (167)</Button>
               </div>

               <div className="border-t pt-8 mt-8">
                    <h3 className="text-xl font-bold mb-4">Write a review for Dr. Darren Elder</h3>
                    <div className="space-y-4">
                        <div>
                            <Label>Review</Label>
                            <div className="mt-1">
                                <StarRating rating={reviewRating} onRatingChange={setReviewRating} interactive={true} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="review-title">Title of your review</Label>
                            <Input id="review-title" placeholder="If you could say it in one sentence, what would you say?" />
                        </div>
                        <div>
                            <Label htmlFor="review-text">Your review</Label>
                            <Textarea 
                                id="review-text"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                maxLength={MAX_REVIEW_LENGTH}
                            />
                            <p className="text-sm text-muted-foreground mt-1">{MAX_REVIEW_LENGTH - reviewText.length} characters remaining</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                                I have read and accept <a href="#" className="text-cyan-500 hover:underline">Terms & Conditions</a>
                            </Label>
                        </div>
                        <div>
                            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Add Review</Button>
                        </div>
                    </div>
                </div>

            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="business-hours" className="mt-6">
            <Card>
                <CardContent className="p-6">
                    <ul className="space-y-4">
                        {businessHours.map((item, index) => (
                            <li key={index} className="flex justify-between items-center border-b pb-4 last:border-b-0">
                                <div>
                                    <p className="font-semibold">{item.day}</p>
                                    {item.date && <p className="text-sm text-muted-foreground">{item.date}</p>}
                                </div>
                                <div className="text-right">
                                    {item.status === "Open Now" && (
                                        <>
                                            <p className="text-sm text-muted-foreground">{item.time}</p>
                                            <Badge className="bg-green-100 text-green-800 mt-1">Open Now</Badge>
                                        </>
                                    )}
                                    {item.status === "Closed" && (
                                        <Badge variant="destructive" className="bg-red-100 text-red-800">Closed</Badge>
                                    )}
                                    {!item.status && <p className="text-sm text-muted-foreground">{item.time}</p>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
