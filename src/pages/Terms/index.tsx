
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DefSection from '@/components/Terms/DefSection';
import AcceptanceSection from '@/components/Terms/AcceptanceSection';
import ProgrammeChangesSection from '@/components/Terms/ProgrammeChangesSection';

const Terms = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-slate-900">Terms and Conditions</h1>
          <p className="text-lg text-slate-600">Please read these terms carefully before applying to the Vocal Excellence Summer Programme.</p>
        </div>
        
        <div className="space-y-12">
          <DefSection />
          <AcceptanceSection />
          <ProgrammeChangesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
