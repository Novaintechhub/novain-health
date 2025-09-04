
"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const SocialMediaSchema = z.object({
  facebookUrl: z.string().url({ message: "Invalid Facebook URL" }).optional().or(z.literal('')),
  twitterUrl: z.string().url({ message: "Invalid Twitter URL" }).optional().or(z.literal('')),
  instagramUrl: z.string().url({ message: "Invalid Instagram URL" }).optional().or(z.literal('')),
  pinterestUrl: z.string().url({ message: "Invalid Pinterest URL" }).optional().or(z.literal('')),
  linkedinUrl: z.string().url({ message: "Invalid LinkedIn URL" }).optional().or(z.literal('')),
  youtubeUrl: z.string().url({ message: "Invalid Youtube URL" }).optional().or(z.literal('')),
});

type SocialMediaInput = z.infer<typeof SocialMediaSchema>;

export default function SocialMedia() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting, isLoading }, reset } = useForm<SocialMediaInput>({
    resolver: zodResolver(SocialMediaSchema),
  });

  useEffect(() => {
    const fetchSocialMediaLinks = async () => {
      if (!user) return;
      try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/doctor/social-media', {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        });
        if (!response.ok) throw new Error("Failed to fetch social links");
        const data = await response.json();
        reset(data);
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Could not load social media links." });
      }
    };
    if(user) {
        fetchSocialMediaLinks();
    }
  }, [user, reset, toast]);

  const onSubmit = async (data: SocialMediaInput) => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/doctor/social-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update social media links");

      toast({ title: "Success", description: "Social media links updated successfully." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  if (isLoading && !user) {
    return (
       <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Card>
            <CardHeader><Skeleton className="h-6 w-1/4" /></CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-32" />
            </CardContent>
        </Card>
       </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Social Media</h1>
          <p className="text-sm text-muted-foreground">
            <Link href="/doctor" className="hidden sm:inline">Home / </Link> Social Media
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="facebook-url">Facebook URL</Label>
                <Input id="facebook-url" placeholder="https://www.facebook.com/" {...register("facebookUrl")} />
                {errors.facebookUrl && <p className="text-sm text-destructive">{errors.facebookUrl.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter-url">Twitter URL</Label>
                <Input id="twitter-url" placeholder="https://www.twitter.com/" {...register("twitterUrl")} />
                {errors.twitterUrl && <p className="text-sm text-destructive">{errors.twitterUrl.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram-url">Instagram URL</Label>
                <Input id="instagram-url" placeholder="https://www.instagram.com/" {...register("instagramUrl")} />
                {errors.instagramUrl && <p className="text-sm text-destructive">{errors.instagramUrl.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pinterest-url">Pinterest URL</Label>
                <Input id="pinterest-url" placeholder="https://www.pinterest.com/" {...register("pinterestUrl")} />
                {errors.pinterestUrl && <p className="text-sm text-destructive">{errors.pinterestUrl.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin-url">LinkedIn URL</Label>
                <Input id="linkedin-url" placeholder="https://www.linkedin.com/" {...register("linkedinUrl")} />
                {errors.linkedinUrl && <p className="text-sm text-destructive">{errors.linkedinUrl.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube-url">Youtube URL</Label>
                <Input id="youtube-url" placeholder="https://www.youtube.com/" {...register("youtubeUrl")} />
                {errors.youtubeUrl && <p className="text-sm text-destructive">{errors.youtubeUrl.message}</p>}
              </div>
            </div>
            <Button type="submit" style={{ backgroundColor: '#46C8F5', color: 'white' }} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
