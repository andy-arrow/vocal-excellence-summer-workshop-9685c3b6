
import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

// Import pages using proper default imports
const Index = lazy(() => import('./pages/Index'));
const Application = lazy(() => import('./pages/Application'));
const Tuition = lazy(() => import('./pages/Tuition'));
const CancellationPolicy = lazy(() => import('./pages/CancellationPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Auth = lazy(() => import('./pages/Auth'));
const TuitionRedirect = lazy(() => import('./components/TuitionRedirect'));
const SummerProgramme = lazy(() => import('./pages/SummerProgramme'));
const TestPage = lazy(() => import('./pages/TestPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Optimized loading fallback that doesn't block rendering
const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-slate-950">
    <div className="space-y-4 text-center">
      <div className="animate-spin w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full mx-auto"></div>
    </div>
  </div>
);

// Create router outside of component to avoid hook issues
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
    path: "/tuition",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Tuition />
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
  {
    path: "/pricing",
    element: (
      <Suspense fallback={<PageLoader />}>
        <TuitionRedirect />
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
    path: "/test",
    element: (
      <Suspense fallback={<PageLoader />}>
        <TestPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

// Preload routes after initial render
const preloadRoutes = () => {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      const routes = [
        import('./pages/Application'),
        import('./pages/Tuition'),
        import('./pages/CancellationPolicy'),
        import('./pages/TermsAndConditions'),
        import('./pages/PrivacyPolicy')
        // Removed Auth and SummerProgramme from preloading for non-admin users
      ];
      
      Promise.all(routes).catch(console.error);
    });
  }
};

// Start preloading after a short delay
setTimeout(preloadRoutes, 2000);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
