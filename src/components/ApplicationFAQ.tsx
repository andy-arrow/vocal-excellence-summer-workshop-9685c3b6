import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { APPLICATION_DATES } from '@/constants/applicationDates';
import { format } from 'date-fns';

const ApplicationFAQ = () => {
  const notificationDate = format(APPLICATION_DATES.NOTIFICATION_DATE, 'MMMM d, yyyy');
  const earlyBirdDeadline = format(APPLICATION_DATES.EARLY_BIRD_DEADLINE, 'MMMM d, yyyy');

  const faqs = [
    {
      question: "Do I need formal conservatory training to apply?",
      answer: "Not necessarily. While many of our students have formal backgrounds, we prioritize potential, passion, and a willingness to learn. If you are serious about improving your voice, we want to hear from you."
    },
    {
      question: "Is accommodation included?",
      answer: "Tuition covers all training and daily lunch, but accommodation is not included. We can provide a list of recommended hotels and Airbnbs near the venue in Limassol upon acceptance."
    },
    {
      question: "What happens after I submit my application?",
      answer: `You will receive a confirmation email immediately. Our faculty reviews applications on a rolling basis, with final decisions released by ${notificationDate}.`
    },
    {
      question: "Do I need to submit a recommendation letter?",
      answer: "No, recommendation letters are not required for this workshop."
    },
    {
      question: "Is there financial aid available?",
      answer: `We offer a flexible payment plan (pay in 3 installments) and an Early Bird discount if you register before ${earlyBirdDeadline}.`
    },
    {
      question: "Can I attend only part of the workshop?",
      answer: "Because the curriculum is designed as a cumulative, intensive process leading to a final performance, full attendance is required to get the most out of the experience."
    }
  ];

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-sm overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="p-6 sm:p-8 md:p-10 border-b border-apple-border/10">
        <h2 className="text-2xl md:text-3xl font-semibold text-apple-text mb-4">Frequently Asked Questions</h2>
        <p className="text-apple-grey text-lg leading-relaxed">
          Common questions about our application process and workshop.
        </p>
      </div>
      
      <div className="p-6 sm:p-8 md:p-10">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-apple-border/30 rounded-xl overflow-hidden bg-apple-light shadow-sm"
            >
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-apple-border/10 data-[state=open]:bg-apple-border/10 transition-colors">
                <span className="text-left font-medium text-apple-text">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-5 text-apple-grey">
                <p className="leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-10 text-center">
          <p className="text-apple-grey">
            Have more questions? Contact us at{' '}
            <a href="mailto:info@vocalexcellence.cy" className="text-apple-blue hover:underline">
              info@vocalexcellence.cy
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationFAQ;
