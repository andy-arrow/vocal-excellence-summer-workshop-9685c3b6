
import React from 'react';

const ApplicationHero = () => {
  return (
    <section className="py-20 md:py-24 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-light mb-6 text-gray-800">
            Application Form
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light">
            Apply for the Summer Intensive program. Spaces are limited to ensure personalized attention,
            so early application is recommended.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ApplicationHero;
