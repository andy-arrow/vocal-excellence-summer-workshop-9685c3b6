import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { APPLICATION_DATES } from '@/constants/applicationDates';
import {
  REMARKABLE_LINE,
  POSTER_LINE,
  NEWS_LINE,
  CTA_PRIMARY,
} from '@/constants/copy';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  const today = new Date();
  const applicationsClosed = today > APPLICATION_DATES.DEADLINE;

  useEffect(() => {
    const saved = localStorage.getItem('reduced-motion') === 'true';
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setHasReducedMotion(saved || (mq.matches && !localStorage.getItem('reduced-motion')));

    const handleScroll = () => {
      if (!heroRef.current || hasReducedMotion) return;
      const scrollY = window.scrollY;
      const heroContent = heroRef.current.querySelector('.hero-content') as HTMLElement;
      if (heroContent) {
        heroContent.style.opacity = Math.max(0.2, 1 - Math.min(scrollY / 700, 0.8)).toString();
        heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasReducedMotion]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className={cn(
        'relative overflow-visible',
        // Navbar: h-40 logo (160px) + py-2 (16px) = 176px total.
        // pt-48 (192px) gives a 16px gap below the navbar on all screen sizes.
        // min-h removed on mobile: let content + padding set the height naturally.
        // min-h-[85vh] on md+ keeps the hero feeling expansive on larger screens.
        'pt-48',
        'pb-16 md:pb-20',
        'md:min-h-[85vh]',
        'bg-apple-light border-b border-apple-border',
        hasReducedMotion ? 'reduced-motion' : ''
      )}
    >
      <div className="hero-content relative z-20 text-center px-5 sm:px-6 transition-all duration-500 ease-out max-w-5xl mx-auto">
        <motion.div
          className="space-y-4 sm:space-y-5 md:space-y-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >

          {/* Eyebrow — location + year */}
          <motion.p
            className="text-xs font-semibold text-apple-text/65 uppercase tracking-[0.28em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {NEWS_LINE}
          </motion.p>

          {/*
           * Headline — each sentence gets its own line at EVERY breakpoint.
           * Mobile  (< sm, 375–639px): text-3xl (30px), shorter last line so it
           *   never wraps. "Juilliard & West End." = ~334px; content = ~325px. ✓
           * Desktop (sm+, 640px+):   text-4xl → 6xl, full last line.
           *   At sm text-4xl "Juilliard & West End Faculty." = ~554px < 608px. ✓
           *   At lg text-6xl same phrase = ~667px < 992px (max-w-5xl). ✓
           */}
          <motion.h1
            className="font-serif font-light text-apple-blue tracking-tight leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
          >
            {/* Mobile version */}
            <span className="block text-[1.85rem] sm:hidden">
              Seven Days.<br />
              A Filmed Audition.<br />
              Juilliard &amp; West End.
            </span>
            {/* Tablet / desktop version */}
            <span className="hidden sm:block text-[2.5rem] md:text-5xl lg:text-6xl">
              Seven Days.<br />
              A Filmed Audition.<br />
              Juilliard &amp; West End Faculty.
            </span>
          </motion.h1>

          {/* Aspiration line — no demographic qualifier; reader self-selects */}
          <motion.p
            className="font-sans text-[0.95rem] sm:text-base md:text-lg text-charcoal max-w-xs sm:max-w-sm md:max-w-lg mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {POSTER_LINE}
          </motion.p>

          {/* Date */}
          <motion.div
            className="inline-flex items-center justify-center gap-2 text-apple-text/85 text-[0.8rem] sm:text-sm font-medium mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.95 }}
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-apple-blue flex-shrink-0" />
            <span>June 29 – July 5, 2026 · Limassol, Cyprus</span>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="pt-1 md:pt-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
          >
            <Link
              to="/apply"
              className={cn(
                'group inline-flex items-center justify-center',
                'px-8 py-3.5 sm:py-4',
                'w-full sm:w-auto',
                'rounded-full text-[0.8rem] sm:text-sm font-semibold uppercase tracking-widest',
                'text-white transition-all duration-300',
                applicationsClosed
                  ? 'bg-gray-400 cursor-not-allowed pointer-events-none'
                  : 'bg-apple-blue hover:bg-apple-blue-hover active:scale-[0.98]'
              )}
              data-testid="link-apply-hero"
            >
              {applicationsClosed ? 'Applications Closed' : CTA_PRIMARY}
              {!applicationsClosed && (
                <ArrowUpRight className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              )}
            </Link>

            <p className="mt-4 sm:mt-5 text-charcoal text-xs font-medium tracking-wide">
              {REMARKABLE_LINE}
            </p>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll cue — CSS-only visibility, no JS isMobile needed */}
      <motion.button
        onClick={scrollToAbout}
        className="hidden md:flex absolute bottom-8 left-0 right-0 mx-auto w-12 h-12 cursor-pointer z-20 items-center justify-center"
        aria-label="Scroll to learn more"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <motion.div
          className="rounded-full bg-apple-border/20 backdrop-blur-sm border border-apple-border p-3 hover:bg-apple-border/40 transition-all"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
        >
          <ArrowDown className="text-apple-text w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
