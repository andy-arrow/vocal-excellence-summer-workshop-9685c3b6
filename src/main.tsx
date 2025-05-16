
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/animations.css'
import ErrorBoundary from '@/utils/ErrorBoundary'
import { preloadResources } from '@/utils/PreloadResources'
import { ThemeProvider } from 'next-themes'

// Preload critical resources immediately
preloadResources();

// Import non-lazy components directly
import { Toaster } from '@/components/ui/toaster';

const initializeApp = async () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;
  
  try {
    const { AuthProvider } = await import('./contexts/AuthContext');
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light">
            <AuthProvider>
              <App />
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </React.StrictMode>
    );
    
    // Report web vitals after initial render in idle time
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        import('@/utils/monitoring').then(({ reportWebVitals }) => {
          reportWebVitals();
        });
      });
    }
    
  } catch (error) {
    console.error('Failed to load application:', error);
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <div className="p-6 text-center">
            <h2 className="text-xl text-red-500">Application failed to load</h2>
            <p className="mt-2">Please try refreshing the page</p>
          </div>
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
};

// Use requestIdleCallback for non-critical initialization
if ('requestIdleCallback' in window) {
  (window as any).requestIdleCallback(initializeApp);
} else {
  setTimeout(initializeApp, 1);
}
