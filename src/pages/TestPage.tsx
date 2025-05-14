
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { ChevronLeft } from 'lucide-react';
import { useExitIntent } from '@/hooks/use-exit-intent';
import { VocalUpgradePopup } from '@/components/VocalUpgradePopup';
import { toast } from '@/components/ui/use-toast';

const TestPage = () => {
  const navigate = useNavigate();
  
  const { 
    showExitIntent: showPopup, 
    setShowExitIntent: setShowPopup
  } = useExitIntent({
    threshold: 20,
    scrollThreshold: 50, // Show after 50% scroll
    maxDisplays: 1
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow container max-w-5xl mx-auto px-4 py-16 mt-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </button>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <header className="mb-8">
            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mb-3">
              Public Test Page
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Test Page</h1>
            <p className="text-slate-500 mt-2">
              This page is now accessible to everyone.
            </p>
          </header>

          <section className="space-y-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Lead Magnet Implementation</h2>
              <p className="text-slate-600">
                This page showcases our "1-Minute Vocal Upgrade Kit" lead magnet pop-up. It appears on exit intent or when you scroll 50% down the page.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-100 p-6 rounded-lg">
                <h3 className="font-medium text-slate-700 mb-3">Why This Works</h3>
                <ul className="space-y-3 text-sm text-slate-600 list-disc pl-5">
                  <li>Targeted at young singers seeking immediate improvement</li>
                  <li>Provides actionable warmups they can try today</li>
                  <li>Uses exit-intent to avoid interrupting the user experience</li>
                  <li>Voice type quiz increases engagement and segmentation</li>
                </ul>
              </div>
              
              <div className="bg-slate-100 p-6 rounded-lg">
                <h3 className="font-medium text-slate-700 mb-3">Lead Magnet Contents</h3>
                <ul className="space-y-3 text-sm text-slate-600 list-disc pl-5">
                  <li>3 West-End vocal warm-ups (30-second audio)</li>
                  <li>PDF cheat-sheet: "Fix Your Top 3 Pitch Problems"</li>
                  <li>2-minute video on beating audition nerves</li>
                  <li>Personalized by voice type (soprano, tenor, etc)</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-100 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Test Controls</h3>
              <p className="text-green-700 mb-4">
                You can manually trigger the popup to review its functionality.
              </p>
              <button
                onClick={() => setShowPopup(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
              >
                Show Popup Manually
              </button>
            </div>
            
            <div className="border-t border-slate-200 pt-6">
              <h3 className="font-medium text-slate-700 mb-3">Implementation Notes</h3>
              <p className="text-sm text-slate-600 mb-4">
                This implementation uses React hooks for exit intent detection and scroll position tracking.
                In a production environment, this would be connected to a CRM or email marketing system.
              </p>
              
              <p className="text-sm text-slate-500 italic">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
      <ScrollToTopButton visible={true} />
      
      {/* The Vocal Upgrade Kit Popup */}
      <VocalUpgradePopup 
        open={showPopup} 
        onOpenChange={setShowPopup}
      />
    </div>
  );
};

export default TestPage;
