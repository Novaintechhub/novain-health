
import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";

export default function TermsOfService() {
  return (
    <div className="bg-white">
      <LandingHeader />
      <main>
        <section className="py-20 px-4 bg-cyan-500 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold font-serif">Terms of Service</h1>
            <p className="mt-4 text-lg">Last updated: July 23, 2024</p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto prose lg:prose-xl">
                <h2>1. Agreement to Terms</h2>
                <p>
                    By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We may modify the terms at any time, and such modifications will be effective immediately upon posting.
                </p>
                <h2>2. Our Services</h2>
                <p>
                    NovainHealth provides a platform for connecting patients with healthcare professionals for telehealth consultations. We are not a healthcare provider and do not provide medical advice. Any information provided on our platform is for informational purposes only.
                </p>
                <h2>3. User Responsibilities</h2>
                <p>
                    You are responsible for providing accurate and complete information about yourself and your medical history. You are also responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </p>
                <h2>4. Limitation of Liability</h2>
                <p>
                    NovainHealth is not liable for any direct, indirect, incidental, special, or consequential damages that result from the use of, or the inability to use, our services, including any medical advice provided by healthcare professionals on our platform.
                </p>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
