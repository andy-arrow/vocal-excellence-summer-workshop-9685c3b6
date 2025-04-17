
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Star, HelpCircle, Sparkles, Award, Clock, Home, CreditCard, Music, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const ApplicationFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  
  const faqCategories = [
    {
      title: "Program Basics",
      icon: <Music className="w-5 h-5" />,
      items: [
        {
          question: "What level of experience do I need?",
          answer: "All levels welcome! Whether you've been singing for years or just starting out, our workshop adapts to your skill level. Most participants have had at least some vocal training, but we have special tracks for beginners too."
        },
        {
          question: "Is there an age requirement?",
          answer: "You need to be at least 16 years old. Most participants are between 16-30, but we evaluate based on your talent and energy, not your age. Participants under 18 will need parental consent forms."
        }
      ]
    },
    {
      title: "Financial Info",
      icon: <CreditCard className="w-5 h-5" />,
      items: [
        {
          question: "Are there scholarships available?",
          answer: "Absolutely! We offer several scholarships for talented young artists. Check the 'Scholarship' box on your application form and we'll send you details about the simple application process."
        },
        {
          question: "Can I pay in installments?",
          answer: "Yes! We offer flexible payment plans spread across 3-6 months with no interest. Just select the payment plan option when you accept your admission offer."
        }
      ]
    },
    {
      title: "Program Content",
      icon: <Lightbulb className="w-5 h-5" />,
      items: [
        {
          question: "What songs will I learn?",
          answer: "You'll prepare 3-5 pieces in different styles that match your voice and interests. We cover pop, rock, musical theater, R&B, and more! You're welcome to bring songs you're already working on."
        },
        {
          question: "How is the program structured for young artists?",
          answer: "Our workshop features dynamic learning sessions with expert feedback, hands-on vocal training, visual learning aids, and collaborative performance opportunities. We balance focused practice with creative exploration to keep everyone engaged and inspired."
        }
      ]
    },
    {
      title: "Practical Details",
      icon: <Home className="w-5 h-5" />,
      items: [
        {
          question: "Is housing provided?",
          answer: "While housing isn't included in the workshop fee, we help you find affordable options nearby, including special rates at partner hotels and homestay opportunities with local families."
        },
        {
          question: "How much free time will I have?",
          answer: "The workshop is intensive but balanced. Structured activities run from 9am-4pm with a long lunch break. Evenings include optional jam sessions and social events, but you'll have time to explore the beautiful Cyprus coastline too!"
        }
      ]
    }
  ];

  const handleAccordionChange = (value: string) => {
    setActiveIndex(value === activeIndex ? null : value);
  };

  return (
    <section className="py-24 md:py-28 bg-gradient-to-b from-white to-primary/5 noise-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center bg-energy-purple/15 text-energy-purple rounded-full py-2 px-4 text-sm font-medium mb-5 shadow-sm">
            <HelpCircle className="mr-2 w-4 h-4" />
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-outfit tracking-tight text-gray-900">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-energy-purple to-energy-pink rounded-full mx-auto mb-6"></div>
          <p className="text-foreground/80 max-w-2xl mx-auto text-lg leading-relaxed">
            Everything you need to know about our vocal workshop in bite-sized answers
          </p>
        </div>
          
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {faqCategories.map((category, catIndex) => (
            <MotionDiv
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="focus-section"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-energy-purple/20 to-energy-pink/20 flex items-center justify-center text-energy-purple shadow-md">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold ml-4 text-gray-800 font-outfit tracking-tight">{category.title}</h3>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                {category.items.map((item, index) => {
                  const itemId = `${catIndex}-${index}`;
                  return (
                    <AccordionItem 
                      key={itemId} 
                      value={itemId} 
                      className="border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md bg-white"
                    >
                      <AccordionTrigger 
                        onClick={() => handleAccordionChange(itemId)}
                        className="text-left font-medium text-lg text-gray-800 hover:text-energy-purple data-[state=open]:text-energy-purple transition-colors px-5 py-4"
                      >
                        <div className="flex items-center">
                          <Star 
                            className={`w-5 h-5 mr-3 transition-colors ${activeIndex === itemId ? 'text-energy-pink' : 'text-energy-pink/50'}`}
                          />
                          <span className="font-outfit tracking-tight">{item.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 text-base pt-2 px-6 pb-5 border-t border-gray-100 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </MotionDiv>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-gradient-to-r from-energy-purple/10 to-energy-pink/10 p-6 md:p-8 rounded-2xl max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-energy-purple to-energy-pink flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 font-outfit mb-2">Still have questions?</h3>
              <p className="text-gray-600 mb-4">If you couldn't find what you're looking for, please don't hesitate to contact us.</p>
              <a 
                href="mailto:info@vocalexcellence.com" 
                className="inline-flex items-center font-medium text-energy-purple hover:text-energy-purple/80 transition-colors"
              >
                Email our support team <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationFAQ;
