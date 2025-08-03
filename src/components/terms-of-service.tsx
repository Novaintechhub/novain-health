
"use client";

import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";

export default function TermsOfService() {
  return (
    <div className="bg-gray-50/50">
      <LandingHeader />
      <main>
        <section className="relative py-20 sm:py-28 lg:py-32 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1600x600.png')" }} data-ai-hint="legal document">
            <div className="absolute inset-0 bg-indigo-900/70" />
            <div className="relative z-10 px-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif">Terms of Service</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-100">
                    Last Updated: July 24, 2024
                </p>
            </div>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto prose prose-lg">
                <h2>1. Acceptance of Terms</h2>
                <p>By accessing and using NovainHealth ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>

                <h2>2. Description of Service</h2>
                <p>NovainHealth provides a platform for connecting patients with healthcare professionals for consultations and related services. The service is provided "as is" and we assume no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.</p>

                <h2>3. User Responsibilities</h2>
                <p>You are responsible for your own communications and are responsible for the consequences of their posting. You must not, in connection with the Service, do any of the following: post materials that are copyrighted, unless you are the copyright owner or have the permission of the copyright owner to post it; post material that reveals trade secrets, unless you own them or have the permission of the owner.</p>
                
                <h2>4. Medical Disclaimer</h2>
                <p>The content on NovainHealth is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>

                <h2>5. Privacy Policy</h2>
                <p>Our Privacy Policy, which sets out how we will use your information, can be found at <a href="/privacy-policy">Privacy Policy</a>. By using this Website, you consent to the processing described therein and warrant that all data provided by you is accurate.</p>

                <h2>6. Termination</h2>
                <p>We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

                <h2>7. Changes to Terms</h2>
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
