
import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PopupCredentialsLoader } from "./components/PopupCredentialsLoader";
import { PreloadResources } from "./utils/PreloadResources";
import ErrorBoundary from "./utils/ErrorBoundary";

// Lazy load components (use .tsx extension so resolution never picks pages/index.ts barrel)
const Index = lazy(() => import("./pages/Index.tsx"));
const Application = lazy(() => import("./pages/Application.tsx"));
const HomePage = lazy(() => import("./pages/HomePage.tsx"));
const ApplicationPage = lazy(() => import("./pages/ApplicationPage.tsx"));
const Auth = lazy(() => import("./pages/Auth.tsx"));
const Admin = lazy(() => import("./pages/Admin.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Terms = lazy(() => import("./pages/Terms/index.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const Tuition = lazy(() => import("./pages/Tuition.tsx"));
const EmailExtract = lazy(() => import("./pages/EmailExtract.tsx"));
const SummerProgramme = lazy(() => import("./pages/SummerProgramme.tsx"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess.tsx"));
const PaymentCancelled = lazy(() => import("./pages/PaymentCancelled.tsx"));

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
          <HelmetProvider>
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
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/tuition" element={<Tuition />} />
                  <Route path="/summer-programme" element={<SummerProgramme />} />
                  <Route path="/email-extract" element={<EmailExtract />} />

                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/payment-cancelled" element={<PaymentCancelled />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              
              <Toaster />
            </div>
          </BrowserRouter>
          </HelmetProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
