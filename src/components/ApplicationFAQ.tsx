
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const ApplicationFAQ = () => {
  const faqItems = [
    {
      question: "What level of experience do I need to apply?",
      answer: "We welcome singers of various levels, from advanced students to early-career professionals. The most important qualities are dedication to vocal development and openness to learning. Typically, participants have had at least 2-3 years of formal voice training."
    },
    {
      question: "Is there a specific age requirement?",
      answer: "Participants must be at least 18 years old. Our program typically attracts singers between 18 and 35, but we evaluate all applications based on talent and potential rather than age."
    },
    {
      question: "Are there scholarships available?",
      answer: "Yes, we offer a limited number of merit-based and need-based scholarships. To be considered, please indicate your interest in financial assistance on your application form and complete the scholarship section."
    },
    {
      question: "What repertoire should I prepare for the program?",
      answer: "Once accepted, you'll receive guidance on preparing 3-5 pieces in different languages and styles that suit your voice type. These will be used in masterclasses and coaching sessions. You're welcome to bring additional repertoire you'd like to work on."
    },
    {
      question: "Is accommodation provided during the program?",
      answer: "Accommodation is not included in the program fee. However, we can provide recommendations for affordable housing options near the venue, including university dormitories and apartments."
    }
  ];

  return (
    <section className="py-16 md:py-20 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-light mb-8 text-gray-800">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 pb-2">
                <AccordionTrigger className="text-left font-serif font-light text-gray-800 hover:text-gray-900 py-3 hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 font-light pt-1">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ApplicationFAQ;
