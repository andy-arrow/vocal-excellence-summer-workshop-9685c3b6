
import { motion } from 'framer-motion';
import { Mail, Phone, Home } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
        <span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-primary mr-3 text-sm font-bold">17</span>
        CONTACT INFORMATION
      </h2>
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 shadow-md mb-6">
        <p className="text-gray-800 mb-6 font-medium">For questions regarding these Terms and Conditions, please contact:</p>
        
        <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm mb-6">
          <div className="space-y-3 text-gray-700">
            <p className="font-semibold text-gray-900 text-lg">Vocal Excellence Summer Programme</p>
            <div className="flex items-center">
              <Home className="w-5 h-5 text-primary mr-3" />
              <div>
                <p>Nafpliou 12, Pentadromos</p>
                <p>3025, Limassol, Cyprus</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-primary mr-3" />
              <p>info@vocalexcellence.cy</p>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-primary mr-3" />
              <p>+357 25 775 885</p>
            </div>
          </div>
        </div>
        
        <p className="mt-6 text-gray-800 font-medium bg-primary/5 p-4 rounded-lg border border-primary/10 shadow-sm">
          By submitting an application to the Vocal Excellence Summer Programme, you confirm that you have read, understood, and agree to abide by these Terms and Conditions.
        </p>
        
        <p className="mt-6 text-sm text-gray-600">Last updated: April 16, 2025</p>
      </div>
    </section>
  );
};

export default ContactSection;
