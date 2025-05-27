
import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { APPLICATION_DATES } from '@/constants/applicationDates';
import { format } from 'date-fns';

const ApplicationFAQ = () => {
  const deadlineDate = format(APPLICATION_DATES.DEADLINE, 'MMMM d, yyyy');
  const notificationDate = format(APPLICATION_DATES.NOTIFICATION_DATE, 'MMMM d, yyyy');
  const tuitionDeadline = format(APPLICATION_DATES.TUITION_DEADLINE, 'MMMM d, yyyy');
  const programYear = format(APPLICATION_DATES.PROGRAM_START, 'yyyy');

  const faqs = [
    {
      question: "What are the eligibility requirements for the workshop?",
      answer: "Applicants must be at least 16 years old. While we welcome singers of all experience levels, we look for a demonstrated passion for vocal development and a willingness to engage deeply with the workshop curriculum."
    },
    {
      question: "Do I need to have formal vocal training to apply?",
      answer: "No, formal training is not required. We welcome singers with a range of backgrounds, from self-taught vocalists to those with extensive classical training. What matters most is your enthusiasm and commitment to developing your vocal skills."
    },
    {
      question: "What is the total cost of the workshop?",
      answer: "The total tuition is €749, which includes everything: all training sessions, materials, lunch, and the €100 registration fee. There are no additional fees beyond this amount. We also offer an early bird discount of €50 if you register and pay in full before the deadline."
    },
    {
      question: "How does the payment structure work?",
      answer: "You can either pay the full €749 upfront or use our payment plan. The payment plan includes a €100 registration fee (which is part of the total tuition, not additional) followed by three equal installments of €216.33 each. The registration fee secures your spot and goes directly toward your total tuition cost."
    },
    {
      question: "Is there any financial aid available for the workshop?",
      answer: "Yes, we offer a limited number of scholarships based on financial need and artistic merit. To be considered, check the scholarship interest box in the application form. If selected, we will contact you with further instructions."
    },
    {
      question: "Do I need to include a recommendation letter with my application?",
      answer: "A recommendation letter is optional but can strengthen your application. Consider including one from a vocal coach, music teacher, or other professional who can speak to your musical abilities and commitment."
    },
    {
      question: "What happens after I submit my application?",
      answer: `After the application deadline (${deadlineDate}), our faculty will review all submissions. Acceptance notifications will be sent out by ${notificationDate}. If accepted, you'll need to confirm your participation and arrange payment by ${tuitionDeadline}.`
    },
    {
      question: "Is accommodation provided during the workshop?",
      answer: "Accommodation is not included in the tuition fee. However, we can provide recommendations for local accommodations at various price points, including special rates negotiated with nearby hotels and homestay options."
    },
    {
      question: "What dietary options will be available during the workshop?",
      answer: "We cater to various dietary requirements including vegetarian, vegan, gluten-free, and lactose-free options. Please specify your dietary needs in the application form so we can make appropriate arrangements."
    },
    {
      question: "Can I attend only part of the workshop?",
      answer: "The workshop is designed as an immersive experience, and we strongly encourage attendance for the full duration. Partial attendance may be considered in exceptional circumstances, but the full tuition fee still applies."
    }
  ];

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-sm overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="p-8 md:p-10 border-b border-apple-border/10">
        <h2 className="text-2xl md:text-3xl font-semibold text-apple-text mb-4">Frequently Asked Questions</h2>
        <p className="text-apple-grey text-lg leading-relaxed">
          Find answers to common questions about our application process and workshop.
        </p>
      </div>
      
      <div className="p-8 md:p-10">
        <Accordion type="single" collapsible className="space-y-5">
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
