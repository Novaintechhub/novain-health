
"use client";

import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const BlogPostContent = () => {
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug');

    // In a real app, you'd fetch the post content based on the slug.
    const post = {
        title: "The Benefits of Telemedicine in Modern Healthcare",
        author: "Dr. John Doe",
        date: "July 22, 2024",
        imageUrl: "https://placehold.co/1200x600.png",
        imageHint: "doctor video call laptop"
    };

    return (
        <main>
            <section className="py-16 px-4 sm:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-800">{post.title}</h1>
                    <p className="mt-4 text-muted-foreground">Posted on {post.date} by {post.author}</p>
                    <Image src={post.imageUrl} alt={post.title} width={1200} height={600} className="w-full h-auto object-cover rounded-lg mt-8" data-ai-hint={post.imageHint} />
                    <article className="prose lg:prose-xl mt-8 max-w-none">
                        <p>Telemedicine, the practice of caring for patients remotely when the provider and patient are not physically present with each other, has been on the rise for years. Modern technology has enabled doctors to consult with patients by using HIPAA-compliant video-conferencing tools.</p>
                        <p>The recent global pandemic has accelerated the adoption of telemedicine, and it has now become a fundamental part of the healthcare landscape. Let's explore some of the key benefits that telemedicine offers to both patients and healthcare providers.</p>
                        <h2>Convenience and Accessibility</h2>
                        <p>One of the most significant advantages of telemedicine is the convenience it offers. Patients can consult with a doctor from the comfort of their home, office, or even while traveling. This eliminates the need for travel time, waiting rooms, and taking time off from work.</p>
                        <h2>Improved Access to Specialists</h2>
                        <p>For patients living in rural or underserved areas, accessing specialist care can be a major challenge. Telemedicine bridges this gap by connecting patients with specialists from anywhere in the country. This ensures that everyone has access to the expertise they need, regardless of their location.</p>
                    </article>
                </div>
            </section>
        </main>
    )
}

export default function BlogPost() {
  return (
    <div className="bg-white">
      <LandingHeader />
      <Suspense fallback={<div className="text-center p-20">Loading post...</div>}>
        <BlogPostContent />
      </Suspense>
      <LandingFooter />
    </div>
  );
}
