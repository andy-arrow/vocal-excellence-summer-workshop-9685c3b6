import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import pages using lazy loading
const Index = lazy(() => import('./pages/Index'));
const Application = lazy(() => import('./pages/Application'));
const CancellationPolicy = lazy(() => import('./pages/CancellationPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Auth = lazy(() => import('./pages/Auth'));
const SummerProgramme = lazy(() => import('./pages/SummerProgramme'));

// Import the new LiveChat component and SocialProofCarousel
import LiveChat from './components/LiveChat';
import SocialProofCarousel from './components/SocialProofCarousel';

// Optimized loading fallback
const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-slate-950">
    <div className="space-y-4 text-center">
      <div className="animate-spin w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full mx-auto"></div>
    </div>
  </div>
);

function App() {
  // Router configuration
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
      path: "/auth",
      element: (
        <Suspense fallback={<PageLoader />}>
          <Auth />
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
    {
      path: "/summer-programme",
      element: (
        <Suspense fallback={<PageLoader />}>
          <SummerProgramme />
        </Suspense>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      
      {/* Add LiveChat component */}
      <LiveChat />
    </>
  );
}

export default App;
