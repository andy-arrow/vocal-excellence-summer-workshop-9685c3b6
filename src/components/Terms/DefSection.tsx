
import { motion } from 'framer-motion';

const DefSection = () => {
  return (
    <section id="definitions">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
        <span className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-primary mr-3 text-sm font-bold">1</span>
        DEFINITIONS
      </h2>
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md mb-6 space-y-4">
        <p className="text-gray-700 font-medium">
          <strong className="text-gray-900">"Programme"</strong> refers to the Vocal Excellence Summer Programme, a 5-day vocal workshop scheduled for July 14-18, 2025, in Limassol, Cyprus.
        </p>
        <p className="text-gray-700 font-medium">
          <strong className="text-gray-900">"Organizer"</strong> refers to Vocal Excellence Summer Programme and its staff, instructors, and representatives.
        </p>
        <p className="text-gray-700 font-medium">
          <strong className="text-gray-900">"Participant"</strong> refers to any individual who has applied for and been accepted to attend the Programme.
        </p>
        <p className="text-gray-700 font-medium">
          <strong className="text-gray-900">"Application"</strong> refers to the complete submission of all required materials and information to be considered for the Programme.
        </p>
      </div>
    </section>
  );
};

export default DefSection;
