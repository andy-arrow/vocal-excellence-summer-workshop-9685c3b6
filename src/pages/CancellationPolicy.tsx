import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-16 px-6 md:px-8">
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-6">Cancellation Policy</h1>
        
        <div className="prose prose-rose max-w-none">
          <p className="text-gray-700 mb-6">
            This Cancellation Policy sets forth the terms and conditions applicable to cancellations of registrations for the Vocal Excellence Summer Workshop ("Workshop"), scheduled for July 14–18, 2025, in Limassol, Cyprus. This Policy is an integral part of the Workshop's Terms and Conditions. Before enrolling in the Workshop, please read these provisions carefully. Should you have any questions or require further clarification, you are encouraged to seek independent legal advice.
          </p>

          <h2 className="font-serif text-xl font-medium text-gray-900 mt-8 mb-4">1. Cancellation Rights Under the EU Consumer Rights Directive</h2>
          <p className="text-gray-700">
            In accordance with the EU Consumer Rights Directive, participants have the right to cancel their Workshop registration for any reason within 14 calendar days from the date on which the registration is confirmed ("Cooling-Off Period"). If you exercise your right of cancellation within this Cooling-Off Period, you will be entitled to a full refund of the Workshop fee provided no significant benefits have been received from the Workshop during the cancellation period.
          </p>

          <h2 className="font-serif text-xl font-medium text-gray-900 mt-8 mb-4">2. Cancellation Requests Made Outside the Cooling-Off Period</h2>
          <p className="text-gray-700">
            For cancellations submitted after the expiration of the Cooling-Off Period, the following conditions will apply:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li className="mb-2">
              <strong>Cancellations Made More Than 7 Days Prior to the Workshop Start Date:</strong><br />
              If you notify Vocal Excellence in writing of your intention to cancel at least 7 days before the scheduled commencement of the Workshop, you will be entitled to an 80% refund of the full Workshop fee. This refund is calculated after deducting administrative expenses, bank charges, and other applicable transactional costs.
            </li>
            <li>
              <strong>Cancellations Made Within 7 Days of the Workshop Start Date:</strong><br />
              If your cancellation request is received less than 7 days before the Workshop begins, you will not be eligible for a refund. In such instances, the full payment will instead be converted to a credit that may be applied to future enrolment in a subsequent Workshop session, subject to availability.
            </li>
          </ul>

          <h2 className="font-serif text-xl font-medium text-gray-900 mt-8 mb-4">3. Mandatory Cancellation Procedures</h2>
          <p className="text-gray-700">
            To initiate a cancellation, you must adhere to the following procedure:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Provide a written notice of cancellation by emailing your request to info@vocalexcellence.cy.</li>
            <li>Include within your notice your full name, registration details, and a succinct explanation for your cancellation request.</li>
            <li>It is recommended that you request and retain confirmation of receipt of your cancellation email.</li>
          </ul>
          <p className="text-gray-700">
            Upon receipt of your notice, Vocal Excellence will review the request and issue a written confirmation of cancellation along with details regarding any refund or credit that may be due.
          </p>

          <h2 className="font-serif text-xl font-medium text-gray-900 mt-8 mb-4">4. Refund Processing</h2>
          <p className="text-gray-700">
            Should your cancellation request be approved, refunds will be processed using the original method of payment. Refunds will be issued within 30 calendar days from the date of approval. Please note that the refund amount, if applicable, will reflect deductions for administrative costs and other charges as stipulated above.
          </p>

          <h2 className="font-serif text-xl font-medium text-gray-900 mt-8 mb-4">5. Force Majeure and Extraordinary Circumstances</h2>
          <p className="text-gray-700">
            In the event that the Workshop is canceled, postponed, or rescheduled due to unforeseen circumstances beyond the control of Vocal Excellence—such as natural disasters, pandemics, armed conflicts, or other acts of government or force majeure—the following will apply:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>All payments received will be transferred as credit toward the subsequent Workshop session.</li>
            <li>No cash refunds will be issued unless required by applicable law.</li>
            <li>Vocal Excellence will make all reasonable efforts to notify participants of any changes as promptly as possible, and further details will be communicated as circumstances evolve.</li>
          </ul>

          <h2 className="font-serif text-xl font-medium text-gray-900 mt-8 mb-4">6. Acknowledgement and Consent</h2>
          <p className="text-gray-700">
            By submitting your payment for the Workshop, you acknowledge that you have read, fully understood, and agreed to abide by the terms of this Cancellation Policy as well as the overall Terms and Conditions of enrolment for the Workshop. You further confirm that you accept these terms as a condition of participation in the Workshop.
          </p>

          <h2 className="font-serif text-xl font-medium text-gray-900 mt-8 mb-4">7. Governing Law and Jurisdiction</h2>
          <p className="text-gray-700">
            This Cancellation Policy shall be governed by and interpreted in accordance with the laws of Cyprus. All disputes arising out of or in connection with this Policy shall be subject to the exclusive jurisdiction of the courts located in Cyprus.
          </p>

          <h2 className="font-serif text-xl font-medium text-gray-900 mt-8 mb-4">8. Disclaimer</h2>
          <p className="text-gray-700">
            This Cancellation Policy is provided solely for informational purposes and does not constitute legal advice. Participants are encouraged to consult with a legal professional if they require advice regarding their rights or obligations under this Policy.
          </p>

          <p className="text-gray-700 mt-8 mb-4">
            By completing your registration payment, you affirm your consent to these terms and conditions. Vocal Excellence reserves the right to amend this Cancellation Policy, and any modifications will be communicated to registered participants or posted on our official website.
          </p>

          <p className="text-gray-700">
            If you have any questions regarding this policy, please contact our administrative office at info@vocalexcellence.cy or call +357 25 775 885.
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CancellationPolicy;
