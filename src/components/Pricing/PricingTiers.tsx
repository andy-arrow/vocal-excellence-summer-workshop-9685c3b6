
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PricingTiers = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/apply');
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-16 md:py-24 px-6 bg-apple-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-apple-text mb-6">
            Your Investment in Excellence
          </h2>
          <p className="text-lg text-apple-grey">
            We believe in making exceptional vocal training accessible to talented artists.
            Our program offers flexible payment options to support your musical journey.
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-white px-8 py-10 border-b border-apple-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-3xl font-medium text-apple-text">The Threshold Experience</CardTitle>
                  <CardDescription className="text-lg mt-2 text-apple-grey">
                    Five days of immersive vocal training
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-medium text-apple-text">€999</p>
                  <p className="text-sm text-apple-grey mt-1">Full program tuition</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="bg-white px-8 py-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-medium text-apple-text mb-4">Program Highlights</h3>
                  <ul className="space-y-3">
                    {[
                      'Personalized vocal technique development',
                      'Learn from world-renowned vocal coaches',
                      'Expert audition preparation guidance',
                      'One-on-one 45-minute coaching session',
                      'Alexander Technique movement workshops',
                      'Dedicated accompanist rehearsal time',
                      'Performance opportunity with feedback',
                      'Professional recording of your performance',
                      'Connect with industry professionals',
                      'Performance anxiety management tools',
                      'Vocal health guidance from specialists',
                      'Take-home practice materials'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-3 mt-0.5">
                          <Check className="h-5 w-5 text-apple-blue" />
                        </span>
                        <span className="text-apple-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-apple-text mb-4">Flexible Payment Options</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-apple-light border border-apple-border">
                      <p className="font-medium text-apple-text">Initial deposit</p>
                      <p className="text-2xl font-medium text-apple-text mt-1">€100</p>
                      <p className="text-sm text-apple-grey mt-1">Secures your place upon acceptance</p>
                    </div>
                    <div className="p-4 rounded-lg bg-apple-light border border-apple-border">
                      <p className="font-medium text-apple-text">Monthly installments</p>
                      <p className="text-2xl font-medium text-apple-text mt-1">€299.67</p>
                      <p className="text-sm text-apple-grey mt-1">Three easy payments to suit your budget</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-white px-8 py-10 flex flex-col items-center">
              <Button 
                size="lg"
                onClick={handleApplyClick}
                className="w-full sm:w-auto px-8 py-6 text-lg font-medium"
              >
                Begin Your Journey
              </Button>
              <p className="text-sm text-apple-grey mt-4">
                Join us this summer! Only 20 spots available. Applications close May 15, 2025.
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingTiers;
