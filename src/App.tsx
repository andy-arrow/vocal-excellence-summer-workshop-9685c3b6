
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PopupCredentialsLoader } from "./components/PopupCredentialsLoader";
import { PreloadResources } from "./utils/PreloadResources";
import ErrorBoundary from "./utils/ErrorBoundary";

const Index = lazy(() => import("./pages/Index"));
const Application = lazy(() => import("./pages/Application"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ApplicationPage = lazy(() => import("./pages/ApplicationPage"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

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
                    <Route path="/" element={<Index />} />
                    <Route path="/apply" element={<Application />} />
                    <Route path="/application" element={<ApplicationPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/terms" element={<TermsAndConditions />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="*" element={<NotFound />} />
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
