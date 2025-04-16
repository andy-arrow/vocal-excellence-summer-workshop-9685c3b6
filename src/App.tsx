import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from '@/pages/HomePage';
import ApplicationPage from '@/pages/ApplicationPage';
import CancellationPolicy from '@/pages/CancellationPolicy';
import TermsAndConditions from '@/pages/TermsAndConditions';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/apply",
    element: <ApplicationPage />,
  },
  {
    path: "/cancellation-policy",
    element: <CancellationPolicy />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
