
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { CalendarDays, FileText, CircleDollarSign, Scale, ChevronRight, Shield, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import DefSection from '@/components/Terms/DefSection';
import AcceptanceSection from '@/components/Terms/AcceptanceSection';
import ProgrammeChangesSection from '@/components/Terms/ProgrammeChangesSection';
import ContactSection from '@/components/Terms/ContactSection';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 shadow-md"
          >
            <Shield className="w-8 h-8 text-primary drop-shadow-sm" />
          </motion.div>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight drop-shadow-sm">
            Terms and Conditions
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed shadow-sm">
            We've crafted these terms with clarity and fairness in mind, ensuring a transparent agreement between us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CalendarDays className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Programme Dates</h3>
                <p className="text-gray-700 font-medium">July 14-18, 2025</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card transform hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CircleDollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Programme Fee</h3>
                <p className="text-gray-700 font-medium">€999 (Early Bird: €899)</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 mb-12 shadow-md hover:shadow-lg transition-shadow"
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
                className="flex items-center p-4 rounded-xl bg-white border border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition-all group shadow-sm"
              >
                <item.icon className="w-5 h-5 text-primary mr-3" />
                <span className="text-gray-800 font-medium group-hover:text-primary transition-colors">{item.label}</span>
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
          <DefSection />
          <AcceptanceSection />
          
          <section id="eligibility" className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-primary mr-3 text-sm font-bold">3</span>
              ELIGIBILITY
            </h2>
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-6 space-y-4">
              <p className="text-gray-700">3.1. The Programme is open to vocalists of all backgrounds who meet the minimum age requirement of 16 years as of July 14, 2025.</p>
              <p className="text-gray-700">3.2. Participants under 18 years of age must provide signed parental/guardian consent forms before participating in the Programme.</p>
              <p className="text-gray-700">3.3. The Organizer reserves the right to verify the eligibility of all applicants and to reject applications that do not meet the Programme requirements.</p>
            </div>
          </section>
          
          <section id="application" className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-secondary/10 w-8 h-8 rounded-full flex items-center justify-center text-secondary mr-3 text-sm font-bold">4</span>
              APPLICATION AND SELECTION PROCESS
            </h2>
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-6 space-y-4">
              <p className="text-gray-700">4.1. All applications must be submitted through the official application portal by May 15, 2025, 23:59 (Cyprus Time, GMT+3).</p>
              <div>
                <p className="text-gray-700 mb-2">4.2. A complete application must include:</p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li className="mb-1">Personal information and contact details</li>
                  <li className="mb-1">Musical background and experience information</li>
                  <li className="mb-1">Two contrasting repertoire recordings (maximum 5 minutes each)</li>
                  <li className="mb-1">Personal statement</li>
                  <li className="mb-1">Supporting documents (CV/resume)</li>
                  <li>Optional recommendation letter(s)</li>
                </ul>
              </div>
              <p className="text-gray-700">4.3. Applications are reviewed on a rolling basis. Early application is encouraged as spaces are limited to 20 participants.</p>
              <p className="text-gray-700">4.4. Selection is at the sole discretion of the Programme's artistic committee. The committee's decision is final and not subject to appeal.</p>
              <p className="text-gray-700">4.5. All applicants will be notified of their acceptance status by June 1, 2025.</p>
              <p className="text-gray-700">4.6. The Organizer reserves the right to request additional information or materials, including a virtual interview, as part of the selection process.</p>
            </div>
          </section>
          
          <section id="payment-terms" className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-accent/10 w-8 h-8 rounded-full flex items-center justify-center text-accent mr-3 text-sm font-bold">5</span>
              PAYMENT TERMS
            </h2>
            <div className="bg-primary/5 rounded-lg p-6 mb-6 border border-primary/10 shadow-md">
              <div className="grid gap-6">
                <div className="flex items-start space-x-4 bg-white/80 p-4 rounded-lg shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <span className="text-primary text-sm font-bold">€</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Standard Fee</h3>
                    <p className="text-gray-700">€999 per participant</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-white/80 p-4 rounded-lg shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <span className="text-secondary text-sm font-bold">€</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Early Bird Discount</h3>
                    <p className="text-gray-700">€899 (€100 discount) for applications before April 30, 2025</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 bg-white/80 p-4 rounded-lg shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                    <span className="text-accent text-sm font-bold">3x</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Installment Plan</h3>
                    <p className="text-gray-700">Pay in three equal installments:</p>
                    <ul className="list-disc ml-5 mt-2 space-y-1 text-sm text-gray-700">
                      <li>First installment: 33% upon acceptance</li>
                      <li>Second installment: 33% by May 15, 2025</li>
                      <li>Final installment: Remaining balance by June 15, 2025</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section id="cancellation" className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-primary mr-3 text-sm font-bold">6</span>
              CANCELLATION AND REFUND POLICY
            </h2>
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mb-6 space-y-4">
              <div>
                <p className="text-gray-700 mb-2">6.1. Participant Cancellation:</p>
                <ul className="list-disc pl-6 text-gray-700">
                  <li className="mb-2">Cancellations made more than 30 days before the Programme start date (before June 14, 2025) will receive a 70% refund of the total Programme fee.</li>
                  <li className="mb-2">Cancellations made between 15-30 days before the Programme start date (June 14-29, 2025) will receive a 50% refund of the total Programme fee.</li>
                  <li>Cancellations made less than 15 days before the Programme start date (after June 29, 2025) will not be eligible for a refund.</li>
                </ul>
              </div>
              <p className="text-gray-700">6.2. For participants on the installment plan, any refund will be calculated based on the total Programme fee, regardless of the amount paid at time of cancellation.</p>
              <p className="text-gray-700">6.3. All cancellation requests must be submitted in writing to info@vocalexcellence.com.</p>
              <p className="text-gray-700">6.4. Refunds will be processed within 30 days of the approved cancellation request.</p>
            </div>
          </section>

          <ProgrammeChangesSection />
          <ContactSection />
        </motion.div>

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center bg-gradient-to-br from-primary/5 to-primary/15 rounded-2xl p-8 border border-primary/20 shadow-lg"
        >
          <h3 className="text-xl font-medium mb-3 text-gray-900">Ready to Join?</h3>
          <p className="text-gray-700 mb-6 max-w-md mx-auto">
            Join us this summer in Cyprus for an unforgettable musical experience.
          </p>
          <Link 
            to="/apply" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-white bg-primary hover:bg-primary/90 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Apply Now
          </Link>
        </motion.div>
      </motion.div>
      
      <Footer />

      <style>{`
        .glass-card {
          @apply bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-md transition-all hover:shadow-lg;
        }

        .prose h2 {
          @apply text-2xl font-medium text-gray-900 mt-12 mb-6 flex items-center;
        }

        .prose h3 {
          @apply text-xl font-medium text-gray-800 mt-8 mb-4;
        }

        .prose p {
          @apply text-gray-700 leading-relaxed;
        }

        .prose ul {
          @apply space-y-2 my-6;
        }

        .prose li {
          @apply text-gray-700 leading-relaxed;
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;
