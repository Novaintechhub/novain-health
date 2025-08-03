
"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const NovainLogoWhite = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="165" height="45" viewBox="0 0 165 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34.4105 12.4116V1.36963H44.0155V30.1506H34.4105V18.8268C34.4105 17.4547 34.4105 16.0826 34.4105 14.6657C34.3541 13.5344 34.0749 12.7494 33.1769 12.2351C32.2789 11.7208 31.1008 11.7208 30.0028 12.1795L23.5618 14.4189V3.8477L34.4105 12.4116Z" fill="white"/>
        <path d="M0.999878 1.36963H10.6049V30.1506H0.999878V1.36963Z" fill="white"/>
        <path d="M22.7585 30.1506V19.9948L12.7249 23.7226V30.1506H22.7585Z" fill="white"/>
        <path d="M22.7585 1.36963H12.7249V18.1685L22.7585 15.0094V1.36963Z" fill="white"/>
        <path d="M69.1213 15.8599C69.1213 17.232 68.214 18.1225 66.8711 18.1225C65.5281 18.1225 64.6208 17.232 64.6208 15.8599C64.6208 14.4878 65.5281 13.5973 66.8711 13.5973C68.214 13.5973 69.1213 14.4878 69.1213 15.8599ZM66.8711 30.4326C60.4301 30.4326 55.3559 25.0459 55.3559 15.8599C55.3559 6.62901 60.4301 1.36963 66.8711 1.36963C73.2828 1.36963 78.3278 6.62901 78.3278 15.8599C78.3278 25.0459 73.2828 30.4326 66.8711 30.4326Z" fill="white"/>
        <path d="M104.926 12.4116V1.36963H114.531V30.1506H104.926V18.8268C104.926 17.4547 104.926 16.0826 104.926 14.6657C104.88 13.5344 104.599 12.7494 103.701 12.2351C102.803 11.7208 101.625 11.7208 100.527 12.1795L94.0862 14.4189V3.8477L104.926 12.4116Z" fill="white"/>
        <path d="M84.9843 1.36963H94.5892V30.1506H84.9843V1.36963Z" fill="white"/>
        <path d="M124.405 1.36963H134.01V30.1506H124.405V1.36963Z" fill="white"/>
        <path d="M135.273 1.36963H147.178L140.143 15.8599L146.897 30.1506H135.44L131.514 21.7895H124.179V30.1506H114.574V1.36963H131.288C132.631 1.36963 133.809 2.05517 134.42 3.25281C135.03 4.45045 135.03 5.86734 134.42 7.06498C133.809 8.26262 132.631 8.95816 131.288 8.95816H124.179V13.4846H130.333L135.273 1.36963Z" fill="#A4DBF4"/>
        <path d="M53.6611 42.0277L45.4894 34.4831L53.6611 42.0277Z" fill="#A4DBF4"/>
        <path d="M54.056 41.6556L45.4894 33.7123L54.056 41.6556Z" fill="#A4DBF4"/>
        <path d="M45.4894 33.7123L54.1124 41.7118L45.4894 33.7123Z" fill="#A4DBF4"/>
        <path d="M54.1124 41.7118L45.4894 33.7123L54.1124 41.7118Z" fill="#A4DBF4"/>
        <path d="M45.4894 33.7123L54.056 41.6556L45.4894 33.7123Z" fill="#A4DBF4"/>
        <path d="M54.056 41.6556L45.4894 33.7123L54.056 41.6556Z" fill="#A4DBF4"/>
        <path d="M45.4894 33.7123L53.6611 42.0277L45.4894 33.7123Z" fill="#A4DBF4"/>
        <path d="M53.6611 42.0277L45.4894 33.7123L53.6611 42.0277Z" fill="#A4DBF4"/>
        <path d="M53.6047 33.458H45.0945L53.6047 33.458Z" fill="#A4DBF4"/>
        <path d="M53.6047 33.458H45.0945" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M60.7235 33.458H55.5847" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M60.5546 42.0277L53.6611 33.7123" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M54.056 41.6556L45.4894 33.7123" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M66.002 42.0277H74.5122" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M70.2571 42.0277V33.6558" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M79.0939 42.0277H87.6041" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M83.349 42.0277V33.6558" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M92.0659 37.8417C92.0659 35.4566 93.9625 33.6558 96.2492 33.6558H97.3781C99.6648 33.6558 101.561 35.4566 101.561 37.8417V42.0277H92.0659V37.8417Z" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M106.693 33.6558H104.385V42.0277H106.693V33.6558Z" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M115.09 42.0277L108.196 33.7123" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M108.568 41.6556L117.135 33.7123" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M120.415 33.6558V42.0277" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M120.415 36.6704H124.405" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M127.559 33.6558L132.851 42.0277L138.143 33.6558" stroke="#A4DBF4" strokeWidth="2" strokeLinecap="round"/>
        <path d="M164.197 15.8599C164.197 17.232 163.29 18.1225 161.947 18.1225C160.604 18.1225 159.697 17.232 159.697 15.8599C159.697 14.4878 160.604 13.5973 161.947 13.5973C163.29 13.5973 164.197 14.4878 164.197 15.8599ZM161.947 30.4326C155.506 30.4326 150.432 25.0459 150.432 15.8599C150.432 6.62901 155.506 1.36963 161.947 1.36963C168.359 1.36963 173.404 6.62901 173.404 15.8599C173.404 25.0459 168.359 30.4326 161.947 30.4326Z" fill="white"/>
    </svg>
);

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
            <NovainLogoWhite />
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
