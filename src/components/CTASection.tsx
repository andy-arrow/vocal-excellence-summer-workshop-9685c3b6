import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { APPLICATION_DATES } from '@/constants/applicationDates';
import {
  REMARKABLE_LINE,
  APPLY_CONCRETE,
  SCARCITY_STATIC,
  POSTER_LINE,
  HOME_REAL_LINE,
  CTA_HEADLINE,
  CTA_PRIMARY,
} from '@/constants/copy';

const CTASection = () => {
  const navigate = useNavigate();
  const today = new Date();
  const applicationsClosed = today > APPLICATION_DATES.DEADLINE;
  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/apply');
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-apple-light">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/*
            CTA headline — factual, confident, no fear.
            Bernbach: emotional truth. Jobs: simple.
            Hopkins: specific claim the prospect can verify.
            Voss: state the fact, let them decide.
          */}
          <h2 className="font-serif text-4xl md:text-5xl font-light text-apple-text tracking-tight">
            {CTA_HEADLINE}
          </h2>

          {/* Poster line (Bernbach) */}
          <p className="text-xl md:text-2xl font-medium text-apple-blue/90">
            {POSTER_LINE}
          </p>

          {/*
            Specific summary (Hopkins, Ogilvy).
            Carnegie: make them see themselves in the outcome.
            Rowling: the student is the hero — this is their turning point.
            Audience: 12–21 year olds applying to top programmes.
          */}
          <p className="text-base md:text-lg text-apple-grey max-w-2xl mx-auto leading-relaxed">
            Top programmes shortlist candidates who arrive knowing exactly what the panel expects. Seven days in Limassol gives you the technique, the preparation, and the filmed audition to walk in ready.
          </p>

          {/* Authenticity anchor (Vaynerchuk) */}
          <p className="text-base font-medium text-apple-text/90">
            {HOME_REAL_LINE}
          </p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {!applicationsClosed ? (
              <Button
                onClick={handleApplyClick}
                size="lg"
                className="bg-apple-blue hover:bg-apple-blue-hover text-white text-lg px-8 rounded-full group uppercase tracking-wide font-semibold"
                data-testid="button-apply-cta"
              >
                {CTA_PRIMARY}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button
                disabled
                size="lg"
                className="bg-gray-400 text-white text-lg px-8 rounded-full cursor-not-allowed"
              >
                Applications Closed
              </Button>
            )}
          </motion.div>

          {/* Application detail (Hopkins: concrete. Voss: no pressure.) */}
          {!applicationsClosed && (
            <motion.div
              className="flex flex-col items-center space-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-apple-grey text-sm font-medium">
                {APPLY_CONCRETE}
              </p>
              <p className="text-apple-grey text-sm font-medium">
                {SCARCITY_STATIC}
              </p>
              <p className="text-apple-grey/80 text-sm italic mt-2">
                {REMARKABLE_LINE}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
