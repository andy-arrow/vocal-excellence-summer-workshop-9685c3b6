
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { APPLICATION_DATES } from '../ApplicationTimeline';
import { Button } from '@/components/ui/button';

const TuitionTiers = () => {
  const navigate = useNavigate();
  const earlyBirdDate = format(APPLICATION_DATES.EARLY_BIRD_DEADLINE, 'MMMM d, yyyy');
  const tuitionDeadline = format(APPLICATION_DATES.TUITION_DEADLINE, 'MMMM d, yyyy');

  const handleApplyClick = () => {
    navigate('/apply');
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-[#141414] mb-6">
            Program Details & Savings Options
          </h2>
          <p className="text-lg text-[#141414]/70 font-sans">
            Everything you need to know about our Summer 2025 vocal training program
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden border border-[#f0f0f0]">
            {/* Program Header */}
            <div className="px-8 py-10 border-b border-[#f0f0f0]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-[#141414]">
                    Summer 2025 Program
                  </h3>
                  <p className="font-sans text-base mt-2 text-[#141414]/70">
                    Five days of transformative vocal training
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-2xl md:text-3xl font-serif font-light text-[#141414]">€999</p>
                  <p className="font-sans text-sm text-[#141414]/70 mt-1">Total tuition</p>
                </div>
              </div>
            </div>
            
            {/* Content Grid */}
            <div className="p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Program Highlights */}
                <div>
                  <h4 className="font-serif text-xl font-light text-[#141414] mb-6">
                    Program Highlights
                  </h4>
                  <ul className="space-y-4 font-sans">
                    {[
                      'Comprehensive 360° approach to vocal training',
                      'World-class teachers from top universities',
                      'Professional audition preparation',
                      '45-minute private lesson for each student',
                      'Alexander Technique workshops',
                      '30-minute dedicated accompanist session',
                      'Mock auditions with final performance',
                      'Professional recording of final performance',
                      'Industry networking opportunities',
                      'Stage anxiety management workshops',
                      'Vocal health seminar by medical professional',
                      'Post-event support materials'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-3 mt-0.5 flex-shrink-0">
                          <Check className="h-5 w-5 text-[#4f6e72]" />
                        </span>
                        <span className="text-[#141414]/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Payment Options */}
                <div>
                  <h4 className="font-serif text-xl font-light text-[#141414] mb-6">
                    Ways to Save
                  </h4>
                  <div className="space-y-6">
                    {/* Standard Payment */}
                    <div className="p-6 rounded-xl bg-[#f9fafa] border border-[#f0f0f0]">
                      <h5 className="font-sans font-medium text-[#141414] flex items-center gap-2">
                        <Tag className="h-5 w-5 text-[#4f6e72]" />
                        Standard Payment Plan
                      </h5>
                      <ul className="mt-3 space-y-2 pl-7 text-[#141414]/70 font-sans text-sm">
                        <li>€100 deposit upon acceptance</li>
                        <li>Three installments of €299.67</li>
                        <li>Final payment by {tuitionDeadline}</li>
                      </ul>
                    </div>

                    {/* Early Bird */}
                    <div className="p-6 rounded-xl bg-[#f2f7f7] border border-[#e5eeef]">
                      <h5 className="font-sans font-medium text-[#141414] flex items-center gap-2">
                        <Tag className="h-5 w-5 text-[#4f6e72]" />
                        Early Bird Discount
                      </h5>
                      <p className="text-[#141414]/70 mt-2 pl-7 font-sans text-sm">
                        Save €50 when you enroll by {earlyBirdDate}
                      </p>
                    </div>

                    {/* Upfront Payment */}
                    <div className="p-6 rounded-xl bg-[#f2f7f7] border border-[#e5eeef]">
                      <h5 className="font-sans font-medium text-[#141414] flex items-center gap-2">
                        <Tag className="h-5 w-5 text-[#4f6e72]" />
                        Upfront Payment Benefit
                      </h5>
                      <p className="text-[#141414]/70 mt-2 pl-7 font-sans text-sm">
                        Save €49 when you pay the full tuition at once
                      </p>
                    </div>

                    {/* Best Value */}
                    <div className="p-6 rounded-xl bg-[#4f6e72]/10 border border-[#4f6e72]/20">
                      <h5 className="font-sans font-medium text-[#4f6e72] flex items-center gap-2">
                        <Tag className="h-5 w-5 text-[#4f6e72]" />
                        Best Value - Early Bird + Upfront
                      </h5>
                      <p className="text-[#4f6e72]/90 mt-2 pl-7 font-sans text-sm">
                        Maximum savings of €99 when you pay in full by {earlyBirdDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="px-8 py-10 border-t border-[#f0f0f0] flex flex-col items-center text-center">
              <Button 
                onClick={handleApplyClick}
                className="w-full sm:w-auto px-12 py-6 text-base font-medium bg-[#4f6e72] hover:bg-[#41595c] text-white rounded-full transition-all duration-300"
              >
                Start Your Application
              </Button>
              <p className="font-sans text-sm text-[#141414]/60 mt-4">
                Limited to 20 students. Applications close on {format(APPLICATION_DATES.DEADLINE, 'MMMM d, yyyy')}.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TuitionTiers;
