
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";

export default function LandingHeader() {
    return (
        <header className="py-4 px-4 sm:px-8 lg:px-16 flex justify-between items-center border-b bg-white">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="NovainHealth Logo" width={124} height={34} />
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-cyan-500 border-b-2 border-cyan-500 pb-1">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-cyan-500">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-cyan-500">
            Contact Us
          </Link>
           <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-cyan-500">
            Blog
          </Link>
        </nav>
        <div className="hidden sm:flex items-center gap-4">
          <Button type="button" style={{ backgroundColor: '#D90067', color: 'white', borderRadius: '9999px', padding: '0 24px' }}>
            Emergency
          </Button>
          <Button asChild style={{ backgroundColor: '#46C8F5', color: 'white', borderRadius: '8px', padding: '0 24px' }}>
            <Link href="/general-login">
              LOGIN/SIGN UP
            </Link>
          </Button>
        </div>
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium text-cyan-500">
                  Home
                </Link>
                <Link href="/about" className="text-lg font-medium text-gray-600 hover:text-cyan-500">
                  About Us
                </Link>
                <Link href="/contact" className="text-lg font-medium text-gray-600 hover:text-cyan-500">
                  Contact Us
                </Link>
                <Link href="/blog" className="text-lg font-medium text-gray-600 hover:text-cyan-500">
                  Blog
                </Link>
                <Button style={{ backgroundColor: '#D90067', color: 'white', borderRadius: '9999px', marginTop: '1rem' }}>
                  Emergency
                </Button>
                <Link href="/general-login">
                  <Button style={{ backgroundColor: '#46C8F5', color: 'white', borderRadius: '8px', width: '100%' }}>
                    LOGIN/SIGN UP
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    )
}
