
import React from 'react';

const ApplicationHero = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-apple-dark to-apple-blue text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center bg-no-repeat opacity-20"></div>
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <span className="inline-block mb-3 py-1 px-4 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium tracking-wide">
          Summer Voice Programme 2025
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white mb-6 tracking-tight leading-tight">
          Advance Your Vocal Artistry
        </h1>
        <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          An intensive three-week programme for advanced vocal students and emerging professionals, led by distinguished faculty and guest artists.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#application-form" className="primary-button bg-white text-apple-dark hover:bg-white/90">
            Apply Now
          </a>
          <a href="#requirements" className="secondary-button bg-white/10 hover:bg-white/20">
            View Requirements
          </a>
        </div>
      </div>
    </section>
  );
};

export default ApplicationHero;
