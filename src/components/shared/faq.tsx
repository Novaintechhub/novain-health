
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
    answer: "You can book an appointment by navigating to the 'Find a Doctor' page, selecting a doctor, and choosing an available time slot that works for you. You will then be prompted to provide some details about your condition before confirming."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take data privacy and security very seriously. Our platform is HIPAA compliant, and all your personal and medical information is encrypted and stored securely."
  },
  {
    question: "What happens if I miss my appointment?",
    answer: "If you miss your appointment, it will be marked as a 'no-show'. Depending on the doctor's policy, you may be charged a cancellation fee. Please try to cancel or reschedule at least 24 hours in advance."
  }
]

export default function FAQ() {
  return (
    <div className="bg-gray-50/50">
      <LandingHeader />
      <main>
        <section className="py-20 px-4 text-center bg-cyan-500 text-white">
          <h1 className="text-5xl font-bold font-serif">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg">Find answers to common questions about NovainHealth.</p>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
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
