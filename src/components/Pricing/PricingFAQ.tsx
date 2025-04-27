
import React from 'react';
import { motion } from 'framer-motion';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What does the pricing include?",
    answer: "The €999 investment covers your entire five-day Threshold experience, including all sessions, materials, and resources. Accommodation and travel expenses are not included."
  },
  {
    question: "How does the payment structure work?",
    answer: "Once your application is approved, you'll pay a €100 commitment fee to secure your spot. The remaining €899 is divided into three equal payments of €299.67, which can be scheduled to suit your financial planning."
  },
  {
    question: "Is there a refund policy?",
    answer: "We offer a full refund (minus the €100 commitment fee) for cancellations made at least 30 days before the event. Please refer to our cancellation policy for more details."
  },
  {
    question: "Are there any hidden costs?",
    answer: "No. We believe in complete transparency. The €999 covers the full program cost. You'll only need to budget separately for your travel, accommodation, and personal expenses."
  },
  {
    question: "Are there payment plans available?",
    answer: "Yes. Our standard structure divides payments into three installments, but we're happy to discuss alternative arrangements if needed. Please contact us directly to explore options."
  }
];

const PricingFAQ = () => {
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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-apple-grey">
            Everything you need to know about our pricing and payment structure
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
            Still have questions about pricing?{" "}
            <a href="#" className="text-apple-blue hover:underline">Contact us</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingFAQ;
