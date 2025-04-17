
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
          answer: (
            <div className="space-y-6">
              <p className="text-slate-600">
                Yes, we're happy to offer an installment plan to help make attending the workshop more manageable. Here's how it works:
              </p>
              
              <div className="space-y-4">
                <div className="rounded-lg border border-violet-200 bg-violet-50/50 p-4">
                  <h4 className="font-semibold text-violet-900 mb-2">1. Confirming Your Place</h4>
                  <p className="text-violet-700">
                    To secure your spot, a <span className="font-semibold">€100 registration fee</span> is requested within <span className="font-semibold">5 business days</span> after you receive your acceptance notification (sent on June 1, 2025). This initial fee confirms your commitment and is non-refundable.
                  </p>
                </div>

                <div className="rounded-lg border border-violet-200 bg-violet-50/50 p-4">
                  <h4 className="font-semibold text-violet-900 mb-2">2. Installment Schedule</h4>
                  <p className="text-violet-700 mb-3">
                    The remaining balance of €899 can then be paid in three installments:
                  </p>
                  <div className="space-y-2 pl-4">
                    <div className="flex items-center gap-2 text-violet-700">
                      <div className="h-1.5 w-1.5 rounded-full bg-violet-400"></div>
                      <span><strong>Installment 1:</strong> €300 due by <strong>June 12, 2025</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-violet-700">
                      <div className="h-1.5 w-1.5 rounded-full bg-violet-400"></div>
                      <span><strong>Installment 2:</strong> €300 due by <strong>June 20, 2025</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-violet-700">
                      <div className="h-1.5 w-1.5 rounded-full bg-violet-400"></div>
                      <span><strong>Installment 3:</strong> €299 due by <strong>June 28, 2025</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
                <h4 className="font-semibold text-amber-900 flex items-center gap-2 mb-3">
                  <span className="text-amber-500"><HelpCircle className="w-5 h-5" /></span>
                  Important Notes
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-amber-700">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span>You can select this payment plan when you accept your offer.</span>
                  </li>
                  <li className="flex items-start gap-2 text-amber-700">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span>Meeting these payment dates helps us finalize arrangements for everyone and ensures your place remains confirmed.</span>
                  </li>
                  <li className="flex items-start gap-2 text-amber-700">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-2"></div>
                    <span>The full tuition needs to be settled by the final installment date (June 28, 2025) so everything is in order before the workshop begins on July 14, 2025.</span>
                  </li>
                </ul>
              </div>

              <div className="text-slate-600 italic border-t border-slate-200 pt-4">
                <p>
                  We understand planning is important. If you anticipate any difficulty meeting a deadline, please reach out to our admissions team at{' '}
                  <a href="mailto:admissions@vocalexcellence.com" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">
                    admissions@vocalexcellence.com
                  </a>
                  {' '}as soon as possible to discuss your situation.
                </p>
              </div>
            </div>
          )
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

  // Update the filtering logic to handle both string and JSX Element cases
  const filteredCategories = searchTerm.trim() === '' ? 
    faqCategories : 
    faqCategories.map(category => ({
      ...category,
      items: category.items.filter(item => {
        const questionMatch = item.question.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Check if answer is a string before calling toLowerCase
        const answerMatch = typeof item.answer === 'string' 
          ? item.answer.toLowerCase().includes(searchTerm.toLowerCase())
          : false; // If it's a React element, we can't search inside it easily
          
        return questionMatch || answerMatch;
      })
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
            <span className="inline-flex items-center bg-slate-200 text-slate-800 rounded-full py-1.5 px-3 text-sm font-medium mb-5">
              <HelpCircle className="mr-2 w-3.5 h-3.5 text-slate-600" />
              Questions & Answers
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tight text-slate-900 font-outfit">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <div className="h-px w-16 bg-primary/50 rounded-full mx-auto mb-6"></div>
            <p className="text-slate-800 max-w-2xl mx-auto text-lg leading-relaxed mb-10 font-medium">
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
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 rounded-full border border-slate-300 focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors bg-white shadow-sm text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
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
                <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary shadow-sm">
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
                            className={`w-4 h-4 flex-shrink-0 text-slate-500 transition-transform duration-300 ${
                              activeIndex === itemId ? 'rotate-90 text-primary' : ''
                            }`} 
                          />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-700 text-base pt-1 px-4 pb-4 border-t border-slate-100 leading-relaxed font-medium">
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
          className="mt-20 bg-gradient-to-b from-slate-50 to-white p-8 rounded-2xl max-w-3xl mx-auto border border-slate-300 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-slate-800 font-outfit mb-2">Still have questions?</h3>
              <p className="text-slate-700 mb-4 text-base font-medium">Our admissions team is ready to assist with any inquiries you may have about the program.</p>
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
