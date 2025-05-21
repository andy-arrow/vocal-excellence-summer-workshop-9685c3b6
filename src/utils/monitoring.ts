
/**
 * Monitoring utility for tracking application events and errors
 */

export type EventType = 'auth' | 'api' | 'user_action' | 'error' | 'form_submission' | 'component_error' | 'form_submission_error';
type EventSeverity = 'info' | 'warning' | 'error' | 'critical';

interface EventPayload {
  message: string;
  details?: Record<string, any>;
  user?: string | null;
}

/**
 * Track an application event
 */
export function trackEvent(
  type: EventType,
  severity: EventSeverity,
  payload: EventPayload
) {
  // Log to console for development
  const eventData = {
    timestamp: new Date().toISOString(),
    type,
    severity,
    ...payload,
  };
  
  console.log(`[${severity.toUpperCase()}] ${type}: ${payload.message}`, eventData);
  
  // In production, you would send this to a monitoring service
  // This could be Sentry, LogRocket, etc.
  
  // For critical errors, we can also trigger alerts
  if (severity === 'critical') {
    triggerAlert(eventData);
  }
}

/**
 * Track an error event with stack trace
 */
export function trackError(
  type: EventType | string,
  error: Error | string,
  details?: Record<string, any>,
  user?: string | null,
) {
  const severity = type === 'error' ? 'error' : 'warning';
  
  let errorMessage: string;
  let errorStack: string | undefined;
  
  if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = error.message;
    errorStack = error.stack;
  }
  
  trackEvent(type as EventType, severity, {
    message: errorMessage,
    details: {
      ...details,
      stack: errorStack,
    },
    user,
  });
}

/**
 * Trigger an alert for critical events
 * This could integrate with Slack, email, SMS, etc.
 */
function triggerAlert(eventData: any) {
  // In production, this would send notifications through various channels
  console.warn('🚨 ALERT TRIGGERED:', eventData);
  
  // For demonstration, we'll show an alert in the UI using the toast system
  // This requires importing from outside this file, so we'll implement it elsewhere
}

/**
 * Performance monitoring for timing operations
 */
export function startPerfTimer(label: string): () => void {
  const start = performance.now();
  
  return () => {
    const duration = performance.now() - start;
    trackEvent('user_action', 'info', {
      message: `Performance: ${label}`,
      details: { durationMs: Math.round(duration) },
    });
  };
}

/**
 * Web vitals reporting function 
 */
export function reportWebVitals(): void {
  // Check if the browser supports the web vitals API
  try {
    // Import web-vitals correctly using the modern API
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
      // Register the web vitals metrics
      onCLS(sendToAnalytics);
      onFID(sendToAnalytics);
      onFCP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
      
      // Track INP (Interaction to Next Paint) if available
      if (onINP) {
        onINP(sendToAnalytics);
      }
    }).catch(err => {
      console.error('Failed to load web-vitals:', err);
    });
  } catch (error) {
    console.error('Error setting up web vitals reporting:', error);
  }
}

function sendToAnalytics({ name, value, id }: { name: string, value: number, id: string }) {
  // In production, send metrics to analytics service
  trackEvent('user_action', 'info', {
    message: `Web Vital: ${name}`,
    details: { metricName: name, value: Math.round(value), id }
  });
}
