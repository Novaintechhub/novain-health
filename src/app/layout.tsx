
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/shared/cookie-banner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair-display",
});


export const metadata: Metadata = {
  title: "NovainHealth",
  description: "A tool for integrating Figma designs into your workflow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
      </head>
      <body className={`${poppins.variable} ${playfairDisplay.variable} font-body antialiased h-full`}>
        {children}
        <Toaster />
        <CookieBanner />
      </body>
    </html>
  );
}
