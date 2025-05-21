import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/animations.css'
import ErrorBoundary from '@/utils/ErrorBoundary'
import { preloadResources } from '@/utils/PreloadResources'
import { ThemeProvider } from 'next-themes'
import { initializeAnalytics } from '@/utils/analytics'

// Preload critical resources immediately
preloadResources();

// Initialize analytics immediately with more robust error handling
try {
  console.log('Initializing analytics in main.tsx');
  initializeAnalytics();
  
  // Verify GTM initialization
  if (typeof window !== 'undefined' && !window.dataLayer) {
    console.warn('Warning: dataLayer not available after initialization');
    // Create fallback dataLayer if missing
    window.dataLayer = [];
  } else {
    console.log('GTM dataLayer initialized successfully');
  }
} catch (error) {
  console.error('Failed to initialize analytics:', error);
}

// Import non-lazy components directly
import { Toaster } from '@/components/ui/toaster';

// Make sure GTM can track uncaught errors reliably
if (typeof window !== 'undefined') {
  // Keep reference to original handlers
  const originalOnError = window.onerror;
  const originalOnUnhandledRejection = window.onunhandledrejection;
  
  // Enhanced error tracking for uncaught exceptions
  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Uncaught error detected:', { message, source, lineno, colno, error });
    
    // Track the error with GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'javascript_error',
        'error_message': message,
        'error_source': source,
        'error_line': lineno,
        'error_column': colno,
        'error_stack': error?.stack || 'N/A',
        'page_url': window.location.href,
        'timestamp': new Date().toISOString()
      });
    }
    
    // Call original handler if exists
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    
    // Return false to allow default browser error handling
    return false;
  };
  
  // Enhanced promise rejection tracking
  window.onunhandledrejection = (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    // Track the rejection with GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'promise_rejection',
        'error_message': event.reason?.message || 'Unknown promise rejection',
        'error_stack': event.reason?.stack || 'N/A',
        'page_url': window.location.href,
        'timestamp': new Date().toISOString()
      });
    }
    
    // Call original handler if exists
    if (originalOnUnhandledRejection) {
      return originalOnUnhandledRejection(event);
    }
  };
}

const initializeApp = async () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;
  
  try {
    const { AuthProvider } = await import('./contexts/AuthContext');
    const root = ReactDOM.createRoot(rootElement);
    
    // Re-verify GTM is initialized before rendering
    if (typeof window !== 'undefined' && !window.dataLayer) {
      console.warn('dataLayer still not available before render, re-initializing');
      initializeAnalytics();
    }
    
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
    
    console.log('App rendered successfully');
    
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
    
    // Track fatal initialization error
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        'event': 'fatal_initialization_error',
        'error_message': error?.message || 'Unknown initialization error',
        'error_stack': error?.stack || 'N/A',
        'timestamp': new Date().toISOString()
      });
    }
    
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <div className="p-6 text-center">
            <h2 className="text-xl text-red-500">Application failed to load</h2>
            <p className="mt-2">Please try refreshing the page</p>
            <p className="mt-4 text-sm text-gray-500">
              Error details: {error?.message || 'Unknown error'}
            </p>
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
