
import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="bg-white">
      <LandingHeader />
      <main>
        <section className="py-20 px-4 text-center bg-cyan-500 text-white">
          <h1 className="text-5xl font-bold font-serif">About NovainHealth</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Your trusted partner in accessible and professional healthcare, available anytime, anywhere.
          </p>
        </section>
        
        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                    <p className="mt-4 text-gray-600">
                        Our mission is to make professional medical assistance accessible to all by connecting patients with certified doctors and healthcare professionals anytime, anywhere. We believe that quality healthcare is a fundamental right, and we leverage technology to break down barriers of distance, time, and cost.
                    </p>
                    <p className="mt-4 text-gray-600">
                        We are dedicated to providing a seamless, secure, and user-friendly platform that empowers individuals to take control of their health journey with confidence.
                    </p>
                </div>
                <div>
                    <Image src="https://placehold.co/600x400.png" alt="Medical professionals collaborating" width={600} height={400} className="rounded-lg shadow-lg" data-ai-hint="medical team meeting" />
                </div>
            </div>
        </section>

      </main>
      <LandingFooter />
    </div>
  );
}
