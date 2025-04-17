import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-16 px-6 md:px-8">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
          Terms and Conditions
        </h1>
        
        <div className="prose prose-rose max-w-none">
          <p className="text-gray-700 mb-6">
            These Terms and Conditions govern your participation in the Vocal Excellence Summer Workshop.
          </p>
          
          {/* We would normally add more content here */}
          <p className="text-gray-700">
            Please review our full terms and conditions carefully before applying.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
