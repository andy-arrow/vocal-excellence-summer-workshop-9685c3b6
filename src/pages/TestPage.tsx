
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isAuthorizedAdmin, logAdminAccessAttempt } from '@/utils/accessControl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { AlertTriangle, ChevronLeft } from 'lucide-react';
import { useExitIntent } from '@/hooks/use-exit-intent';
import { VocalUpgradePopup } from '@/components/VocalUpgradePopup';
import { toast } from '@/hooks/use-toast';

const TestPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  
  const { 
    showExitIntent: showPopup, 
    setShowExitIntent: setShowPopup
  } = useExitIntent({
    threshold: 20,
    scrollThreshold: 50, // Show after 50% scroll
    maxDisplays: 1
  });

  // Check admin status and log access attempt
  useEffect(() => {
    const adminStatus = user ? isAuthorizedAdmin(user.email) : false;
    setIsAdmin(adminStatus);
    logAdminAccessAttempt(user?.email, adminStatus);
    
    // If not an admin, redirect to home after a short delay
    if (!adminStatus) {
      // Now directly calling the toast function
      toast({
        title: "Access Denied",
        description: "You do not have permission to view this page.",
        variant: "destructive",
      });
      
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1500);
    }
  }, [user, navigate]);

  // If checking admin status, show loading
  if (user && isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If not admin, show nothing during redirect
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <h2 className="text-xl font-bold">Access Restricted</h2>
        <p className="text-gray-600">Redirecting to homepage...</p>
      </div>
    );
  }

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
            <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium mb-3">
              Admin Only
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Test Page</h1>
            <p className="text-slate-500 mt-2">
              This page is only visible to administrators.
            </p>
          </header>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-700">Admin Access Only</h3>
                <p className="text-sm text-blue-600 mt-1">
                  This page is restricted to administrative users. Your access has been logged.
                </p>
              </div>
            </div>
          </div>

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
                As an admin, you can manually trigger the popup to review its functionality.
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
