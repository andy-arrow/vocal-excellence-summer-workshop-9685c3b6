import React from 'react';
import { motion } from 'framer-motion';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingFAQ = () => {
  const faqItems = [
    {
      question: "What's included in the program tuition?",
      answer: "Your tuition covers everything you need for an enriching five-day experience: expert-led workshops, personal coaching sessions, performance opportunities, and study materials. You'll have access to world-class instructors, accompanists, and specialized workshops. The only additional costs to consider are your travel and accommodation."
    },
    {
      question: "How do the payment plans work?",
      answer: "We've designed our payment structure to be student-friendly: Start with a €100 deposit to secure your spot once you're accepted, then spread the remaining €899 over three manageable payments of €299.67. We can work with you to set up a schedule that fits your needs."
    },
    {
      question: "Are there any scholarships available?",
      answer: "Absolutely! We believe talent should be nurtured regardless of financial circumstances. We offer merit-based scholarships for exceptional candidates. Just indicate your interest in financial aid during your application, and we'll guide you through the process."
    },
    {
      question: "What happens if I need to cancel?",
      answer: "Life happens, and we understand that plans can change. If you need to cancel more than 30 days before the program starts, we'll refund your full tuition minus the €100 deposit. For cancellations within 30 days, we'll work with you to find the best solution. The deposit helps us maintain our commitment to keeping our class sizes small and personal."
    },
    {
      question: "Are there any hidden fees?",
      answer: "Not at all! We believe in complete transparency. Your €999 tuition covers all program activities, materials, and resources. You'll only need to plan for your travel to Limassol and accommodation during your stay."
    },
    {
      question: "What if I'm having trouble with a payment deadline?",
      answer: "We're here to help! If you're facing any challenges with the payment schedule, just reach out to our friendly admissions team. We can explore different payment arrangements to ensure you can participate in the program."
    },
    {
      question: "Can someone else take my place if I can't attend?",
      answer: "Since we carefully select each participant to create a balanced and supportive learning environment, we can't transfer registrations. However, if you can't attend, please let us know as soon as possible so we can work with you to find the best solution."
    },
    {
      question: "When do I need to complete all payments?",
      answer: "To ensure everything's ready for your arrival, all payments should be completed two weeks before the program begins. This gives us time to prepare all your materials and arrange for your individual sessions."
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium text-apple-text mb-6">
            Common Questions
          </h2>
          <p className="text-lg text-apple-grey">
            Here to help you understand everything about joining our program
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-lg font-medium text-apple-text py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-apple-grey text-lg pb-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-apple-grey">
            Have other questions about joining us?{" "}
            <a href="mailto:admissions@vocalexcellence.com" className="text-apple-blue hover:underline">
              Our admissions team is here to help
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingFAQ;
