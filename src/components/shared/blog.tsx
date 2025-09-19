
import Link from "next/link";
import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    slug: "post-1",
    title: "The Benefits of Telemedicine in Modern Healthcare",
    author: "Dr. John Doe",
    date: "July 22, 2024",
    excerpt: "Discover how telemedicine is revolutionizing patient care, offering convenience, and improving access to medical expertise.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "doctor video call"
  },
  {
    slug: "post-2",
    title: "5 Tips for a Healthy Heart",
    author: "Dr. Jane Smith",
    date: "July 20, 2024",
    excerpt: "Learn simple, effective strategies to maintain cardiovascular health and reduce your risk of heart disease.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "healthy food heart"
  },
];

export default function Blog() {
  return (
    <div className="bg-gray-50/50">
      <LandingHeader />
      <main>
        <section className="py-20 px-4 text-center bg-cyan-500 text-white">
          <h1 className="text-5xl font-bold font-serif">Our Blog</h1>
          <p className="mt-4 text-lg">Stay informed with the latest health news and tips from our experts.</p>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="overflow-hidden">
                <CardHeader className="p-0">
                  <Image src={post.imageUrl} alt={post.title} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={post.imageHint} />
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">{post.date} by {post.author}</p>
                  <CardTitle className="mt-2 text-xl">{post.title}</CardTitle>
                  <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="p-0">
                    <Link href={`/blog/post?slug=${post.slug}`}>Read More &rarr;</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
