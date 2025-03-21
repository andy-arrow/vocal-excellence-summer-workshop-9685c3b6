
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ApplicationFAQ = () => {
  return (
    <section className="py-20 bg-apple-light/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold mb-4 text-apple-dark tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg font-sans mb-10 text-apple-blue/90 font-normal max-w-2xl mx-auto">
            Everything you need to know about the application process
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-apple-gray-light/50">
            <AccordionTrigger className="text-apple-dark hover:text-apple-blue py-4 text-left">
              What are the fees for the summer programme?
            </AccordionTrigger>
            <AccordionContent className="text-apple-dark/80 pb-6">
              <p className="mb-2">The 2025 Summer Programme fees are as follows:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Tuition: £4,500</li>
                <li>Materials and resources: £250</li>
                <li>Optional accommodation: £1,800 (includes breakfast)</li>
              </ul>
              <p className="mt-2">Financial aid and scholarship opportunities are available for eligible candidates. Payment plans can be arranged upon acceptance to the programme.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b border-apple-gray-light/50">
            <AccordionTrigger className="text-apple-dark hover:text-apple-blue py-4 text-left">
              Can I apply if I'm under 18 years old?
            </AccordionTrigger>
            <AccordionContent className="text-apple-dark/80 pb-6">
              Yes, we accept applications from students aged 16 and above. However, participants under 18 will need parental consent and must comply with additional requirements for minors. Please contact our admissions team for more information specific to your situation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b border-apple-gray-light/50">
            <AccordionTrigger className="text-apple-dark hover:text-apple-blue py-4 text-left">
              What is the acceptance rate for the programme?
            </AccordionTrigger>
            <AccordionContent className="text-apple-dark/80 pb-6">
              Our acceptance rate varies from year to year but typically ranges between 15-20% of applicants. We evaluate candidates based on talent, potential, commitment, and how well their goals align with our programme offerings. Early applications often have a slightly higher acceptance rate.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-b border-apple-gray-light/50">
            <AccordionTrigger className="text-apple-dark hover:text-apple-blue py-4 text-left">
              Do I need to be an advanced singer to apply?
            </AccordionTrigger>
            <AccordionContent className="text-apple-dark/80 pb-6">
              We welcome applications from singers at various skill levels, from intermediate to advanced. However, due to the intensive nature of the programme, a minimum of 2 years of prior vocal training or equivalent experience is required. We're looking for potential and dedication as much as current ability.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-b border-apple-gray-light/50">
            <AccordionTrigger className="text-apple-dark hover:text-apple-blue py-4 text-left">
              Can I submit my application now and upload supporting materials later?
            </AccordionTrigger>
            <AccordionContent className="text-apple-dark/80 pb-6">
              Yes, you can start your application and save your progress. However, your application will only be reviewed once all required materials have been submitted. We recommend uploading supporting materials at least 2 weeks before the final deadline to allow time for any technical issues.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-b border-apple-gray-light/50">
            <AccordionTrigger className="text-apple-dark hover:text-apple-blue py-4 text-left">
              What kind of pieces should I include in my audition recording?
            </AccordionTrigger>
            <AccordionContent className="text-apple-dark/80 pb-6">
              Your audition should include two contrasting pieces that showcase your range, technique, and expressiveness. Ideally, these pieces should be in different styles or languages. Choose repertoire that you are comfortable with and that represents your current abilities well. Each piece should be 3-5 minutes in length.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border-b border-apple-gray-light/50">
            <AccordionTrigger className="text-apple-dark hover:text-apple-blue py-4 text-left">
              Are there any scholarships available?
            </AccordionTrigger>
            <AccordionContent className="text-apple-dark/80 pb-6">
              <p className="mb-2">Yes, we offer several types of scholarships:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Merit-based scholarships (determined by your audition and application)</li>
                <li>Need-based financial aid (requires additional financial documentation)</li>
                <li>Diversity and inclusion scholarships</li>
                <li>Country-specific scholarships for international students</li>
              </ul>
              <p className="mt-2">To be considered for scholarships, check the appropriate box in your application form and complete the additional scholarship application if required.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border-b border-apple-gray-light/50">
            <AccordionTrigger className="text-apple-dark hover:text-apple-blue py-4 text-left">
              What is the daily schedule like during the programme?
            </AccordionTrigger>
            <AccordionContent className="text-apple-dark/80 pb-6">
              <p className="mb-2">The programme runs Monday through Saturday, with Sundays off. A typical day includes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>9:00-10:30 AM: Vocal technique/group warm-up</li>
                <li>10:45-12:15 PM: Repertoire study or individual lessons</li>
                <li>12:15-1:30 PM: Lunch break</li>
                <li>1:30-3:00 PM: Masterclass or music theory/history</li>
                <li>3:15-5:00 PM: Performance practice or ensemble rehearsal</li>
                <li>5:00-7:00 PM: Personal practice time</li>
                <li>Evening activities (concerts, social events, etc.) occur 2-3 times per week</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9" className="border-b border-apple-gray-light/50">
            <AccordionTrigger className="text-apple-dark hover:text-apple-blue py-4 text-left">
              I have more questions. How can I contact the admissions team?
            </AccordionTrigger>
            <AccordionContent className="text-apple-dark/80 pb-6">
              <p>You can reach our admissions team in several ways:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Email: admissions@vocalexcellence.com</li>
                <li>Phone: +44 (0)20 7123 4567</li>
                <li>Virtual Office Hours: Every Tuesday and Thursday, 10 AM - 12 PM (UK time) via Zoom (appointment needed)</li>
              </ul>
              <p className="mt-2">We aim to respond to all inquiries within 2 business days.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-12 bg-white p-8 rounded-xl text-center">
          <h3 className="text-xl font-semibold text-apple-dark mb-4">Still Have Questions?</h3>
          <p className="text-apple-dark/80 mb-6">Our admissions team is here to help you through every step of the application process.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:admissions@vocalexcellence.com" className="primary-button bg-apple-blue text-white">
              Email Admissions
            </a>
            <a href="#" className="secondary-button bg-apple-gray-light/50 text-apple-dark">
              Join an Info Session
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationFAQ;
