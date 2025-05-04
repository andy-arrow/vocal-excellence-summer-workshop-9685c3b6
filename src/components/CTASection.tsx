
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { APPLICATION_DATES } from './ApplicationTimeline';
import SpotsRemainingIndicator from './SpotsRemainingIndicator';

const CTASection = () => {
  const navigate = useNavigate();
  const today = new Date();
  const applicationsClosed = today > APPLICATION_DATES.DEADLINE;
  
  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/apply');
    window.scrollTo(0, 0);
  };
  
  const handleTuitionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/tuition');
    window.scrollTo(0, 0);
  };
  
  return <section className="py-16 md:py-24 lg:py-32 bg-apple-light">
      <div className="container mx-auto px-6">
        <motion.div className="max-w-4xl mx-auto text-center space-y-8" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }}>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-apple-text tracking-tight">
            Ready to Transform Your Vocal Journey?
          </h2>
          
          <p className="text-lg text-apple-grey max-w-2xl mx-auto">
            Join a select group of committed vocalists for an intensive, transformative experience.
            {!applicationsClosed && " Don't miss the opportunity to work with our world-class faculty."}
          </p>
          
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6" initial={{
          opacity: 0,
          y: 10
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            {!applicationsClosed ? <Button onClick={handleApplyClick} size="lg" className="bg-apple-blue hover:bg-apple-blue-hover text-white text-lg px-8 rounded-full">
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button> : <Button disabled size="lg" className="bg-gray-400 text-white text-lg px-8 rounded-full cursor-not-allowed">
                Applications Closed
              </Button>}
            
            <Button onClick={handleTuitionClick} variant="outline" size="lg" className="border-apple-border text-apple-text hover:bg-apple-light-hover text-lg px-8 rounded-full">Tuition</Button>
          </motion.div>
          
          {!applicationsClosed && (
            <div className="flex flex-col items-center">
              <SpotsRemainingIndicator className="mb-2" />
              <p className="text-apple-grey text-sm">
                Applications close on {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }).format(APPLICATION_DATES.DEADLINE)}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>;
};

export default CTASection;
