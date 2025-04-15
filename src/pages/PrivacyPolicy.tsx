
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <motion.div 
        className="max-w-4xl mx-auto px-6 py-16 md:py-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-slate max-w-none">
          <div className="mb-8 text-sm text-gray-600">
            <p>Effective Date: April 15, 2025</p>
            <p>Last Updated: April 15, 2025</p>
            <p>Version: 1.0</p>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          ))}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

const sections = [
  {
    title: "1. INTRODUCTION",
    content: `
      <p>This Privacy Policy ("Policy") is provided by Vocal Excellence Summer Programme, operating at Nafpliou 12, Pentadromos, 3025, Limassol, Cyprus ("we," "us," "our," or the "Controller").</p>
      <p>This Policy details how we collect, use, store, protect, and share your personal data when you:</p>
      <ul>
        <li>Visit our website at vocalexcellence.cy ("Website")</li>
        <li>Apply to our programme</li>
        <li>Create an account or log in</li>
        <li>Participate in our summer programme</li>
        <li>Contact us for information</li>
        <li>Subscribe to communications from us</li>
      </ul>
      <p>We respect your privacy and are committed to protecting your personal data in accordance with the General Data Protection Regulation (EU) 2016/679 ("GDPR"), the Cyprus Law providing for the Protection of Natural Persons with regard to the Processing of Personal Data and for the Free Movement of such Data of 2018 (Law 125(I)/2018), and other applicable data protection legislation.</p>
    `
  },
  // ... Add all other sections similarly
  {
    title: "17. GOVERNING LAW",
    content: `
      <p>This Privacy Policy shall be governed by and construed in accordance with the laws of Cyprus, without regard to its conflict of law provisions.</p>
      <p>Any disputes relating to this Privacy Policy shall be subject to the exclusive jurisdiction of the courts of Cyprus, except where prohibited by applicable data protection laws.</p>
      <p>By using our Website and services, you acknowledge that you have read and understood this Privacy Policy.</p>
      <div class="mt-8 text-gray-700">
        <p>Vocal Excellence Summer Programme</p>
        <p>Nafpliou 12, Pentadromos, 3025</p>
        <p>Limassol, Cyprus</p>
        <p>Email: info@vocalexcellence.cy</p>
        <p>Phone: +357 25 775 885</p>
      </div>
    `
  }
];

export default PrivacyPolicy;
