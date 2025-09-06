
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type SocialMediaLinks = {
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  pinterestUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
};

export default function SocialMedia() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [links, setLinks] = useState<SocialMediaLinks>({
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    pinterestUrl: "",
    linkedinUrl: "",
    youtubeUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      if (!user) return;
      try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/doctor/social-media', {
          headers: { 'Authorization': `Bearer ${idToken}` },
        });
        if (!response.ok) throw new Error("Failed to fetch social media links.");
        const data = await response.json();
        setLinks(data);
      } catch (error) {
        console.error("Error fetching social media links:", error);
        toast({ variant: "destructive", title: "Error", description: "Could not load your links." });
      } finally {
        setLoading(false);
      }
    };
    if (user) {
        fetchLinks();
    } else if (!authLoading) {
        setLoading(false);
    }
  }, [user, authLoading, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinks({ ...links, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/doctor/social-media', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(links),
      });
      if (!response.ok) throw new Error("Failed to save links.");
      toast({
        title: "Success",
        description: "Your social media links have been updated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
        <Card>
            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </CardContent>
        </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="facebookUrl">Facebook URL</Label>
              <Input id="facebookUrl" placeholder="https://www.facebook.com/yourprofile" value={links.facebookUrl} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitterUrl">Twitter URL</Label>
              <Input id="twitterUrl" placeholder="https://www.twitter.com/yourprofile" value={links.twitterUrl} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagramUrl">Instagram URL</Label>
              <Input id="instagramUrl" placeholder="https://www.instagram.com/yourprofile" value={links.instagramUrl} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pinterestUrl">Pinterest URL</Label>
              <Input id="pinterestUrl" placeholder="https://www.pinterest.com/yourprofile" value={links.pinterestUrl} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input id="linkedinUrl" placeholder="https://www.linkedin.com/in/yourprofile" value={links.linkedinUrl} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtubeUrl">Youtube URL</Label>
              <Input id="youtubeUrl" placeholder="https://www.youtube.com/yourchannel" value={links.youtubeUrl} onChange={handleChange} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
