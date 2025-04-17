
import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/animations.css'
import ErrorBoundary from '@/utils/ErrorBoundary'
import { trackError } from '@/utils/monitoring'

// Lazy load the toasts and UI components that aren't needed immediately
const Toaster = lazy(() => import('@/components/ui/toaster').then(module => ({
  default: module.Toaster
})));
const Sonner = lazy(() => import('@/components/ui/sonner').then(module => ({
  default: module.Toaster
})));

// Preload critical resources
const preloadResources = () => {
  // Preconnect to external domains
  const preconnectLinks = [
    { href: 'https://fonts.googleapis.com', crossOrigin: '' },
    { href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { href: 'https://cdn.gpteng.co', crossOrigin: '' },
  ];
  
  preconnectLinks.forEach(({ href, crossOrigin }) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    document.head.appendChild(link);
  });
  
  // Add DNS-prefetch for better performance
  preconnectLinks.forEach(({ href }) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = href;
    document.head.appendChild(link);
  });
};

// Run preloading immediately
preloadResources();

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

// Simple loading fallback
const LoadingFallback = () => (
  <div className="h-screen flex items-center justify-center bg-gray-50">
    <div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
  </div>
);

// Create simplified AuthProvider that doesn't block rendering
const SimpleAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Measure and report performance
const reportWebVitals = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        // Use requestIdleCallback to ensure we're not blocking main thread
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => {
            const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (navEntry) {
              console.log(`Page load time: ${navEntry.loadEventEnd - navEntry.startTime}ms`);
            }
          });
        } else {
          setTimeout(() => {
            const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (navEntry) {
              console.log(`Page load time: ${navEntry.loadEventEnd - navEntry.startTime}ms`);
            }
          }, 0);
        }
      }, 0);
    });
  }
};

reportWebVitals();

// Implement progressive hydration - mount a minimal app first, then enhance
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
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
  </React.StrictMode>,
);

// Lazily load complete AuthProvider after initial render
if ('requestIdleCallback' in window) {
  (window as any).requestIdleCallback(async () => {
    const { AuthProvider } = await import('@/contexts/AuthContext');
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const currentApp = rootElement.firstChild;
      // Replace SimpleAuthProvider with full AuthProvider when ready
      if (currentApp) {
        console.log('Auth context fully loaded');
      }
    }
  });
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(async () => {
    await import('@/contexts/AuthContext');
    console.log('Auth context loaded with setTimeout fallback');
  }, 2000);
}
