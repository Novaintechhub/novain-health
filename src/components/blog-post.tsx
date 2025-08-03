
"use client";

import LandingHeader from "../landing-header";
import LandingFooter from "../landing-footer";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

const recentPosts = [
  { title: "5 Tips for a Healthy Heart", imageUrl: "https://placehold.co/80x80.png", imageHint: "healthy heart" },
  { title: "Mental Health in the Digital Age", imageUrl: "https://placehold.co/80x80.png", imageHint: "mental health" },
  { title: "Understanding Your Lab Results", imageUrl: "https://placehold.co/80x80.png", imageHint: "lab results" },
];

const tags = ["Health", "Wellness", "Telemedicine", "Nutrition", "Mental Health", "Fitness"];

export default function BlogPost() {
  return (
    <div className="bg-white">
      <LandingHeader />
      <main>
        <section className="py-8 px-4 sm:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <article>
                <Image src="https://placehold.co/800x400.png" alt="Blog post hero image" width={800} height={400} className="w-full rounded-lg" data-ai-hint="telemedicine concept" />
                <div className="mt-6 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" alt="Dr. John Doe" data-ai-hint="male doctor" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Dr. John Doe</p>
                    <p className="text-sm text-muted-foreground">July 20, 2024</p>
                  </div>
                </div>
                <h1 className="text-4xl font-bold mt-4 text-gray-800">The Future of Telemedicine</h1>
                <div className="prose prose-lg max-w-none mt-6">
                    <p>Telemedicine, the practice of caring for patients remotely when the provider and patient are not physically present with each other, has been on the rise for years. Modern technology has enabled doctors to consult with patients by using HIPAA-compliant video-conferencing tools. The COVID-19 pandemic accelerated this trend, pushing healthcare systems worldwide to adopt digital solutions at an unprecedented rate.</p>
                    
                    <h2>Benefits for Patients and Providers</h2>
                    <p>For patients, telemedicine offers convenience and accessibility. No longer do they need to take time off work, travel long distances, or sit in waiting rooms. This is particularly beneficial for those with chronic conditions, mobility issues, or those living in rural areas. For providers, it can lead to improved efficiency, better patient follow-up, and a reduction in no-shows.</p>
                    
                    <blockquote>"The integration of technology in healthcare is not just about convenience; it's about creating a more patient-centric system that is proactive rather than reactive."</blockquote>
                    
                    <h2>Challenges and the Road Ahead</h2>
                    <p>Despite its advantages, telemedicine faces challenges. Issues such as digital literacy, access to reliable internet, and concerns about data privacy need to be addressed. Furthermore, while many conditions can be managed remotely, the importance of in-person examinations for certain diagnoses cannot be overstated. The future likely holds a hybrid model, where digital and physical care coexist to provide the best possible outcomes for patients.</p>
                </div>
              </article>
            </div>
            <aside className="lg:col-span-1 space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="relative">
                    <Input placeholder="Search..." className="pl-10" />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {recentPosts.map((post, index) => (
                        <Link href="#" key={index} className="flex items-center gap-4 group">
                            <Image src={post.imageUrl} alt={post.title} width={80} height={80} className="rounded-lg" data-ai-hint={post.imageHint} />
                            <div>
                                <p className="font-semibold group-hover:text-cyan-500">{post.title}</p>
                            </div>
                        </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
               <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <Button key={index} variant="outline" size="sm" className="rounded-full">
                            {tag}
                        </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
