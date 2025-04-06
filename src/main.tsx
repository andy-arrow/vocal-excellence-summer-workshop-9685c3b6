
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './styles/animations.css'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import ErrorBoundary from '@/utils/ErrorBoundary'
import { trackError } from '@/utils/monitoring'

// Set up global error handler
window.addEventListener('error', (event) => {
  trackError('error', event.error || new Error(event.message), {
    source: event.filename,
    line: event.lineno,
    column: event.colno,
  });
});

window.addEventListener('unhandledrejection', (event) => {
  trackError('error', 
    event.reason instanceof Error 
      ? event.reason 
      : new Error(`Unhandled promise rejection: ${JSON.stringify(event.reason)}`),
    { type: 'unhandledrejection' }
  );
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
      <Toaster />
      <Sonner position="top-right" closeButton />
    </ErrorBoundary>
  </React.StrictMode>,
)
