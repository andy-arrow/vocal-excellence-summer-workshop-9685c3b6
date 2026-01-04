
import React, { useCallback } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Calendar, Users } from 'lucide-react';
import { format } from 'date-fns';
import { APPLICATION_DATES } from '@/constants/applicationDates';
import { Button } from '@/components/ui/button';

const fadeInAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const FeatureItem = React.memo(({ text }: { text: string }) => (
  <li className="flex items-start py-1.5 md:py-2">
    <span className="mr-3 md:mr-4 mt-0.5 flex-shrink-0">
      <Check className="h-4 w-4 text-[#4f6e72]" />
    </span>
    <span className="text-[#444444] font-light text-sm md:text-base leading-relaxed">{text}</span>
  </li>
));
FeatureItem.displayName = 'FeatureItem';

const FeatureCategory = React.memo(({ title, features }: { title: string; features: string[] }) => (
  <div className="mb-6 md:mb-8">
    <h4 className="font-serif text-base md:text-lg font-medium text-[#4f6e72] mb-3 md:mb-4">{title}</h4>
    <ul className="space-y-0.5 md:space-y-1">
      {features.map((item, i) => (
        <FeatureItem key={i} text={item} />
      ))}
    </ul>
  </div>
));
FeatureCategory.displayName = 'FeatureCategory';

const TuitionTiers = () => {
  const navigate = useNavigate();
  const tuitionDeadline = format(APPLICATION_DATES.TUITION_DEADLINE, 'MMMM d, yyyy');

  const handleApplyClick = useCallback(() => {
    navigate('/apply');
    window.scrollTo(0, 0);
  }, [navigate]);

  const CORE_TRAINING = [
    'Comprehensive Vocal Technique: Master the foundations of performance, breath control, and artistry',
    'World-Class Faculty: Learn directly from distinguished instructors from top-tier universities',
    'Elite Small Group Setting: Capped at 20 students to ensure personalized attention and feedback'
  ];

  const PERSONALIZED_COACHING = [
    'Private Vocal Lessons: One-on-one instruction tailored to your specific voice type',
    'Collaborative Piano Sessions: Work directly with a professional accompanist to refine your repertoire',
    'Alexander Technique: Specialized body work to release tension and improve vocal stamina'
  ];

  const CAREER_PREPARATION = [
    'Audition Mastery: Acting workshops and expert tips to dominate your next casting',
    'Professional Portfolio Assets: Walk away with 4K video recordings of your practice auditions and final performance',
    'Stage Presence Workshop: Conquer performance anxiety and command the stage'
  ];

  const AMENITIES = [
    'Daily Catered Lunch: Nutritious meals provided every day so you can focus on singing'
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          
          <motion.div
            {...fadeInAnimation}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl font-light text-[#141414] mb-3 md:mb-4">
              An Immersive Artist Experience
            </h2>
            <p className="text-base md:text-lg text-[#666666] font-light max-w-2xl mx-auto mb-8 md:mb-12">
              Over 40 hours of elite training designed to transform your vocal artistry
            </p>
            
            <div className="bg-[#f8f9fa] rounded-xl md:rounded-2xl p-5 md:p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="text-left order-2 md:order-1">
                  <FeatureCategory title="Core Training" features={CORE_TRAINING} />
                  <FeatureCategory title="Personalized Coaching" features={PERSONALIZED_COACHING} />
                  <FeatureCategory title="Career Preparation" features={CAREER_PREPARATION} />
                  <FeatureCategory title="Amenities" features={AMENITIES} />
                </div>
                
                <div className="space-y-4 md:space-y-6 order-1 md:order-2">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-light text-[#141414] mb-4 md:mb-6">
                      Investment in Your Art
                    </h3>
                    
                    <div className="bg-white rounded-lg md:rounded-xl p-5 md:p-6 mb-4 md:mb-5 border border-[#e8e8e8]">
                      <p className="text-xs md:text-sm text-[#4f6e72] font-light uppercase tracking-wide mb-1 md:mb-2">Total Tuition</p>
                      <p className="text-3xl md:text-4xl font-serif font-light text-[#4f6e72] mb-1 md:mb-2">€749</p>
                      <p className="text-[#666666] font-light text-sm md:text-base">
                        A comprehensive package covering over 40 hours of elite training
                      </p>
                    </div>

                    <div className="bg-white rounded-lg md:rounded-xl p-5 md:p-6 border border-[#e8e8e8]">
                      <h4 className="font-medium text-[#141414] mb-3 md:mb-4 text-sm md:text-base">Flexible Payment Plan</h4>
                      <ul className="space-y-2 md:space-y-3 text-[#555555] font-light text-sm md:text-base">
                        <li className="flex items-start gap-2">
                          <span className="text-[#4f6e72] mt-0.5 flex-shrink-0"><Check className="h-4 w-4" /></span>
                          <span><strong className="font-medium text-[#333333]">Registration:</strong> €100 deposit to secure your seat</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#4f6e72] mt-0.5 flex-shrink-0"><Check className="h-4 w-4" /></span>
                          <span><strong className="font-medium text-[#333333]">Installments:</strong> Three monthly payments of €216</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#4f6e72] mt-0.5 flex-shrink-0"><Check className="h-4 w-4" /></span>
                          <span><strong className="font-medium text-[#333333]">Deadline:</strong> Balance due by {tuitionDeadline}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            {...fadeInAnimation}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mt-8 md:mt-12"
          >
            <div className="bg-[#4f6e72] text-white rounded-xl md:rounded-2xl p-6 md:p-10 lg:p-12 max-w-2xl mx-auto">
              <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-light mb-4 md:mb-5">
                Ready to Begin?
              </h3>
              
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-5 md:mb-6 text-white text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-light">20 spots only</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-light">7 days left</span>
                </div>
              </div>
              
              <Button 
                onClick={handleApplyClick}
                className="w-full sm:w-auto px-8 md:px-10 py-2.5 md:py-3 text-sm md:text-base font-light bg-white text-[#4f6e72] hover:bg-gray-50 rounded-full transition-all duration-300"
                data-testid="button-apply-now"
              >
                Apply Now
              </Button>
              
              <p className="font-light text-[#d0e0e3] mt-4 md:mt-5 text-xs md:text-sm">
                Final call: Registration closes May 24, 2026
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default React.memo(TuitionTiers);
