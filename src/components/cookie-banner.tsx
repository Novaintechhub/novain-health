
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our{" "}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="flex-shrink-0 flex gap-4">
            <Button onClick={handleAccept} className="bg-cyan-500 hover:bg-cyan-600 text-white">Accept All</Button>
            <Button variant="outline" onClick={handleDecline}>Decline</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
