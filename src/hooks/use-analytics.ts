
import { useCallback } from 'react';
import { 
  trackEvent, 
  trackUserInteraction, 
  trackFormSubmission, 
  trackFeatureUsage, 
  trackError 
} from '@/utils/analytics';

// Define acceptable error types - made more flexible to accept string for future expansion
export type EventType = 
  | 'component_error'
  | 'api_error'
  | 'validation_error'
  | 'auth_error'
  | 'form_submission_error'
  | 'upload_error'
  | 'navigation_error'
  | 'feature_error'
  | 'system_error'
  | string; // Allow any string for flexibility

/**
 * Hook for tracking analytics events throughout the application
 */
export const useAnalytics = () => {
  // Track custom events
  const trackCustomEvent = useCallback((eventName: string, eventParams: Record<string, any> = {}) => {
    console.log(`Analytics: Tracking event "${eventName}"`, eventParams);
    trackEvent(eventName, eventParams);
  }, []);

  // Track user interactions (clicks, etc)
  const trackInteraction = useCallback((category: string, action: string, label?: string, value?: number) => {
    console.log(`Analytics: Tracking interaction - ${category} / ${action} / ${label || 'n/a'}`);
    trackUserInteraction(category, action, label, value);
  }, []);

  // Track form submissions with enhanced debugging
  const trackForm = useCallback((formName: string, step?: string | number, success?: boolean) => {
    console.log(`Analytics: Tracking form "${formName}" at step "${step}" (success: ${success})`);
    trackFormSubmission(formName, step, success);
  }, []);

  // Track feature usage
  const trackFeature = useCallback((featureName: string, params: Record<string, any> = {}) => {
    console.log(`Analytics: Tracking feature usage "${featureName}"`, params);
    trackFeatureUsage(featureName, params);
  }, []);

  // Track errors with detailed information
  const trackAppError = useCallback((type: EventType, message: string | Error, details?: Record<string, any>) => {
    const errorMessage = typeof message === 'string' ? message : message.message;
    console.log(`Analytics: Tracking error "${type}" - ${errorMessage}`, details);
    
    // Track in console for debugging
    console.error(`[ERROR-TRACKING] ${type}: ${errorMessage}`, details);
    
    // Send to analytics
    trackError(type, message, details);
    
    // Also track as a custom event for better visibility in analytics tools
    trackEvent('application_error', {
      error_type: type,
      error_message: errorMessage,
      ...details
    });
  }, []);

  return {
    trackEvent: trackCustomEvent,
    trackInteraction,
    trackForm,
    trackFeature,
    trackAppError
  };
};
