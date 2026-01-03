import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/animations.css'
import ErrorBoundary from '@/utils/ErrorBoundary'
import { preloadResources } from '@/utils/PreloadResources'
import { ThemeProvider } from 'next-themes'
import { initializeAnalytics } from '@/utils/analytics'
import { Toaster } from '@/components/ui/toaster';

preloadResources();

try {
  console.log('Initializing analytics in main.tsx');
  initializeAnalytics();
  
  if (typeof window !== 'undefined' && !window.dataLayer) {
    console.warn('Warning: dataLayer not available after initialization');
    window.dataLayer = [];
  } else {
    console.log('GTM dataLayer initialized successfully');
  }
} catch (error) {
  console.error('Failed to initialize analytics:', error);
}

if (typeof window !== 'undefined') {
  const originalOnError = window.onerror;
  const originalOnUnhandledRejection = window.onunhandledrejection;
  
  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Uncaught error detected:', { message, source, lineno, colno, error });
    
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
    
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    
    return false;
  };
  
  window.onunhandledrejection = function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'promise_rejection',
        'error_message': event.reason?.message || 'Unknown promise rejection',
        'error_stack': event.reason?.stack || 'N/A',
        'page_url': window.location.href,
        'timestamp': new Date().toISOString()
      });
    }
    
    if (originalOnUnhandledRejection) {
      return originalOnUnhandledRejection.call(window, event);
    }
  };
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider attribute="class" defaultTheme="light">
          <App />
          <Toaster />
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log('App rendered successfully');
  
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      import('@/utils/monitoring').then(({ reportWebVitals }) => {
        reportWebVitals();
      });
    });
  }
}
