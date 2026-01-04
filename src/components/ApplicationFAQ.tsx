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
    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 md:p-8 border-b border-[#e5e5e5]">
        <h2 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] mb-2 md:mb-3">Frequently Asked Questions</h2>
        <p className="text-[#666666] text-base md:text-lg leading-relaxed">
          Common questions about our application process and workshop.
        </p>
      </div>
      
      <div className="p-5 md:p-8">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-[#e5e5e5] rounded-lg md:rounded-xl overflow-hidden bg-[#f5f5f7]"
            >
              <AccordionTrigger className="px-4 md:px-5 py-4 hover:no-underline hover:bg-[#ebebed] data-[state=open]:bg-[#ebebed] transition-colors text-left">
                <span className="font-medium text-[#1d1d1f] text-sm md:text-base">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 md:px-5 pb-4 pt-0 text-[#666666]">
                <p className="leading-relaxed text-sm md:text-base">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-8 text-center">
          <p className="text-[#666666] text-sm md:text-base">
            Have more questions? Contact us at{' '}
            <a href="mailto:info@vocalexcellence.cy" className="text-apple-blue hover:underline">
              info@vocalexcellence.cy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFAQ;
