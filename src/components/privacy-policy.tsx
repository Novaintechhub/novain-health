
"use client";

import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50/50">
      <LandingHeader />
      <main>
        <section className="relative py-20 sm:py-28 lg:py-32 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1600x600.png')" }} data-ai-hint="security lock">
            <div className="absolute inset-0 bg-indigo-900/70" />
            <div className="relative z-10 px-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif">Privacy Policy</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-100">
                    Your privacy is important to us.
                </p>
            </div>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto prose prose-lg">
                <h2>Introduction</h2>
                <p>This Privacy Policy explains how NovainHealth collects, uses, and discloses information about you when you use our website, mobile application, and other online products and services.</p>

                <h2>Information We Collect</h2>
                <p>We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.</p>

                <h2>How We Use Information</h2>
                <p>We use the information we collect to provide, maintain, and improve our services, including to process transactions, develop new products, and personalize your experience.</p>
                
                <h2>Sharing of Information</h2>
                <p>We may share information about you as follows: with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf; in response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law or legal process.</p>

                <h2>Data Security</h2>
                <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>

                <h2>Your Choices</h2>
                <p>You may update, correct or delete information about you at any time by logging into your account. If you wish to delete or deactivate your account, please email us, but note that we may retain certain information as required by law or for legitimate business purposes.</p>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
