
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
  // Get the program year
  const programYear = format(APPLICATION_DATES.PROGRAM_START, 'yyyy');
  // Get formatted dates
  const programDates = `${format(APPLICATION_DATES.PROGRAM_START, 'MMMM d')}-${format(new Date(APPLICATION_DATES.PROGRAM_START.getTime() + 4 * 24 * 60 * 60 * 1000), 'MMMM d, yyyy')}`;
  const paymentDeadline = format(APPLICATION_DATES.TUITION_DEADLINE, 'MMMM d, yyyy');
  const programStartDate = format(APPLICATION_DATES.PROGRAM_START, 'MMMM d, yyyy');

  const faqItems = [
    {
      question: "What does the pricing include?",
      answer: `The €999 investment covers your entire five-day Threshold experience, including all expert-led sessions, workshops, materials, and resources. You'll also receive personalized feedback, guidance, and post-event support materials. Accommodation and travel expenses are not included.`
    },
    {
      question: "How does the payment structure work?",
      answer: "Our payment structure is designed to be flexible and manageable: 1) Initial €100 commitment fee to secure your spot upon acceptance, 2) The remaining €899 is divided into three equal payments of €299.67, which can be scheduled to suit your financial planning. All payments must be completed before the program starts."
    },
    {
      question: "Are there any scholarships or financial aid available?",
      answer: "Yes, we offer merit-based scholarships for exceptional candidates. If you'd like to be considered for a scholarship, please indicate this in your application. Our team will provide additional information about the scholarship application process."
    },
    {
      question: "What is the refund policy?",
      answer: "We offer a full refund (minus the €100 commitment fee) for cancellations made at least 30 days before the event. For cancellations made within 30 days of the event, refunds are assessed on a case-by-case basis. The commitment fee is non-refundable as it represents your dedication to participating in the program."
    },
    {
      question: "Are there any hidden costs?",
      answer: "No. We believe in complete transparency. The €999 covers the full program cost, including all sessions, materials, and resources. You'll only need to budget separately for your travel, accommodation, and personal expenses during your stay in Limassol."
    },
    {
      question: "What happens if I miss a payment deadline?",
      answer: "We understand that circumstances can vary. If you anticipate difficulty meeting a payment deadline, please contact our admissions team immediately. We can work with you to adjust the payment schedule or explore alternative arrangements to ensure your participation."
    },
    {
      question: "Can I transfer my registration to another person?",
      answer: "Due to the curated nature of our cohort and our rigorous application process, registrations are non-transferable. Each participant is carefully selected to ensure the right mix of experiences and perspectives in the room."
    },
    {
      question: "When do I need to complete all payments?",
      answer: `All payments must be completed by ${paymentDeadline}, two weeks before the program begins on ${programStartDate}.`
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
            <a href="mailto:admissions@vocalexcellence.com" className="text-apple-blue hover:underline">Contact our admissions team</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingFAQ;
