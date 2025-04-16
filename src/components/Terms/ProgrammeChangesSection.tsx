
import { motion } from 'framer-motion';

const ProgrammeChangesSection = () => {
  return (
    <section id="programme-changes" className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. PROGRAMME CHANGES OR CANCELLATION</h2>
      <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm mb-6 space-y-4">
        <p className="text-gray-600">7.1. The Organizer reserves the right to make changes to the Programme's schedule, content, or faculty without prior notice.</p>
        <p className="text-gray-600">7.2. In the event an instructor is unable to participate, the Organizer will make reasonable efforts to provide a suitable replacement of comparable qualifications.</p>
        <div>
          <p className="text-gray-600 mb-2">7.3. In the unlikely event the Programme is canceled by the Organizer:</p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>All participants will receive a full refund of the Programme fee</li>
            <li>The Organizer is not responsible for any additional expenses incurred by participants (travel, accommodation, etc.)</li>
          </ul>
        </div>
        <p className="text-gray-600">7.4. Force Majeure: The Organizer is not liable for failure to perform its obligations if such failure results from circumstances beyond reasonable control.</p>
      </div>
    </section>
  );
};

export default ProgrammeChangesSection;
