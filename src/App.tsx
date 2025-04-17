
import React, { lazy, Suspense, useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Only import Index page normally as it's the most visited
const Index = lazy(() => 
  import('./pages/Index').then(module => ({
    default: module.Index,
    __esModule: true,
  }))
);

// Use more aggressive code splitting for less frequently visited pages
const Application = lazy(() => 
  import('./pages/Application').then(module => ({
    default: module.Application,
    __esModule: true,
  }))
);

const CancellationPolicy = lazy(() => 
  import('./pages/CancellationPolicy').then(module => ({
    default: module.CancellationPolicy,
    __esModule: true,
  }))
);

const TermsAndConditions = lazy(() => 
  import('./pages/TermsAndConditions').then(module => ({
    default: module.TermsAndConditions,
    __esModule: true,
  }))
);

const PrivacyPolicy = lazy(() => 
  import('./pages/PrivacyPolicy').then(module => ({
    default: module.PrivacyPolicy,
    __esModule: true,
  }))
);

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
