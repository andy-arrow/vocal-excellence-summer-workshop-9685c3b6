
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import Auth from '@/pages/Auth';
import Application from '@/pages/Application';
import NotFound from '@/pages/NotFound';
import TermsAndConditions from '@/pages/TermsAndConditions';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import CancellationPolicy from '@/pages/CancellationPolicy';
import Admin from '@/pages/Admin';
import SummerProgramme from '@/pages/SummerProgramme';
import ImageTest from '@/components/ImageTest';
import Index from '@/pages/Index';

// Protected Routes
import { ProtectedRoute, AdminRoute } from '@/utils/accessControl';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/image-test" element={<ImageTest />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/apply" element={
          <ProtectedRoute>
            <Application />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        } />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cancellation" element={<CancellationPolicy />} />
        <Route path="/summer-programme" element={<SummerProgramme />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
