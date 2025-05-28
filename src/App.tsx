
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PopupCredentialsLoader } from "./components/PopupCredentialsLoader";
import { PreloadResources } from "./utils/PreloadResources";
import ErrorBoundary from "./utils/ErrorBoundary";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Application = lazy(() => import("./pages/Application"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ApplicationPage = lazy(() => import("./pages/ApplicationPage"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Tuition = lazy(() => import("./pages/Tuition"));

// Create query client with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 bg-violet-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-4 bg-violet-500 rounded-full animate-pulse delay-75"></div>
      <div className="w-4 h-4 bg-violet-500 rounded-full animate-pulse delay-150"></div>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={300}>
          <BrowserRouter>
            <div className="min-h-screen bg-white">
              <PreloadResources />
              <PopupCredentialsLoader />
              
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/apply" element={<Application />} />
                  <Route path="/application" element={<ApplicationPage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/tuition" element={<Tuition />} />
                  <Route path="/terms" element={<TermsAndConditions />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              
              <Toaster />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
