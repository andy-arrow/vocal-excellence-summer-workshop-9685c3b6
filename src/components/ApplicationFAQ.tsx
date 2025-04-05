
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Star, HelpCircle, Sparkles, Award, Clock, Home, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const ApplicationFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  
  const faqCategories = [
    {
      title: "Program Basics",
      icon: <HelpCircle className="w-5 h-5" />,
      items: [
        {
          question: "What level of experience do I need?",
          answer: "All levels welcome! Whether you've been singing for years or just starting out, our program adapts to your skill level. Most participants have had at least some vocal training, but we have special tracks for beginners too."
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
          answer: "Absolutely! We offer several scholarships specifically for neurodivergent artists. Check the 'Scholarship' box on your application form and we'll send you details about the simple application process."
        },
        {
          question: "Can I pay in installments?",
          answer: "Yes! We offer flexible payment plans spread across 3-6 months with no interest. Just select the payment plan option when you accept your admission offer."
        }
      ]
    },
    {
      title: "Program Content",
      icon: <Sparkles className="w-5 h-5" />,
      items: [
        {
          question: "What songs will I learn?",
          answer: "You'll prepare 3-5 pieces in different styles that match your voice and interests. We cover pop, rock, musical theater, R&B, and more! You're welcome to bring songs you're already working on."
        },
        {
          question: "How is the program structured for people with ADHD?",
          answer: "Our program features short, focused sessions (30-45 minutes) with frequent breaks, physical movement incorporated into vocal training, visual learning aids, and immediate feedback. We also offer quiet spaces if you need a sensory break."
        }
      ]
    },
    {
      title: "Practical Details",
      icon: <Home className="w-5 h-5" />,
      items: [
        {
          question: "Is housing provided?",
          answer: "While housing isn't included in the program fee, we help you find affordable options nearby, including special rates at partner hotels and homestay opportunities with local families."
        },
        {
          question: "How much free time will I have?",
          answer: "The program is intensive but balanced. Structured activities run from 9am-4pm with a long lunch break. Evenings include optional jam sessions and social events, but you'll have time to explore the beautiful Cyprus coastline too!"
        }
      ]
    }
  ];

  const handleAccordionChange = (value: string) => {
    setActiveIndex(value === activeIndex ? null : value);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-accent/5 noise-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center bg-accent/10 text-accent rounded-full py-1 px-3 text-sm font-medium mb-4">
            <HelpCircle className="mr-1 w-4 h-4" />
            Common Questions
          </span>
          <h2 className="section-title text-center">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="decorative-line mx-auto"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Everything you need to know about our vocal program in bite-sized answers
          </p>
        </div>
          
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {faqCategories.map((category, catIndex) => (
            <MotionDiv
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              viewport={{ once: true }}
              className="focus-section"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold ml-3 text-foreground">{category.title}</h3>
              </div>
              
              <Accordion type="single" collapsible className="space-y-3">
                {category.items.map((item, index) => {
                  const itemId = `${catIndex}-${index}`;
                  return (
                    <AccordionItem 
                      key={itemId} 
                      value={itemId} 
                      className="border border-border rounded-xl overflow-hidden mb-2 shadow-sm"
                    >
                      <AccordionTrigger 
                        onClick={() => handleAccordionChange(itemId)}
                        className="text-left font-medium text-foreground hover:text-primary py-4 px-4 hover:no-underline data-[state=open]:text-primary transition-colors"
                      >
                        <div className="flex items-center">
                          <Star 
                            className={`w-4 h-4 mr-2 transition-colors ${activeIndex === itemId ? 'text-accent' : 'text-accent/50'}`}
                          />
                          <span>{item.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground/80 pt-1 px-4 pb-4 border-t border-border/50">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationFAQ;
