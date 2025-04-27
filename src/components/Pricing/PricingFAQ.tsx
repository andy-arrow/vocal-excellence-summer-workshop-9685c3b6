
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { APPLICATION_DATES } from '../ApplicationTimeline';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingFAQ = () => {
  const programYear = format(APPLICATION_DATES.PROGRAM_START, 'yyyy');
  const programDates = `${format(APPLICATION_DATES.PROGRAM_START, 'MMMM d')}-${format(new Date(APPLICATION_DATES.PROGRAM_START.getTime() + 4 * 24 * 60 * 60 * 1000), 'MMMM d, yyyy')}`;
  const paymentDeadline = format(APPLICATION_DATES.TUITION_DEADLINE, 'MMMM d, yyyy');
  const programStartDate = format(APPLICATION_DATES.PROGRAM_START, 'MMMM d, yyyy');

  const faqItems = [
    {
      question: "What's included in the tuition?",
      answer: `Your €999 tuition covers everything you need for an incredible five-day experience: all lessons, workshops, one-on-one sessions, materials, and post-program resources. The only additional costs you'll need to consider are your accommodation and travel to Limassol.`
    },
    {
      question: "How does the payment plan work?",
      answer: "We've made it easy to manage the tuition payments: Start with a €100 deposit to secure your spot once you're accepted. Then, the remaining €899 is split into three payments of €299.67, which we can schedule to work best for you. All payments need to be completed before the program begins."
    },
    {
      question: "Are scholarships available?",
      answer: "Yes! We believe talent should be supported. We offer merit-based scholarships to help exceptional students join our program. Just check the scholarship box in your application, and we'll guide you through the process."
    },
    {
      question: "What's your refund policy?",
      answer: "We understand plans can change. You'll receive a full refund (minus the €100 deposit) if you need to withdraw at least 30 days before the program starts. For withdrawals closer to the start date, we'll work with you on a case-by-case basis. The deposit is non-refundable as it reserves your spot in our limited-size program."
    },
    {
      question: "Are there any hidden costs?",
      answer: "Not at all! Your €999 tuition covers everything in the program: all lessons, materials, and resources. You'll just need to plan for your travel to Limassol and accommodation during your stay."
    },
    {
      question: "What if I miss a payment deadline?",
      answer: "Life happens! If you're concerned about making a payment, just reach out to our team. We're here to help and can work with you to adjust the payment schedule so you can still participate in the program."
    },
    {
      question: "Can I transfer my spot to someone else?",
      answer: "Since we carefully select each participant to create the perfect group dynamic, spots aren't transferable. Each student goes through our application process to ensure they'll benefit from and contribute to the program."
    },
    {
      question: "When do I need to complete all payments?",
      answer: `To ensure everything's set for your arrival, all payments need to be completed by ${paymentDeadline}, two weeks before we begin on ${programStartDate}.`
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
            Everything you need to know about joining our program
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
            Have more questions about the program?{" "}
            <a href="mailto:admissions@vocalexcellence.com" className="text-apple-blue hover:underline">Get in touch with our team</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingFAQ;
