
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/animations.css'
import ErrorBoundary from '@/utils/ErrorBoundary'
import { trackError } from '@/utils/monitoring'
import { preloadResources } from '@/utils/PreloadResources'
import { AuthProvider } from '@/contexts/AuthContext'

// Run preloading immediately
preloadResources();

// Initialize performance monitoring
let lastErrorTime = 0;
const ERROR_THROTTLE_MS = 1000;

// Lazily load non-critical UI components with better code splitting
const Toaster = lazy(() => 
  import('./components/ui/toaster').then(module => ({
    default: module.Toaster
  }))
);

const Sonner = lazy(() => 
  import('./components/ui/sonner').then(module => ({
    default: module.Toaster
  }))
);

// Error handler setup
const setupErrorHandlers = () => {
  window.addEventListener('error', (event) => {
    const now = Date.now();
    if (now - lastErrorTime > ERROR_THROTTLE_MS) {
      lastErrorTime = now;
      trackError('error', event.error || new Error(event.message), {
        source: event.filename,
        line: event.lineno,
        column: event.colno,
      });
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const now = Date.now();
    if (now - lastErrorTime > ERROR_THROTTLE_MS) {
      lastErrorTime = now;
      trackError('error', 
        event.reason instanceof Error 
          ? event.reason 
          : new Error(`Unhandled promise rejection: ${JSON.stringify(event.reason)}`),
        { type: 'unhandledrejection' }
      );
    }
  });
};

// Performance monitoring
const reportWebVitals = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const report = () => {
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navEntry) {
        console.log(`Page load time: ${navEntry.loadEventEnd - navEntry.startTime}ms`);
        
        // Report FCP
        const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
        if (fcpEntry) {
          console.log(`First Contentful Paint: ${fcpEntry.startTime}ms`);
        }
        
        // Report LCP
        const lcpEntry = performance.getEntriesByName('largest-contentful-paint')[0];
        if (lcpEntry) {
          console.log(`Largest Contentful Paint: ${lcpEntry.startTime}ms`);
        }
      }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => setTimeout(report, 0));
    } else {
      setTimeout(report, 0);
    }
  }
};

// Initialize app with optimized loading
const initializeApp = async () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  // Setup error handlers
  setupErrorHandlers();
  
  try {
    // Initialize auth context
    const { AuthProvider } = await import('./contexts/AuthContext');
    
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <AuthProvider>
            <App />
            <Suspense fallback={null}>
              <Toaster />
              <Sonner position="top-right" closeButton />
            </Suspense>
          </AuthProvider>
        </ErrorBoundary>
      </React.StrictMode>
    );
    
    console.log('App rendered with AuthProvider');
    
    // Start monitoring after initial render
    reportWebVitals();
    
  } catch (error) {
    console.error('Failed to load AuthContext:', error);
    
    // Fallback rendering without AuthProvider
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <div className="p-6 text-center">
            <h2 className="text-xl text-red-500">Authentication service is currently unavailable</h2>
            <p className="mt-2">Please try refreshing the page</p>
          </div>
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
};

// Use requestIdleCallback for non-critical initialization
if ('requestIdleCallback' in window) {
  (window as any).requestIdleCallback(() => {
    initializeApp();
  });
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(initializeApp, 1);
}
