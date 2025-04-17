
import React, { lazy, Suspense, useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import pages using proper default imports
const Index = lazy(() => import('./pages/Index'));
const Application = lazy(() => import('./pages/Application'));
const CancellationPolicy = lazy(() => import('./pages/CancellationPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

// Optimized loading fallback that doesn't block rendering
const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-slate-950">
    <div className="space-y-4 text-center">
      <div className="animate-spin w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full mx-auto"></div>
    </div>
  </div>
);

function App() {
  const [router, setRouter] = useState<any>(null);
  
  useEffect(() => {
    // Create router asynchronously
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
    const preloadRoutes = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          const routes = [
            import('./pages/Application'),
            import('./pages/CancellationPolicy'),
            import('./pages/TermsAndConditions'),
            import('./pages/PrivacyPolicy')
          ];
          
          Promise.all(routes).catch(console.error);
        });
      }
    };
    
    // Start preloading after a short delay
    setTimeout(preloadRoutes, 2000);
  }, []);
  
  if (!router) {
    return <PageLoader />;
  }

  return <RouterProvider router={router} />;
}

export default App;
