
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ApplicationForm from '@/components/ApplicationForm';
import ApplicationHero from '@/components/ApplicationHero';
import ApplicationRequirements from '@/components/ApplicationRequirements';
import ApplicationTimeline from '@/components/ApplicationTimeline';
import ApplicationFAQ from '@/components/ApplicationFAQ';

const Application = () => {
  useEffect(() => {
    // Ensure the page scrolls to the top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Apply - Vocal Excellence Academy</title>
        <meta name="description" content="Apply to join the Vocal Excellence Academy summer programme. Submit your application and begin your vocal journey with world-class instructors." />
      </Helmet>
      
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          <ApplicationHero />
          <ApplicationRequirements />
          <ApplicationTimeline />
          <ApplicationForm />
          <ApplicationFAQ />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Application;
