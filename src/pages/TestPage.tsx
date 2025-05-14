
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isAuthorizedAdmin, logAdminAccessAttempt } from '@/utils/accessControl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { AlertTriangle, ChevronLeft } from 'lucide-react';

const TestPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user ? isAuthorizedAdmin(user.email) : false;

  // Log access attempt
  React.useEffect(() => {
    logAdminAccessAttempt(user?.email, isAdmin);
    
    // If not an admin, redirect to home
    if (!isAdmin) {
      navigate('/', { replace: true });
    }
  }, [user, isAdmin, navigate]);

  // Show nothing during redirect if not admin
  if (!isAdmin) {
    return null;
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

          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Test Section</h2>
              <p className="text-slate-600">
                This is a private test page that you can use for testing new features 
                or configurations before making them public.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-100 p-4 rounded-lg">
                <h3 className="font-medium text-slate-700 mb-2">Content Block 1</h3>
                <p className="text-sm text-slate-600">
                  Use this space for testing new content, features, or layouts.
                </p>
              </div>
              
              <div className="bg-slate-100 p-4 rounded-lg">
                <h3 className="font-medium text-slate-700 mb-2">Content Block 2</h3>
                <p className="text-sm text-slate-600">
                  Another test area for experimental features or content.
                </p>
              </div>
            </div>
            
            <div className="border-t border-slate-200 pt-6">
              <p className="text-sm text-slate-500 italic">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
      <ScrollToTopButton visible={true} />
    </div>
  );
};

export default TestPage;
