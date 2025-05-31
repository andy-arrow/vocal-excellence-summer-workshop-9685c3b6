
import React, { useCallback } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Calendar, Users } from 'lucide-react';
import { format } from 'date-fns';
import { APPLICATION_DATES } from '@/constants/applicationDates';
import { Button } from '@/components/ui/button';

// Simple animation settings
const fadeInAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

// Simple feature item
const FeatureItem = React.memo(({ text }: { text: string }) => (
  <li className="flex items-start py-2">
    <span className="mr-4 mt-1 flex-shrink-0">
      <Check className="h-4 w-4 text-[#4f6e72]" />
    </span>
    <span className="text-[#141414]/80 font-light">{text}</span>
  </li>
));
FeatureItem.displayName = 'FeatureItem';

const TuitionTiers = () => {
  const navigate = useNavigate();
  const tuitionDeadline = format(APPLICATION_DATES.TUITION_DEADLINE, 'MMMM d, yyyy');

  const handleApplyClick = useCallback(() => {
    navigate('/apply');
    window.scrollTo(0, 0);
  }, [navigate]);

  // Simplified program features
  const PROGRAM_FEATURES = [
    'Complete vocal training - technique, performance, and artistry',
    'Amazing teachers from top universities',
    'Small groups - max 20 students for personal attention',
    'Daily masterclasses with incredible instructors',
    'Your own private lesson',
    'Personal accompanist session',
    'Acting workshops for stage presence',
    'Alexander Technique training',
    'Group singing workshops',
    'Audition prep with expert tips',
    'Practice auditions filmed in 4K',
    'Final performance filmed in 4K',
    'Stage confidence workshops',
    'Lunch included every day'
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          
          {/* Simple what you get section */}
          <motion.div
            {...fadeInAnimation}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#141414] mb-16">
              What You'll Get
            </h2>
            
            <div className="bg-[#fafafa] rounded-3xl p-12 md:p-16">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Features list */}
                <div>
                  <h3 className="font-serif text-2xl font-light text-[#141414] mb-8">
                    Everything Included
                  </h3>
                  <ul className="space-y-1 text-left">
                    {PROGRAM_FEATURES.map((item, i) => (
                      <FeatureItem key={i} text={item} />
                    ))}
                  </ul>
                </div>
                
                {/* Simple cost breakdown */}
                <div className="space-y-8">
                  <div>
                    <h3 className="font-serif text-2xl font-light text-[#141414] mb-8">
                      Cost & Payment
                    </h3>
                    
                    <div className="bg-white rounded-2xl p-8 mb-6">
                      <p className="text-4xl font-serif font-light text-[#4f6e72] mb-3">€749</p>
                      <p className="text-lg text-[#4f6e72]/90 font-light mb-3">
                        Everything included
                      </p>
                      <p className="text-[#141414]/70 font-light">
                        About €150 per day for full training
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8">
                      <h4 className="font-light text-[#141414] mb-4">Payment Plan</h4>
                      <ul className="space-y-2 text-[#141414]/70 font-light">
                        <li>€100 to register (counts toward total)</li>
                        <li>Three payments of €216 each</li>
                        <li>Final payment due: {tuitionDeadline}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Simple call to action */}
          <motion.div 
            {...fadeInAnimation}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-[#4f6e72] text-white rounded-3xl p-12 max-w-2xl mx-auto">
              <h3 className="font-serif text-3xl font-light mb-6">
                Ready to Join?
              </h3>
              
              <div className="flex items-center justify-center gap-6 mb-8 text-white/90">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-light">Only 20 spots</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="font-light">7 days left</span>
                </div>
              </div>
              
              <Button 
                onClick={handleApplyClick}
                className="w-full sm:w-auto px-12 py-4 text-lg font-light bg-white text-[#4f6e72] hover:bg-gray-50 rounded-full transition-all duration-300"
              >
                Apply Now
              </Button>
              
              <p className="font-light text-white/80 mt-6">
                Applications close June 7, 2025
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default React.memo(TuitionTiers);
