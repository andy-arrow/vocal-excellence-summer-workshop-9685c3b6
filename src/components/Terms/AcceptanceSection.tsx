
import { motion } from 'framer-motion';

const AcceptanceSection = () => {
  return (
    <section id="acceptance" className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
        <span className="bg-secondary/10 w-8 h-8 rounded-full flex items-center justify-center text-secondary mr-3 text-sm font-bold">2</span>
        ACCEPTANCE OF TERMS
      </h2>
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md mb-6">
        <p className="text-gray-700 font-medium leading-relaxed">
          By submitting an application to the Vocal Excellence Summer Programme, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you and the Organizer.
        </p>
      </div>
    </section>
  );
};

export default AcceptanceSection;
