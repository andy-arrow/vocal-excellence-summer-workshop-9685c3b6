
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const SubmissionSuccessMessage = () => {
  return (
    <section id="application-form" className="py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <Alert className="mb-6 bg-green-50 border-green-100">
          <AlertTitle className="text-green-800 text-xl font-serif font-light">Application Submitted Successfully</AlertTitle>
          <AlertDescription className="text-green-700">
            <p className="mb-4">Thank you for applying to the Vocal Excellence Summer Workshop Summer Programme 2025. We have received your application and will be in touch shortly.</p>
            <p className="mb-4">A confirmation email has been sent to the email address you provided.</p>
            <p>If you have any questions in the meantime, please contact us at admissions@vocalexcellence.com.</p>
          </AlertDescription>
        </Alert>
      </div>
    </section>
  );
};

export default SubmissionSuccessMessage;
