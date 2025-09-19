
import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      <LandingHeader />
      <main>
        <section className="py-20 px-4 bg-cyan-500 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold font-serif">Privacy Policy</h1>
            <p className="mt-4 text-lg">Last updated: July 23, 2024</p>
          </div>
        </section>
        
        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto prose lg:prose-xl">
                <h2>Introduction</h2>
                <p>
                    Welcome to NovainHealth. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>
                <h2>Information We Collect</h2>
                <p>
                    We may collect personal information from you such as your name, email address, phone number, and medical history when you register for an account and use our services. We also collect information automatically as you navigate through the site.
                </p>
                <h2>How We Use Your Information</h2>
                <p>
                    The information we collect is used to provide and improve our services, to communicate with you, to process payments, and to comply with legal obligations. Your medical information is shared with healthcare providers only for the purpose of your consultation.
                </p>
                <h2>Data Security</h2>
                <p>
                    We implement a variety of security measures to maintain the safety of your personal information. All sensitive information you supply is encrypted via Secure Socket Layer (SSL) technology.
                </p>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
