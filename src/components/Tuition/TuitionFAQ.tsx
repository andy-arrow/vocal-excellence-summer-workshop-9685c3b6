import React, { useMemo } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { format } from 'date-fns';
import { APPLICATION_DATES } from '@/constants/applicationDates';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.05,
      delayChildren: 0.1 
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

const TuitionFAQ = () => {
  const paymentDeadline = format(APPLICATION_DATES.TUITION_DEADLINE, 'MMMM d, yyyy');
  const earlyBirdDate = format(APPLICATION_DATES.EARLY_BIRD_DEADLINE, 'MMMM d, yyyy');
  
  const faqItems = useMemo(() => [
    {
      question: "Tell me about the payment options.",
      answer: `We have designed our payment structure to be as accessible as possible.\n\nStandard Plan: Secure your spot with a €100 deposit upon acceptance. The remaining balance is split into three manageable installments of €216.\n\nEarly Bird Advantage: Register and pay in full by ${earlyBirdDate} to receive a €50 discount (Total: €699).`
    },
    {
      question: "What is included in the tuition?",
      answer: "Your tuition covers the complete educational experience: all private lessons, masterclasses, acting workshops, Alexander Technique sessions, accompanist fees, 4K video recordings of your performances, and daily lunch. Accommodation and travel to Cyprus are not included."
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes. The €100 registration deposit is non-refundable. However, tuition installment payments are refundable if you withdraw at least 30 days prior to the start of the program."
    },
    {
      question: "How does the Early Bird discount work?",
      answer: `Register and pay your full tuition by ${earlyBirdDate} to receive our Early Bird discount of €50, reducing your total program cost from €749 to €699. This discount is only available for those who register before the deadline and pay the full amount upfront.`
    },
    {
      question: "Are scholarships available?",
      answer: "Absolutely! We believe talent deserves support. We offer merit-based scholarships to help exceptional students join our program. Simply check the scholarship box in your application, and we'll guide you through the process."
    },
    {
      question: "What if I miss a payment deadline?",
      answer: "Life happens! If you're concerned about making a payment, just reach out to our team. We're here to help and can work with you to adjust the payment schedule so you can still participate in the program."
    },
    {
      question: "When do I need to complete all payments?",
      answer: `To ensure everything's set for your arrival, all tuition payments need to be completed by ${paymentDeadline}, two weeks before we begin.`
    }
  ], [earlyBirdDate, paymentDeadline]);

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-16 md:py-20 px-6 md:px-12 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#141414] mb-4">
              Common Questions
            </h2>
            <p className="font-sans text-lg text-[#666666] max-w-2xl mx-auto">
              Everything you need to know about joining our program
            </p>
            <div className="pt-5">
              <div className="h-px w-16 bg-[#4f6e72] mx-auto" />
            </div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-3"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <motion.div key={i} variants={itemVariants} custom={i}>
                  <AccordionItem 
                    value={`item-${i}`} 
                    className="mb-4 border border-[#eaeaea] rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    data-testid={`faq-item-${i}`}
                  >
                    <AccordionTrigger className="text-left font-serif text-lg px-6 py-5 hover:no-underline text-[#141414]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-base text-[#555555] px-6 pb-6 pt-0 leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 text-center"
          >
            <p className="font-sans text-[#666666]">
              Have more questions about the program?{" "}
              <a href="mailto:info@vocalexcellence.cy" className="text-[#4f6e72] hover:text-[#41595c] hover:underline transition-all">
                Get in touch with our team
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default React.memo(TuitionFAQ);
