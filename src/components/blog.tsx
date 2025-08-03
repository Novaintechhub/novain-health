
"use client";

import { Card, CardContent } from "@/components/ui/card";
import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

const blogPosts = [
  {
    title: "The Future of Telemedicine",
    date: "July 20, 2024",
    author: "Dr. John Doe",
    excerpt: "Discover how technology is transforming healthcare delivery and what it means for patients and doctors...",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "telemedicine concept"
  },
  {
    title: "5 Tips for a Healthy Heart",
    date: "July 18, 2024",
    author: "Dr. Jane Smith",
    excerpt: "Learn simple lifestyle changes you can make to improve cardiovascular health and reduce risks...",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "healthy heart"
  },
  {
    title: "Mental Health in the Digital Age",
    date: "July 15, 2024",
    author: "Dr. Emily White",
    excerpt: "Exploring the impacts of our connected world on mental well-being and strategies for maintaining balance...",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "mental health"
  },
  {
    title: "Understanding Your Lab Results",
    date: "July 12, 2024",
    author: "Dr. Michael Brown",
    excerpt: "A guide to demystifying common lab tests and what the numbers on your report really mean...",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "lab results"
  },
  {
    title: "Nutrition Myths Debunked",
    date: "July 10, 2024",
    author: "Dr. Sarah Green",
    excerpt: "We separate fact from fiction on popular nutrition trends to help you make informed dietary choices...",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "healthy food"
  },
  {
    title: "The Importance of Regular Check-ups",
    date: "July 8, 2024",
    author: "Dr. David Wilson",
    excerpt: "Why preventive care is one of the most effective tools for long-term health and wellness...",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "doctor checkup"
  },
];

export default function Blog() {
  return (
    <div className="bg-gray-50/50">
      <LandingHeader />
      <main>
        <section className="relative py-20 sm:py-28 lg:py-32 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1600x600.png')" }} data-ai-hint="person writing">
            <div className="absolute inset-0 bg-indigo-900/70" />
            <div className="relative z-10 px-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif">Our Blog</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-100">
                    Stay informed with the latest health news, tips, and insights from our team of experts.
                </p>
            </div>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-end mb-8">
                    <div className="relative w-full max-w-xs">
                        <Input placeholder="Search blog..." className="pl-10" />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Image src={post.imageUrl} alt={post.title} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={post.imageHint} />
                            <CardContent className="p-6">
                                <p className="text-xs text-muted-foreground">{post.date} / By {post.author}</p>
                                <h3 className="text-xl font-bold mt-2 text-gray-800">{post.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
                                <Button asChild variant="link" className="p-0 h-auto mt-4 text-cyan-500 hover:text-cyan-600">
                                    <Link href="#">Read More &rarr;</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">Load More</Button>
                </div>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
