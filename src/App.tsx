
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from './pages/Index';
import Application from './pages/Application';
import CancellationPolicy from './pages/CancellationPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/apply",
    element: <Application />,
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
