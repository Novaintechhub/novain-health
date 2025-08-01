"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SocialMedia() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Social Media</h1>
          <p className="text-sm text-muted-foreground">
            <Link href="/dashboard">Home</Link> / Social Media
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="facebook-url">Facebook URL</Label>
              <Input id="facebook-url" placeholder="https://www.facebook.com/" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter-url">Twitter URL</Label>
              <Input id="twitter-url" placeholder="https://www.twitter.com/" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram-url">Instagram URL</Label>
              <Input id="instagram-url" placeholder="https://www.instagram.com/" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pinterest-url">Pinterest URL</Label>
              <Input id="pinterest-url" placeholder="https://www.pinterest.com/" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin-url">LinkedIn URL</Label>
              <Input id="linkedin-url" placeholder="https://www.linkedin.com/" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube-url">Youtube URL</Label>
              <Input id="youtube-url" placeholder="https://www.youtube.com/" />
            </div>
          </div>
          <Button style={{ backgroundColor: '#46C8F5', color: 'white' }}>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
