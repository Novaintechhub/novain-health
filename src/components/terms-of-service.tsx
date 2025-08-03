
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
                <p>Welcome to NovainHealth. These Terms of Service ("Terms") govern your use of our website, mobile applications, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.</p>
                
                <h2>1. Acceptance of Terms</h2>
                <p>By creating an account or using our Services, you confirm that you are at least 18 years old and legally capable of entering into a binding contract. You accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, you must not use our Services.</p>

                <h2>2. Description of Service</h2>
                <p>NovainHealth provides a telehealth platform connecting patients with licensed healthcare professionals ("Providers") for virtual consultations and related services. Our services include appointment scheduling, secure messaging, and access to medical information. The service is provided "as is," and we assume no responsibility for the timeliness, deletion, or mis-delivery of user communications.</p>

                <h3>2.1. Medical Disclaimer</h3>
                <p><strong>NovainHealth does not provide medical advice.</strong> The platform is for informational and communicational purposes only and is not a substitute for professional medical diagnosis, advice, or treatment. Always seek the advice of your physician or another qualified health provider with any questions you may have regarding a medical condition. <strong>If you are experiencing a medical emergency, call your local emergency number immediately.</strong></p>

                <h2>3. User Responsibilities and Conduct</h2>
                <p>You are responsible for all activities that occur under your account. You agree to:</p>
                <ul>
                    <li>Provide accurate, current, and complete information during the registration process and to update such information to keep it accurate.</li>
                    <li>Maintain the security of your password and identification.</li>
                    <li>Not post or transmit any material that is knowingly false, defamatory, abusive, harassing, or obscene.</li>
                    <li>Not impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                </ul>

                <h2>4. Privacy Policy</h2>
                <p>Our Privacy Policy, which details how we collect and use your information, is available at <a href="/privacy-policy">Privacy Policy</a>. By using our Services, you consent to the data practices described in the Privacy Policy.</p>

                <h2>5. Consultations and Prescriptions</h2>
                <p>Providers on our platform may, in their professional judgment, issue prescriptions based on their consultations. You agree that you will use any prescriptions obtained through our Services as directed. NovainHealth is not responsible for the actions or inactions of any Provider when it comes to prescription writing or medical advice.</p>

                <h2>6. Fees and Payment</h2>
                <p>You agree to pay all fees or charges to your account in accordance with the fees, charges, and billing terms in effect at the time a fee or charge is due and payable. You must provide a valid credit card or other payment method to pay for services.</p>

                <h2>7. Termination of Service</h2>
                <p>We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>

                <h2>8. Limitation of Liability</h2>
                <p>To the fullest extent permitted by applicable law, NovainHealth shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.</p>

                <h2>9. Changes to Terms</h2>
                <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                
                <h2>10. Contact Information</h2>
                <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@novainhealth.com">support@novainhealth.com</a>.</p>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
