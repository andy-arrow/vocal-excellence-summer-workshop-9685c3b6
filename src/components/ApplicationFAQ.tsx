import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { 
  HelpCircle, 
  Search, 
  ChevronRight, 
  Music, 
  CreditCard, 
  Lightbulb, 
  Home, 
  MessageCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const ApplicationFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const faqCategories = [
    {
      title: "Program Essentials",
      icon: <Music className="w-4 h-4" />,
      items: [
        {
          question: "What level of experience do I need?",
          answer: "All levels welcome. We adapt to your skill level, from beginners to advanced vocalists. Most participants have some prior vocal training, but we offer specialized tracks for those just starting their vocal journey."
        },
        {
          question: "Is there an age requirement?",
          answer: "Participants must be at least 16 years old. While most attendees are between 16-30, our selection is based on talent and potential rather than age. Participants under 18 require parental consent documentation."
        }
      ]
    },
    {
      title: "Financial Details",
      icon: <CreditCard className="w-4 h-4" />,
      items: [
        {
          question: "Are scholarships available?",
          answer: "Yes. We offer several merit-based scholarships for talented vocalists. Simply check the 'Scholarship Interest' box in your application, and we'll provide details on our streamlined application process."
        },
        {
          question: "Can I pay in installments?",
          answer: "Yes, we're happy to offer an installment plan to help make attending the workshop more manageable. Here's how it works:\n\n1. **Confirming Your Place:** To secure your spot, a **€100 registration fee** is requested within **5 business days** after you receive your acceptance notification (sent on June 1, 2025). This initial fee confirms your commitment and is non-refundable.\n\n2. **Installment Schedule:** The remaining balance of €899 can then be paid in three installments, scheduled as follows:\n    *   **Installment 1:** €300 due by **June 12, 2025**.\n    *   **Installment 2:** €300 due by **June 20, 2025**.\n    *   **Installment 3:** €299 due by **June 28, 2025**.\n\n**Important Notes:**\n*   You can select this payment plan when you accept your offer.\n*   Meeting these payment dates helps us finalize arrangements for everyone and ensures your place remains confirmed.\n*   The full tuition needs to be settled by the final installment date (June 28, 2025) so everything is in order before the workshop begins on July 14, 2025.\n\nWe understand planning is important. If you anticipate any difficulty meeting a deadline, please reach out to our admissions team at [Insert Admissions Email Address] as soon as possible to discuss your situation."
        }
      ]
    },
    {
      title: "Program Content",
      icon: <Lightbulb className="w-4 h-4" />,
      items: [
        {
          question: "What repertoire will I learn?",
          answer: "You'll prepare 3-5 pieces tailored to your vocal profile across various genres including classical, contemporary, musical theater, and more. You're welcome to incorporate pieces you're currently studying."
        },
        {
          question: "How is the program structured?",
          answer: "The workshop features expert-led masterclasses, individual coaching, technical training, and collaborative performance opportunities. We maintain a careful balance of focused practice and creative exploration."
        }
      ]
    },
    {
      title: "Accommodation & Scheduling",
      icon: <Home className="w-4 h-4" />,
      items: [
        {
          question: "Is housing provided?",
          answer: "While accommodation isn't included in the workshop fee, we assist participants in finding suitable options, including preferential rates at partner hotels and curated homestay opportunities with local families."
        },
        {
          question: "What is the daily schedule?",
          answer: "Structured activities run from 9:00-16:00 with appropriate breaks. Evenings include optional practice sessions and social events, providing a balanced experience that also allows time to explore Limassol."
        }
      ]
    }
  ];

  const handleAccordionChange = (value: string) => {
    setActiveIndex(value === activeIndex ? null : value);
  };

  const filteredCategories = searchTerm.trim() === '' ? 
    faqCategories : 
    faqCategories.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.items.length > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="py-28 md:py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center bg-slate-100 text-slate-700 rounded-full py-1.5 px-3 text-sm font-medium mb-5">
              <HelpCircle className="mr-2 w-3.5 h-3.5 text-slate-500" />
              Questions & Answers
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight text-slate-900 font-outfit">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <div className="h-px w-16 bg-primary/30 rounded-full mx-auto mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
              Everything you need to know about the Vocal Excellence Workshop, meticulously answered
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 rounded-full border border-slate-200 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors bg-white shadow-sm text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <span className="sr-only">Clear search</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        </div>
          
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto"
        >
          {filteredCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              variants={itemVariants}
              className="focus-section space-y-3"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold ml-3 text-slate-800 font-outfit">{category.title}</h3>
              </div>
              
              <Accordion type="single" collapsible className="space-y-2.5">
                {category.items.map((item, index) => {
                  const itemId = `${catIndex}-${index}`;
                  return (
                    <AccordionItem 
                      key={itemId} 
                      value={itemId} 
                      className="border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow bg-white"
                    >
                      <AccordionTrigger 
                        onClick={() => handleAccordionChange(itemId)}
                        className="text-left font-medium text-base text-slate-800 hover:text-primary transition-colors px-4 py-3"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-outfit tracking-tight pr-3">{item.question}</span>
                          <ChevronRight 
                            className={`w-4 h-4 flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                              activeIndex === itemId ? 'rotate-90 text-primary' : ''
                            }`} 
                          />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 text-base pt-1 px-4 pb-4 border-t border-slate-100 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-b from-slate-50 to-white p-8 rounded-2xl max-w-3xl mx-auto border border-slate-200 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-slate-800 font-outfit mb-2">Still have questions?</h3>
              <p className="text-slate-600 mb-4 text-base">Our admissions team is ready to assist with any inquiries you may have about the program.</p>
              <a 
                href="mailto:admissions@vocalexcellence.com" 
                className="inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors group"
              >
                Contact the admissions team
                <span className="ml-1 group-hover:ml-2 transition-all duration-300">→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApplicationFAQ;
