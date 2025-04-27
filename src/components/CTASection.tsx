
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const navigate = useNavigate();

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/apply');
    window.scrollTo(0, 0);
  };

  const handlePricingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/pricing');
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[980px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-medium text-apple-text leading-tight">
            The Threshold.
          </h2>
          
          <p className="text-xl text-apple-grey mb-8">
            This isn't another event. It's a carefully curated experience designed for <strong>just 20 individuals</strong> ready to step into a new level of impact. We're building a room of peers, a crucible for growth, not a lecture hall.
          </p>
          
          <p className="text-lg text-apple-grey mb-8">
            <strong>When:</strong> July 14 - July 18, 2025. Five days that could redefine your trajectory.
          </p>
          
          <p className="text-lg text-apple-grey mb-8">
            <strong>Where:</strong> Limassol, Cyprus. A space away from the noise, dedicated to focus.
          </p>
          
          <h3 className="text-3xl font-medium text-apple-text mt-12 mb-6">
            The Commitment.
          </h3>
          
          <p className="text-lg text-apple-grey mb-8">
            What does it take to be in that room? It requires a commitment – to yourself, to the work, and to the community we're building.
          </p>
          
          <p className="text-lg text-apple-grey mb-8">
            The investment for this transformative week is <strong>€999</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Button 
              onClick={handleApplyClick}
              size="lg"
              className="min-w-[180px]"
            >
              Apply Now
            </Button>
            
            <Button 
              onClick={handlePricingClick}
              variant="outline" 
              size="lg"
              className="min-w-[180px]"
            >
              View Pricing
            </Button>
          </div>
          
          <p className="text-sm text-apple-grey mt-6">
            Applications close on <strong>May 15, 2025</strong>. Only 20 spots available.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
