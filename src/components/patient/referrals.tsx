
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Gift, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SocialButton = ({ children, brandColor }: { children: React.ReactNode; brandColor: string }) => (
    <Button variant="outline" size="icon" style={{ color: brandColor, borderColor: brandColor }} className="rounded-full hover:bg-gray-100">
        {children}
    </Button>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.4 3.3 4.4s-1.4 1.4-3.3 1.4H6.7c-3.3 0-3.3-3.3-3.3-3.3s1.4-1.4 3.3-1.4H3.3s.7-2.1 2-3.4c-1.6-1.4-3.3-4.4-3.3-4.4s1.4-1.4 3.3-1.4H12c3.3 0 3.3 3.3 3.3 3.3s-1.4 1.4-3.3 1.4h6.7c3.3 0 3.3 3.3 3.3 3.3z"/></svg>
);
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

export default function Referrals() {
    const { toast } = useToast();
    const referralLink = "https://novainhealth.com/signup?ref=TC2024XYZ";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        toast({
            title: "Copied to clipboard!",
            description: "You can now share your referral link.",
        });
    };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Referrals</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Referrals</CardTitle>
                <Users className="w-6 h-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Friends referred</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Rewards Earned</CardTitle>
                <Gift className="w-6 h-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">₦6,000</p>
                <p className="text-sm text-muted-foreground">Total earnings from referrals</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Share Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
            <p className="text-muted-foreground">
                Invite your friends to NovainHealth and you'll both get a ₦500 discount on your next consultation when they sign up.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 max-w-lg mx-auto">
                <Input readOnly value={referralLink} className="text-center sm:text-left"/>
                <Button onClick={copyToClipboard} className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                </Button>
            </div>
             <div className="flex justify-center items-center gap-4 mt-4">
                <SocialButton brandColor="#1877F2"><FacebookIcon /></SocialButton>
                <SocialButton brandColor="#1DA1F2"><TwitterIcon /></SocialButton>
                <SocialButton brandColor="#25D366"><WhatsAppIcon /></SocialButton>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
