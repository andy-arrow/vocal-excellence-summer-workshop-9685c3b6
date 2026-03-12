import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { APPLICATION_DATES } from '@/constants/applicationDates';
import { format } from 'date-fns';

const ApplicationFAQ = () => {
  const notificationDate = format(APPLICATION_DATES.NOTIFICATION_DATE, 'MMMM d, yyyy');

  const faqs = [
    {
      question: "Who is Vocal Excellence for?",
      answer: "Students aged 12–21 who are serious about classical or musical theatre singing and are working toward university or conservatory applications. You don't need to have applied yet — many students come one or two years before their application year to build preparation early."
    },
    {
      question: "Do I need formal training to apply?",
      answer: "Not necessarily. While many students have formal backgrounds, we look for genuine commitment and a willingness to work hard. If you are preparing for a top programme and want serious coaching, we want to hear from you."
    },
    {
      question: "Which universities do your students go on to?",
      answer: "Our faculty have trained at and worked with programmes including Juilliard, RADA, RNCM, RAM, Guildhall, Trinity Laban, and leading European conservatories. Details of alumni outcomes will be shared with accepted applicants."
    },
    {
      question: "Is accommodation included?",
      answer: "Training and daily lunch are included. Accommodation is not, but we provide a list of recommended hotels and Airbnbs near the venue in Limassol to all accepted students."
    },
    {
      question: "What happens after I submit my application?",
      answer: `Once your application and registration deposit are submitted, you will receive a confirmation email. Faculty personally reviews every application, with final decisions released by ${notificationDate}.`
    },
    {
      question: "Can I attend if I'm under 16?",
      answer: "Yes. Students from age 12 are welcome to apply. All students under 18 will need written consent from a parent or guardian as part of the registration process."
    },
    {
      question: "Can I attend only part of the week?",
      answer: "The programme is cumulative and leads to a filmed final performance. Full attendance is required to receive your filmed audition and complete the week."
    }
  ];

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 md:p-8 border-b border-[#e5e5e5]">
        <h2 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] mb-2 md:mb-3">Your Questions, Answered</h2>
        <p className="text-[#666666] text-base md:text-lg leading-relaxed">
          Application process and what to expect.
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
            Have a question not answered here?{' '}
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
