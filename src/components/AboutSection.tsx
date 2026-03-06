import React from 'react';
import { motion } from 'framer-motion';
import { Video, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  POSTER_LINE,
  CULTURAL_SHIFT,
  SEGMENT_LINE,
  TRIBE_LINE,
  EMOTIONAL_LINE,
  HOME_WE_BELIEVE,
} from '@/constants/copy';

const transformations = [
  {
    title: 'Technical freedom',
    description: 'Alexander Technique sessions that release physical tension and help your voice perform at the level you have been training for.',
    icon: <Zap className="h-5 w-5 text-apple-blue" />,
  },
  {
    title: 'A filmed audition',
    description: 'A broadcast-quality video recording of your mock audition — for university video applications, portfolio submissions, and scholarship shortlists.',
    icon: <Video className="h-5 w-5 text-apple-blue" />,
  },
  {
    title: 'Faculty who know what panels want',
    description: 'Direct coaching from Juilliard graduates and West End performers who understand exactly what top university admissions panels are looking for.',
    icon: <Users className="h-5 w-5 text-apple-blue" />,
  },
];

const AboutSection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className={cn('grid gap-10 md:gap-16', isMobile ? '' : 'grid-cols-1 lg:grid-cols-2')}>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Poster line (Bernbach) — repeat from strategy */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-tight text-apple-text">
              {POSTER_LINE}
            </h2>

            {/*
              Emotional line — Van Edwards: make them feel seen.
              Carnegie: acknowledge what they want, not what you want to sell.
            */}
            <p className="text-lg text-apple-text font-medium italic">
              {EMOTIONAL_LINE}
            </p>

            {/*
              Specific, comparative — no fear, no "struggles".
              Hopkins: concrete claim. Ogilvy: treat the reader as an intelligent adult.
              Audience: student, not working professional.
            */}
            <p className="text-lg text-charcoal leading-relaxed">
              Most summer workshops send you home a better singer. Vocal Excellence sends you home a better singer who knows exactly what their target programme is looking for — and has a filmed audition to show for it.
            </p>

            {/* Cultural context (Bernays: create the frame, not the pitch) */}
            <p className="text-charcoal leading-relaxed">
              {CULTURAL_SHIFT}
            </p>

            <p className="text-charcoal leading-relaxed">
              You won&apos;t just study with Juilliard graduates and West End performers — you will rehearse, record, and perform in the same conditions they trained in.
            </p>

            {/*
              We believe — manifesto (Godin: tribe rally. Musk: mission.
              Bernbach: truth over salesmanship. Ford: build what they need.)
            */}
            <p className="text-apple-text font-medium leading-relaxed border-l-2 border-apple-blue/50 pl-4 italic">
              {HOME_WE_BELIEVE}
            </p>

            {/* Segment (Kotler, Ritson: know who it's not for) */}
            <p className="text-sm md:text-base font-medium text-apple-text">
              {SEGMENT_LINE}
            </p>

            {/* Tribe (Godin) */}
            <p className="text-sm text-charcoal italic">
              {TRIBE_LINE}
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-apple-text">What you leave with</h3>
            {transformations.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-apple-light">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-medium text-apple-text mb-1">{item.title}</h4>
                  <p className="text-charcoal text-sm md:text-base">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
