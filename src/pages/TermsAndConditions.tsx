
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <Helmet>
        <title>Terms and Conditions | Vocal Excellence Workshop</title>
        <meta name="description" content="Terms and Conditions for the Vocal Excellence Summer Workshop. Please review before applying to understand your rights and our policies." />
        <meta name="theme-color" content="#f5f5f7" />
      </Helmet>
      
      <Navbar />
      
      <motion.div 
        className="max-w-4xl mx-auto py-20 px-6 md:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Terms and Conditions
        </motion.h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-[#86868b] mb-6 text-lg">
            These Terms and Conditions govern your participation in the Vocal Excellence Summer Workshop.
          </p>
          
          <div className="rounded-2xl bg-white p-8 border border-[#e6e6e6] mb-8 shadow-sm">
            <h2 className="text-xl text-[#1d1d1f] font-medium mb-4">1. Registration and Eligibility</h2>
            <p className="text-[#86868b]">
              By applying to the Vocal Excellence Summer Workshop, you confirm that you meet all eligibility requirements and that all information provided in your application is accurate and complete.
            </p>
          </div>
          
          <div className="rounded-2xl bg-white p-8 border border-[#e6e6e6] mb-8 shadow-sm">
            <h2 className="text-xl text-[#1d1d1f] font-medium mb-4">2. Payment and Cancellation</h2>
            <p className="text-[#86868b] mb-4">
              Upon acceptance to the program, payment is required to secure your spot. Detailed payment instructions will be provided in your acceptance letter.
            </p>
            <ul className="list-disc pl-6 text-[#86868b] space-y-2">
              <li>Full payment is due within 14 days of acceptance notification</li>
              <li>Cancellations made 30+ days before the program start date will receive a full refund minus a $50 administrative fee</li>
              <li>Cancellations made 15-29 days before will receive a 50% refund</li>
              <li>Cancellations made 0-14 days before are non-refundable</li>
            </ul>
          </div>
          
          <div className="rounded-2xl bg-white p-8 border border-[#e6e6e6] mb-8 shadow-sm">
            <h2 className="text-xl text-[#1d1d1f] font-medium mb-4">3. Program Changes</h2>
            <p className="text-[#86868b]">
              While we strive to deliver the program as described, Vocal Excellence reserves the right to make changes to the program schedule, content, or faculty if necessary. Participants will be notified of any significant changes.
            </p>
          </div>
          
          <div className="rounded-2xl bg-white p-8 border border-[#e6e6e6] mb-8 shadow-sm">
            <h2 className="text-xl text-[#1d1d1f] font-medium mb-4">4. Code of Conduct</h2>
            <p className="text-[#86868b]">
              All participants are expected to behave professionally and respectfully toward faculty, staff, and fellow participants. Harassment or discrimination of any kind will not be tolerated and may result in immediate dismissal from the program without refund.
            </p>
          </div>
          
          <div className="rounded-2xl bg-white p-8 border border-[#e6e6e6] mb-8 shadow-sm">
            <h2 className="text-xl text-[#1d1d1f] font-medium mb-4">5. Intellectual Property and Media Release</h2>
            <p className="text-[#86868b]">
              By participating in the workshop, you grant Vocal Excellence permission to use photographs, video, and audio recordings featuring your likeness and performance for promotional and educational purposes.
            </p>
          </div>
          
          <p className="text-[#86868b] mt-8">
            Please review our full terms and conditions carefully before applying. If you have any questions, please contact us at <a href="mailto:help@vocalexcellence.com" className="text-[#0066cc] hover:underline">help@vocalexcellence.com</a>.
          </p>
        </div>
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
