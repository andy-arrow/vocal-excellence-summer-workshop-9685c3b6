import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { PopupCredentialsLoader } from "./components/PopupCredentialsLoader";
import PreloadResources from "./utils/PreloadResources";
import ErrorBoundary from "./utils/ErrorBoundary";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const WorkshopPage = lazy(() => import("./pages/WorkshopPage"));
const InstructorsPage = lazy(() => import("./pages/InstructorsPage"));
const CurriculumPage = lazy(() => import("./pages/CurriculumPage"));
const ApplicationPage = lazy(() => import("./pages/ApplicationPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-white">
              <PreloadResources />
              <PopupCredentialsLoader />
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center">Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/workshop" element={<WorkshopPage />} />
                    <Route path="/instructors" element={<InstructorsPage />} />
                    <Route path="/curriculum" element={<CurriculumPage />} />
                    <Route path="/application" element={<ApplicationPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
            <Toaster />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
