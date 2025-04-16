import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/animations.css'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import ErrorBoundary from '@/utils/ErrorBoundary'
import { trackError } from '@/utils/monitoring'
import Spinner from '@/components/ui/spinner'
import { AuthProvider } from '@/contexts/AuthContext'

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
    <Spinner size="lg" color="primary" />
  </div>
);

// Measure and report performance
const reportWebVitals = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navEntry) {
          console.log(`Page load time: ${navEntry.loadEventEnd - navEntry.startTime}ms`);
        }
      }, 0);
    });
  }
};

reportWebVitals();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Suspense>
      <Toaster />
      <Sonner position="top-right" closeButton />
    </ErrorBoundary>
  </React.StrictMode>,
);
