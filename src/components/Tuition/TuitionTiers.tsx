
import React, { useCallback } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Tag, ArrowDown, Star, Clock, Award, Users } from 'lucide-react';
import { format } from 'date-fns';
import { APPLICATION_DATES } from '@/constants/applicationDates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

// Extracted animation settings for reuse
const fadeInAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

// Memoized list item component
const FeatureItem = React.memo(({ text }: { text: string }) => (
  <li className="flex items-start group">
    <span className="mr-3 mt-0.5 flex-shrink-0 rounded-full bg-[#f5f7f7] p-1 group-hover:bg-[#eef2f2] transition-colors">
      <Check className="h-4 w-4 text-[#4f6e72]" />
    </span>
    <span className="text-[#141414]/80">{text}</span>
  </li>
));
FeatureItem.displayName = 'FeatureItem';

// Memoized value point component
const ValuePoint = React.memo(({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <li className="flex items-start group">
    <span className="mr-3 mt-0.5 flex-shrink-0 rounded-full bg-[#4f6e72]/10 p-1 group-hover:bg-[#4f6e72]/20 transition-colors">
      {icon}
    </span>
    <span className="text-[#141414]/80">{text}</span>
  </li>
));
ValuePoint.displayName = 'ValuePoint';

const TuitionTiers = () => {
  const navigate = useNavigate();
  const tuitionDeadline = format(APPLICATION_DATES.TUITION_DEADLINE, 'MMMM d, yyyy');

  // Use useCallback for event handler
  const handleApplyClick = useCallback(() => {
    navigate('/apply');
    window.scrollTo(0, 0);
  }, [navigate]);

  // Program Features with casual language
  const PROGRAM_FEATURES = [
    'Complete vocal training - technique, performance, and artistry all covered',
    'Amazing instructors from top universities and music schools',
    'Small groups only - max 20 students so you get real attention',
    'Daily masterclasses with incredible teachers',
    'Your own private lesson included',
    'Personal accompanist session just for you',
    'Acting workshops to boost your stage presence',
    'Alexander Technique training (helps with posture and nerves)',
    'Group singing workshops for team skills',
    'Audition prep with expert tips',
    'Practice auditions filmed in 4K quality',
    'Final performance filmed professionally in 4K',
    'Workshops on handling stage nerves',
    'Lunch included every day'
  ];

  // Enhanced value proposition points
  const VALUE_POINTS = [
    {
      icon: <Clock className="h-4 w-4 text-[#4f6e72]" />,
      text: 'Full days packed with training from morning to evening - you\'ll get the most out of every moment'
    },
    {
      icon: <Award className="h-4 w-4 text-[#4f6e72]" />,
      text: 'Top-notch facilities with everything included - lunch and your own accompanist sessions'
    },
    {
      icon: <Users className="h-4 w-4 text-[#4f6e72]" />,
      text: 'Personal coaching in a fun group setting for the best learning experience'
    },
    {
      icon: <Star className="h-4 w-4 text-[#4f6e72]" />,
      text: 'Professional 4K videos of your performances and auditions to keep forever'
    }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-16 pb-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Value Proposition Section */}
          <motion.div
            {...fadeInAnimation}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light text-[#141414] mb-8">
              Why This is Amazing Value
            </h2>
            
            <div className="bg-gradient-to-br from-[#f7fafa] to-[#eef2f2] border border-[#4f6e72]/20 rounded-3xl p-10 md:p-12 mb-10">
              <div className="text-center mb-10">
                <p className="text-3xl md:text-4xl font-serif font-light text-[#4f6e72] mb-3">
                  €749 (Everything Included)
                </p>
                <p className="text-xl text-[#4f6e72]/90 font-medium mb-3">
                  About €150 per day for full-day intensive training
                </p>
                <p className="text-[#141414]/70 font-sans text-lg">
                  This covers everything - all lessons, materials, professional video recordings, and daily lunch
                </p>
              </div>
              
              <ul className="space-y-5 font-sans text-left max-w-4xl mx-auto">
                {VALUE_POINTS.map((item, i) => (
                  <ValuePoint key={i} icon={item.icon} text={item.text} />
                ))}
              </ul>
            </div>
            
            <p className="text-xl text-[#141414]/70 font-sans max-w-3xl mx-auto leading-relaxed">
              This is your chance to get incredible training and support at an unbeatable daily rate. Our intensive format means you'll learn tons through hands-on practice and get professional videos of your progress.
            </p>
          </motion.div>
          
          <motion.div 
            {...fadeInAnimation}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto"
          >
            <Card className="bg-white shadow-lg border-[#eaeaea] rounded-2xl overflow-hidden">
              {/* Program Header */}
              <CardHeader className="px-10 py-10 border-b border-[#f0f0f0] bg-gradient-to-br from-[#fafafa] to-[#f5f5f5]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl font-light text-[#141414] mb-2">
                      Summer 2025 Program
                    </h3>
                    <p className="font-sans text-lg text-[#141414]/70">
                      Five amazing days of world-class vocal training
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-3xl md:text-4xl font-serif font-light text-[#4f6e72]">€749</p>
                    <p className="font-sans text-base text-[#141414]/70 mt-1">Everything included</p>
                  </div>
                </div>
              </CardHeader>
              
              {/* Content Grid */}
              <CardContent className="p-10 md:p-12">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Program Highlights */}
                  <div>
                    <h4 className="font-serif text-2xl font-light text-[#141414] mb-6">
                      What You'll Get
                    </h4>
                    <ul className="space-y-4 font-sans">
                      {PROGRAM_FEATURES.map((item, i) => (
                        <FeatureItem key={i} text={item} />
                      ))}
                    </ul>
                  </div>
                  
                  {/* Payment Information */}
                  <div>
                    <h4 className="font-serif text-2xl font-light text-[#141414] mb-6">
                      How Much & How to Pay
                    </h4>
                    <div className="space-y-6">
                      {/* Total Cost */}
                      <Card className="overflow-hidden border-[#4f6e72]/20 bg-gradient-to-br from-[#f7fafa] to-[#e9f1f2] hover:from-[#f2f7f7] hover:to-[#e4edef] transition-colors duration-300">
                        <CardContent className="p-8">
                          <h5 className="font-sans font-medium text-[#4f6e72] flex items-center gap-2 mb-4">
                            <Award className="h-5 w-5 text-[#4f6e72]" />
                            Total Cost
                          </h5>
                          <p className="text-3xl font-serif font-light text-[#4f6e72] mb-3">€749</p>
                          <p className="text-[#4f6e72]/90 font-sans mb-3">
                            Everything included: lessons, materials, recordings, and daily lunch
                          </p>
                          <p className="text-sm text-[#4f6e72]/80 font-sans">
                            Way cheaper than booking private lessons and workshops separately
                          </p>
                        </CardContent>
                      </Card>

                      {/* Payment Plan */}
                      <Card className="overflow-hidden border-[#f0f0f0] bg-[#fafafa] hover:bg-white transition-colors duration-300">
                        <CardContent className="p-8">
                          <h5 className="font-sans font-medium text-[#141414] flex items-center gap-2 mb-4">
                            <Tag className="h-5 w-5 text-[#4f6e72]" />
                            Payment Plan
                          </h5>
                          <ul className="space-y-3 text-[#141414]/70 font-sans">
                            <li>• €100 to register (counts toward your total)</li>
                            <li>• Three payments of €216 each</li>
                            <li>• Final payment due: {tuitionDeadline}</li>
                            <li className="font-medium text-[#141414] pt-2 border-t border-[#f0f0f0]">
                              Total: €749 (everything included)
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              {/* Enhanced Call to Action */}
              <CardFooter className="px-10 py-10 border-t border-[#f0f0f0] flex flex-col items-center text-center bg-gradient-to-br from-[#fafafa] to-[#f5f5f5]">
                <div className="mb-6 text-center">
                  <h5 className="font-serif text-2xl font-light text-[#141414] mb-2">
                    Grab Your Spot Now
                  </h5>
                  <p className="font-sans text-lg text-[#141414]/70 mb-1">
                    Only 20 spots available
                  </p>
                  <p className="font-sans text-base text-red-600 font-medium">
                    Application deadline: {format(APPLICATION_DATES.DEADLINE, 'MMMM d, yyyy')} - Only 7 days left!
                  </p>
                </div>
                
                <Button 
                  onClick={handleApplyClick}
                  className="w-full sm:w-auto px-16 py-6 text-lg font-medium bg-[#4f6e72] hover:bg-[#41595c] text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Apply Now - Don't Wait!
                </Button>
                
                <p className="font-sans text-sm text-[#141414]/60 mt-4 max-w-md">
                  Don't wait - spots are going fast and applications close soon. The €100 registration fee is part of your total cost.
                </p>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mt-8"
          >
            <ArrowDown className="h-6 w-6 text-[#4f6e72]/60 animate-bounce" />
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default React.memo(TuitionTiers);
