
"use client";

import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment by navigating to the 'Find a Doctor' page, selecting a doctor, and choosing an available time slot that works for you. Follow the on-screen instructions to confirm your booking."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take data privacy and security very seriously. All your personal and medical information is encrypted and stored securely, compliant with industry standards. For more details, please see our Privacy Policy."
  },
  {
    question: "Can I get a prescription through the app?",
    answer: "Yes, if the consulting doctor deems it medically necessary, they can issue a digital prescription which will be available in your patient dashboard."
  },
  {
    question: "What happens if I miss my appointment?",
    answer: "If you miss your appointment, you may need to reschedule. Please refer to our cancellation policy in the Terms of Service for details on refunds or rescheduling fees."
  },
  {
    question: "How do I pay for my consultation?",
    answer: "We accept various payment methods, including credit/debit cards and other digital payment options. All payments are processed through a secure payment gateway."
  }
];

export default function FAQ() {
  return (
    <div className="bg-gray-50/50">
      <LandingHeader />
      <main>
        <section className="relative py-20 sm:py-28 lg:py-32 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1600x600.png')" }} data-ai-hint="question mark">
            <div className="absolute inset-0 bg-indigo-900/70" />
            <div className="relative z-10 px-4">
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif">Frequently Asked Questions</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-indigo-100">
                    Have questions? We're here to help.
                </p>
            </div>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
