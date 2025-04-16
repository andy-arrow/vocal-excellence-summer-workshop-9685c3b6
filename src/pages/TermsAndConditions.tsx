import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { CalendarDays, FileText, CircleDollarSign, Scale } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-16 px-6 md:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
            Terms and Conditions
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg">
              <CalendarDays className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Programme Dates</h3>
                <p className="text-sm text-gray-600">July 14-18, 2025</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg">
              <CircleDollarSign className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Programme Fee</h3>
                <p className="text-sm text-gray-600">€999 (Early Bird: €899)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-slate-50 p-6 rounded-lg mb-10">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Quick Access to Important Sections:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#payment-terms" className="flex items-center space-x-2 text-primary hover:underline">
              <CircleDollarSign className="w-4 h-4" />
              <span>Payment Terms</span>
            </a>
            <a href="#cancellation" className="flex items-center space-x-2 text-primary hover:underline">
              <FileText className="w-4 h-4" />
              <span>Cancellation Policy</span>
            </a>
            <a href="#eligibility" className="flex items-center space-x-2 text-primary hover:underline">
              <Scale className="w-4 h-4" />
              <span>Eligibility</span>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-rose max-w-none">
          <section id="definitions">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. DEFINITIONS</h2>
            <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm mb-6">
              <p className="mb-3">
                <strong>"Programme"</strong> refers to the Vocal Excellence Summer Programme, a 5-day vocal workshop scheduled for July 14-18, 2025, in Limassol, Cyprus.
              </p>
              <p className="mb-3">
                <strong>"Organizer"</strong> refers to Vocal Excellence Summer Programme and its staff, instructors, and representatives.
              </p>
              <p className="mb-3">
                <strong>"Participant"</strong> refers to any individual who has applied for and been accepted to attend the Programme.
              </p>
              <p>
                <strong>"Application"</strong> refers to the complete submission of all required materials and information to be considered for the Programme.
              </p>
            </div>
          </section>

          <section id="payment-terms" className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. PAYMENT TERMS</h2>
            <div className="bg-primary/5 rounded-lg p-6 mb-6">
              <div className="grid gap-4">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary text-sm">€</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Standard Fee</h3>
                    <p className="text-gray-600">€999 per participant</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-secondary text-sm">€</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Early Bird Discount</h3>
                    <p className="text-gray-600">€899 (€100 discount) for applications before April 30, 2025</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-accent text-sm">3x</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Installment Plan</h3>
                    <p className="text-gray-600">Pay in three equal installments:</p>
                    <ul className="list-disc ml-4 mt-2 space-y-1 text-sm">
                      <li>First installment: 33% upon acceptance</li>
                      <li>Second installment: 33% by May 15, 2025</li>
                      <li>Final installment: Remaining balance by June 15, 2025</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Continue with the rest of the sections */}
          <div dangerouslySetInnerHTML={{ 
            __html: `
              <section id="eligibility">
                <h2>3. ELIGIBILITY</h2>
                
              </section>
              
              <section id="application">
                <h2>4. APPLICATION AND SELECTION PROCESS</h2>
                
              </section>
              
              <section id="cancellation">
                <h2>6. CANCELLATION AND REFUND POLICY</h2>
                
              </section>
              
              <!-- Rest of the terms and conditions sections -->
            `
          }} />

        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-6 bg-primary/5 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Ready to Apply?</h3>
          <p className="text-gray-600 mb-4">Join us this summer in Cyprus for an unforgettable musical experience.</p>
          <Link 
            to="/apply" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
