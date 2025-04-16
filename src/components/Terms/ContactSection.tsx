
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section id="contact" className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. CONTACT INFORMATION</h2>
      <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm mb-6">
        <p className="text-gray-600 mb-4">For questions regarding these Terms and Conditions, please contact:</p>
        <div className="space-y-2 text-gray-600">
          <p className="font-semibold">Vocal Excellence Summer Programme</p>
          <p>Nafpliou 12, Pentadromos</p>
          <p>3025, Limassol, Cyprus</p>
          <p>Email: info@vocalexcellence.com</p>
          <p>Phone: +357 25 775 885</p>
        </div>
        <p className="mt-6 text-gray-600">
          By submitting an application to the Vocal Excellence Summer Programme, you confirm that you have read, understood, and agree to abide by these Terms and Conditions.
        </p>
        <p className="mt-4 text-sm text-gray-500">Last updated: April 16, 2025</p>
      </div>
    </section>
  );
};

export default ContactSection;
