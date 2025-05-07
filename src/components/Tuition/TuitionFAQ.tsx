
import React, { useMemo } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { format } from 'date-fns';
import { APPLICATION_DATES } from '../ApplicationTimeline';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Extracted animation settings for reuse
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
  const programYear = format(APPLICATION_DATES.PROGRAM_START, 'yyyy');
  const programDates = `${format(APPLICATION_DATES.PROGRAM_START, 'MMMM d')}-${format(new Date(APPLICATION_DATES.PROGRAM_START.getTime() + 4 * 24 * 60 * 60 * 1000), 'MMMM d, yyyy')}`;
  const paymentDeadline = format(APPLICATION_DATES.TUITION_DEADLINE, 'MMMM d, yyyy');
  const programStartDate = format(APPLICATION_DATES.PROGRAM_START, 'MMMM d, yyyy');
  const earlyBirdDate = format(APPLICATION_DATES.EARLY_BIRD_DEADLINE, 'MMMM d, yyyy');
  
  // Memoize FAQ items to prevent unnecessary re-renders
  const faqItems = useMemo(() => [
    {
      question: "What's included in the tuition?",
      answer: `Your €749 tuition covers everything you need for an incredible five-day experience: personalized vocal training, workshops, one-on-one sessions with expert instructors, professional accompaniment, and comprehensive study materials. The only additional costs you'll need to consider are your accommodation and travel to Limassol.`
    },
    {
      question: "Tell me about the payment options",
      answer: `We offer flexible ways to manage your tuition that fit your needs: Start with a €100 deposit to secure your spot once you're accepted. Then, either pay the remaining balance in three equal installments of €216.33 each (totaling €749), or take advantage of our Early Bird discount of €50 by registering and paying in full by ${earlyBirdDate}, bringing your total to just €699!`
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
      question: "What's your refund policy?",
      answer: "We understand plans can change. You'll receive a full refund (minus the €100 deposit) if you need to withdraw at least 30 days before the program starts. For withdrawals closer to the start date, we'll work with you on a case-by-case basis. The deposit is non-refundable as it reserves your spot in our limited-size program."
    },
    {
      question: "What if I miss a payment deadline?",
      answer: "Life happens! If you're concerned about making a payment, just reach out to our team. We're here to help and can work with you to adjust the payment schedule so you can still participate in the program."
    },
    {
      question: "When do I need to complete all payments?",
      answer: `To ensure everything's set for your arrival, all tuition payments need to be completed by ${paymentDeadline}, two weeks before we begin on ${programStartDate}.`
    }
  ], [earlyBirdDate, paymentDeadline, programStartDate]);

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-12 md:py-20 px-6 md:px-12 bg-gradient-to-b from-[#fafafa] to-white">
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
            <p className="font-sans text-lg text-[#141414]/70 max-w-2xl mx-auto">
              Everything you need to know about joining our program
            </p>
            <div className="pt-5">
              <motion.div 
                className="h-1 w-16 bg-gradient-to-r from-[#4f6e72] to-[#6a8d91] rounded-full mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
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
                  >
                    <AccordionTrigger className="text-left font-serif text-lg px-6 py-5 hover:no-underline text-[#141414]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-base text-[#141414]/70 px-6 pb-6 pt-0 leading-relaxed">
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
            className="mt-14 text-center"
          >
            <p className="font-sans text-[#141414]/70">
              Have more questions about the program?{" "}
              <a href="mailto:admissions@vocalexcellence.com" className="text-[#4f6e72] hover:text-[#41595c] hover:underline transition-all">
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
