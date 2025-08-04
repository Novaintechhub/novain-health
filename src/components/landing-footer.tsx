
"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function LandingFooter() {
    return (
        <footer style={{ backgroundColor: '#0A2540' }} className="text-gray-300 py-12 px-4 sm:px-8 lg:px-16 relative">
          <div className="absolute right-0 bottom-0">
            <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M250 250V0C111.929 0 0 111.929 0 250H250Z" fill="#103A63"/>
            </svg>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
          <div className="md:col-span-2">
            <Image src="/logo.png" alt="NovainHealth Logo" width={165} height={45} className="brightness-0 invert"/>
            <p className="mt-4 text-sm max-w-md">
              Bringing quality healthcare to your fingertips. Novain Health connects you with trusted medical professionals anytime, anywhere, so you’re never alone on your health journey. Our mission is to make professional medical assistance accessible to all by connecting patients with certified doctors and healthcare professionals anytime, anywhere.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#"><img src="https://placehold.co/32x32.png" alt="Facebook" data-ai-hint="social icon"/></a>
              <a href="#"><img src="https://placehold.co/32x32.png" alt="Dribbble" data-ai-hint="social icon"/></a>
              <a href="#"><img src="https://placehold.co/32x32.png" alt="LinkedIn" data-ai-hint="social icon"/></a>
              <a href="#"><img src="https://placehold.co/32x32.png" alt="Behance" data-ai-hint="social icon"/></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white">About</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/patients/register" className="hover:text-white">For Patients</Link></li>
              <li><Link href="/doctor-registration" className="hover:text-white">For Doctors</Link></li>
            </ul>
             <h4 className="font-bold text-white mt-8">Support</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
              <li><Link href="/help-center" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/emergency-response" className="hover:text-white">Emergency Response Info</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white">Download the App</h4>
            <div className="mt-4 space-y-4">
              <a href="#"><img src="https://placehold.co/135x40.png" alt="App Store" data-ai-hint="app store button"/></a>
              <a href="#"><img src="https://placehold.co/135x40.png" alt="Google Play" data-ai-hint="google play button"/></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white">Contact Us</h4>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1"/>
                  <span>3556 Beech Street, San Francisco, California, CA 94108</span>
              </li>
              <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:doccure@example.com" className="hover:text-white">doccure@example.com</a>
              </li>
              <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <a href="tel:+13153695943" className="hover:text-white">+1 315 369 5943</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center text-sm relative z-10 gap-4">
          <p>&copy; 2024 Novain Health. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/terms-of-service" className="hover:text-white">Terms and Conditions</Link>
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    )
}
