
import React, { lazy, Suspense, useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import only the Index page normally since it's the most visited page
// but still use React.lazy for code splitting
const Index = lazy(() => import('./pages/Index'));

// Use lazy loading with more aggressive code splitting for less frequently visited pages
const Application = lazy(() => import('./pages/Application'));
const CancellationPolicy = lazy(() => import('./pages/CancellationPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

// Optimized loading fallback for lazy-loaded components
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-slate-950">
    <div className="space-y-4 text-center">
      <div className="animate-spin w-10 h-10 border-4 border-energy-pink/30 border-t-energy-pink rounded-full mx-auto"></div>
      <p className="text-white/80 text-sm">Loading...</p>
    </div>
  </div>
);

function App() {
  const [router, setRouter] = useState<any>(null);
  
  useEffect(() => {
    // Create router asynchronously to avoid blocking the main thread
    const initRouter = () => {
      const router = createBrowserRouter([
        {
          path: "/",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Index />
            </Suspense>
          ),
        },
        {
          path: "/apply",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Application />
            </Suspense>
          ),
        },
        {
          path: "/cancellation-policy",
          element: (
            <Suspense fallback={<PageLoader />}>
              <CancellationPolicy />
            </Suspense>
          ),
        },
        {
          path: "/terms-and-conditions",
          element: (
            <Suspense fallback={<PageLoader />}>
              <TermsAndConditions />
            </Suspense>
          ),
        },
        {
          path: "/privacy-policy",
          element: (
            <Suspense fallback={<PageLoader />}>
              <PrivacyPolicy />
            </Suspense>
          ),
        },
      ]);
      
      setRouter(router);
    };
    
    initRouter();
    
    // Preload other routes after initial page load
    const preloadRoutes = async () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(async () => {
          // Preload all other pages
          const importPromises = [
            import('./pages/Application'),
            import('./pages/CancellationPolicy'),
            import('./pages/TermsAndConditions'),
            import('./pages/PrivacyPolicy')
          ];
          
          // Use Promise.all to load in parallel but don't block rendering
          await Promise.all(importPromises);
          console.log('All routes preloaded');
        });
      }
    };
    
    // Start preloading after a short delay
    setTimeout(preloadRoutes, 2000);
  }, []);
  
  // Don't render anything until router is initialized
  if (!router) {
    return <PageLoader />;
  }

  return <RouterProvider router={router} />;
}

export default App;
