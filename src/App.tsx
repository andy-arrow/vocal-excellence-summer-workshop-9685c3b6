
import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import the Index page normally since it's the most visited page
import Index from './pages/Index';

// Use lazy loading for less frequently visited pages
const Application = lazy(() => import('./pages/Application'));
const CancellationPolicy = lazy(() => import('./pages/CancellationPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

// Loading fallback for lazy-loaded components
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-slate-950">
    <div className="space-y-4 text-center">
      <div className="animate-spin w-10 h-10 border-4 border-energy-pink/30 border-t-energy-pink rounded-full mx-auto"></div>
      <p className="text-white/80 text-sm">Loading...</p>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
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

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
