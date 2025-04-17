
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

// Lazy load the toasts and UI components that aren't needed immediately
const Toaster = lazy(() => import('@/components/ui/toaster').then(module => ({
  default: module.Toaster
})));
const Sonner = lazy(() => import('@/components/ui/sonner').then(module => ({
  default: module.Toaster
})));

// Set up global error handler with debouncing to prevent error storms
let lastErrorTime = 0;
const ERROR_THROTTLE_MS = 1000; // 1 second

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

// Simple loading fallback that doesn't block main thread
const LoadingFallback = () => null;

// Measure and report performance
const reportWebVitals = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    // Use requestIdleCallback to ensure we don't block rendering
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        setTimeout(() => {
          const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navEntry) {
            console.log(`Page load time: ${navEntry.loadEventEnd - navEntry.startTime}ms`);
          }
        }, 0);
      });
    } else {
      setTimeout(() => {
        const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navEntry) {
          console.log(`Page load time: ${navEntry.loadEventEnd - navEntry.startTime}ms`);
        }
      }, 0);
    }
  }
};

// Start performance monitoring
reportWebVitals();

// Use createRoot in a microtask to avoid blocking main thread
setTimeout(() => {
  // Get root element once to avoid repeated DOM access
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    // Initialize AuthContext
    import('@/contexts/AuthContext').then(({ AuthProvider }) => {
      // Implement progressive hydration - mount a minimal app first, then enhance
      const root = ReactDOM.createRoot(rootElement);
      
      root.render(
        <React.StrictMode>
          <ErrorBoundary>
            <AuthProvider>
              <App />
              
              {/* Lazy load non-critical UI components */}
              <Suspense fallback={null}>
                <Toaster />
                <Sonner position="top-right" closeButton />
              </Suspense>
            </AuthProvider>
          </ErrorBoundary>
        </React.StrictMode>
      );
      
      console.log('App rendered with AuthProvider');
    }).catch(error => {
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
    });
  }
}, 0);

// Remove the SimpleAuthProvider and lazy loading of AuthContext since we're now
// loading AuthContext properly with the app initialization
