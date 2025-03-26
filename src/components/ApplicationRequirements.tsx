
import React from 'react';

const ApplicationRequirements = () => {
  return (
    <section className="py-16 md:py-20 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-light mb-8 text-gray-800">
            Application Requirements
          </h2>
          
          <div className="space-y-6 text-gray-600 font-light">
            <p>
              We welcome applications from singers of all backgrounds who are serious about developing their vocal technique and performance skills. 
              Please prepare the following for your application:
            </p>
            
            <ul className="list-disc pl-5 space-y-3">
              <li>Personal information and contact details</li>
              <li>Musical background and experience</li>
              <li>Two contrasting repertoire selections that best represent your current abilities</li>
              <li>A brief statement explaining why you wish to attend this program</li>
              <li>Optional: letter of recommendation from a voice teacher or music professional</li>
            </ul>
            
            <p>
              Applications are reviewed on a rolling basis, and applicants will be notified of their status within two weeks of submission.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationRequirements;
