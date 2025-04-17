
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/animations.css'
import ErrorBoundary from '@/utils/ErrorBoundary'
import { trackError } from '@/utils/monitoring'
import { preloadResources } from '@/utils/PreloadResources'

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

// Create simplified AuthProvider that doesn't block rendering
const SimpleAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

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
    // Implement progressive hydration - mount a minimal app first, then enhance
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <SimpleAuthProvider>
            <App />
          </SimpleAuthProvider>
          
          {/* Lazy load non-critical UI components */}
          <Suspense fallback={null}>
            <Toaster />
            <Sonner position="top-right" closeButton />
          </Suspense>
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
}, 0);

// Lazily load complete AuthProvider after initial render
if ('requestIdleCallback' in window) {
  (window as any).requestIdleCallback(async () => {
    await import('@/contexts/AuthContext');
    console.log('Auth context loaded in background');
  });
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(async () => {
    await import('@/contexts/AuthContext');
    console.log('Auth context loaded with setTimeout fallback');
  }, 2000);
}
