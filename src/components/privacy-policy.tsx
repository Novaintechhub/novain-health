
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
                <p>This Privacy Policy explains how NovainHealth ("we," "us," or "our") collects, uses, and discloses information about you when you use our website, mobile application, and other online products and services (collectively, the "Services").</p>

                <h2>1. Information We Collect</h2>
                <h3>Information You Provide to Us</h3>
                <p>We collect information you provide directly to us, such as when you create an account, fill out a form, request a consultation, or communicate with us. This may include:</p>
                <ul>
                    <li><strong>Personal Details:</strong> Your name, email address, phone number, date of birth, and gender.</li>
                    <li><strong>Health Information:</strong> Information about your health conditions, symptoms, medical history, and prescriptions that you provide during consultations.</li>
                    <li><strong>Payment Information:</strong> Credit card details or other payment information you provide for transactions.</li>
                </ul>
                <h3>Information We Collect Automatically</h3>
                <p>When you use our Services, we may automatically collect certain information, including:</p>
                <ul>
                    <li><strong>Log Information:</strong> We log information about your use of the Services, including your IP address, browser type, access times, pages viewed, and the page you visited before navigating to our Services.</li>
                    <li><strong>Device Information:</strong> We collect information about the computer or mobile device you use to access our Services, including the hardware model, operating system and version, and unique device identifiers.</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect for various purposes, including to:</p>
                <ul>
                    <li>Provide, maintain, and improve our Services.</li>
                    <li>Facilitate consultations between you and healthcare providers.</li>
                    <li>Process transactions and send you related information, including confirmations and invoices.</li>
                    <li>Communicate with you about products, services, offers, and events offered by NovainHealth and others.</li>
                    <li>Monitor and analyze trends, usage, and activities in connection with our Services.</li>
                    <li>Personalize your online experience and provide advertisements, content, or features that match your profile or interests.</li>
                </ul>
                
                <h2>3. Sharing of Information</h2>
                <p>We may share information about you as follows or as otherwise described in this Privacy Policy:</p>
                <ul>
                    <li>With healthcare providers for the purpose of providing the Services.</li>
                    <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
                    <li>In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law, regulation, or legal process.</li>
                    <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of NovainHealth or others.</li>
                </ul>

                <h2>4. Data Security</h2>
                <p>We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. We use encryption to protect sensitive information transmitted online, and we also protect your information offline.</p>

                <h2>5. Your Choices and Rights</h2>
                <p>You have certain rights regarding your personal information. You may update, correct, or delete information about you at any time by logging into your account. If you wish to delete or deactivate your account, please email us, but note that we may retain certain information as required by law or for legitimate business purposes.</p>

                 <h2>6. Changes to This Privacy Policy</h2>
                <p>We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification).</p>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
