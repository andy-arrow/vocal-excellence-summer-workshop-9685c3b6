
import React, { useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoogleTagManager from '@/components/analytics/GoogleTagManager';
import { useAnalytics } from '@/hooks/useAnalytics';
import ApplicationHero from '@/components/ApplicationHero';

// Lazily load less critical components
const ApplicationForm = lazy(() => import('@/components/ApplicationForm'));
const ApplicationRequirements = lazy(() => import('@/components/ApplicationRequirements'));
const ApplicationTimeline = lazy(() => import('@/components/ApplicationTimeline'));
const ApplicationFAQ = lazy(() => import('@/components/ApplicationFAQ'));
const ScrollToTopButton = lazy(() => import('@/components/ScrollToTopButton'));

const SectionLoader = () => <div className="flex justify-center py-16">
    <div className="w-8 h-8 border-4 border-coral-300 border-t-coral-500 rounded-full animate-spin"></div>
  </div>;

const fadeIn = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const Application = () => {
  const [showScrollToTop, setShowScrollToTop] = React.useState(false);
  const analytics = useAnalytics();
  
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setShowScrollToTop(window.scrollY > 500);
      });
    };
    
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    
    // Track page view with custom metadata
    analytics.trackEvent(
      'Page',
      'view',
      'Application Page',
      undefined,
      false,
      { page_type: 'application', referrer: document.referrer }
    );
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [analytics]);

  return (
    <div className="bg-[#f5f5f7] text-apple-text min-h-screen font-sans antialiased">
      {/* Google Tag Manager initialization */}
      <GoogleTagManager 
        gtmId="GTM-WRPV2R2P" // Using the actual GTM ID
        googleAdsId="AW-123456789" // Replace with your actual Google Ads ID
      />
      
      <Helmet>
        <title>Apply Now | Vocal Excellence Workshop</title>
        <meta name="description" content="Land your next audition in 5 days with our elite vocal training program. 94% of past attendees booked paid gigs within 6 months." />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <ApplicationHero />
          
          <div className="py-2 md:py-6 bg-[#f5f5f7]"> {/* Further reduced vertical padding to bring content closer */}
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <div className="space-y-4 md:space-y-8"> {/* Reduced spacing between sections even more */}
                <motion.section 
                  key="requirements" 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-100px" }} 
                  variants={fadeIn}
                  onViewportEnter={() => {
                    analytics.trackEvent('Visibility', 'section_visible', 'Application Requirements', undefined, true);
                  }}
                >
                  <Suspense fallback={<SectionLoader />}>
                    <ApplicationRequirements />
                  </Suspense>
                </motion.section>
                
                <motion.section 
                  key="timeline" 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-100px" }} 
                  variants={fadeIn}
                  onViewportEnter={() => {
                    analytics.trackEvent('Visibility', 'section_visible', 'Application Timeline', undefined, true);
                  }}
                >
                  <Suspense fallback={<SectionLoader />}>
                    <ApplicationTimeline />
                  </Suspense>
                </motion.section>
                
                <motion.section 
                  key="form" 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-100px" }} 
                  id="application-form-section"
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                  aria-label="Application Form Section"
                  onViewportEnter={() => {
                    analytics.trackEvent('Visibility', 'section_visible', 'Application Form', undefined, true);
                    analytics.trackConversion(
                      'AW-CONVERSION_ID/FORM_VIEW_LABEL', // Replace with your actual conversion ID and label
                      undefined,
                      undefined,
                      undefined,
                      { important_section: 'application_form' }
                    );
                  }}
                >
                  <Suspense fallback={<SectionLoader />}>
                    <ApplicationForm />
                  </Suspense>
                </motion.section>
                
                <motion.section 
                  key="faq" 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-100px" }} 
                  variants={fadeIn}
                  onViewportEnter={() => {
                    analytics.trackEvent('Visibility', 'section_visible', 'Application FAQ', undefined, true);
                  }}
                >
                  <Suspense fallback={<SectionLoader />}>
                    <ApplicationFAQ />
                  </Suspense>
                </motion.section>
              </div>
            </div>
          </div>
        </main>
        
        <Suspense fallback={null}>
          <ScrollToTopButton visible={showScrollToTop} />
        </Suspense>
        
        <Footer />
      </div>
    </div>
  );
};

export default Application;
