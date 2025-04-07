
/**
 * Monitoring utility for tracking application events and errors
 */

type EventType = 'auth' | 'api' | 'user_action' | 'error' | 'form_submission' | 'component_error';
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
  type: EventType,
  error: Error,
  details?: Record<string, any>,
  user?: string | null,
) {
  const severity = type === 'error' ? 'error' : 'warning';
  
  trackEvent(type, severity, {
    message: error.message,
    details: {
      ...details,
      stack: error.stack,
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
