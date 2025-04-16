import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { CalendarDays, FileText, CircleDollarSign, Scale, ChevronRight, Shield, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto py-16 px-6 md:px-8"
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/5 mb-6"
          >
            <Shield className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We've crafted these terms with clarity and fairness in mind, ensuring a transparent agreement between us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CalendarDays className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Programme Dates</h3>
                <p className="text-gray-600">July 14-18, 2025</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CircleDollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Programme Fee</h3>
                <p className="text-gray-600">€999 (Early Bird: €899)</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/60 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-8 mb-12 shadow-sm"
        >
          <h2 className="text-lg font-medium mb-6 text-gray-900">Essential Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: FileText, label: "Payment Terms", href: "#payment-terms" },
              { icon: Scale, label: "Cancellation Policy", href: "#cancellation" },
              { icon: BookOpen, label: "Eligibility", href: "#eligibility" }
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-4 rounded-xl bg-white border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all group"
              >
                <item.icon className="w-5 h-5 text-primary mr-3" />
                <span className="text-gray-700 group-hover:text-primary transition-colors">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="prose prose-gray max-w-none"
        >
          {/* Keep existing sections content */}
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center bg-gradient-to-b from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/10"
        >
          <h3 className="text-xl font-medium mb-3 text-gray-900">Ready to Join?</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Join us this summer in Cyprus for an unforgettable musical experience.
          </p>
          <Link 
            to="/apply" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-white bg-primary hover:bg-primary/90 transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Apply Now
          </Link>
        </motion.div>
      </motion.div>
      
      <Footer />

      <style>{`
        .glass-card {
          @apply bg-white/60 backdrop-blur-lg border border-gray-200/50 rounded-xl p-6 shadow-sm transition-all hover:shadow-md hover:bg-white/80;
        }

        .prose h2 {
          @apply text-2xl font-medium text-gray-900 mt-12 mb-6 flex items-center;
        }

        .prose h3 {
          @apply text-xl font-medium text-gray-800 mt-8 mb-4;
        }

        .prose p {
          @apply text-gray-600 leading-relaxed;
        }

        .prose ul {
          @apply space-y-2 my-6;
        }

        .prose li {
          @apply text-gray-600 leading-relaxed;
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;
