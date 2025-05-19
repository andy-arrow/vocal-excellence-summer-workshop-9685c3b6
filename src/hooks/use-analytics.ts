
import { useCallback } from 'react';
import { 
  trackEvent, 
  trackUserInteraction, 
  trackFormSubmission, 
  trackFeatureUsage, 
  trackError 
} from '@/utils/analytics';

/**
 * Hook for tracking analytics events throughout the application
 */
export const useAnalytics = () => {
  // Track custom events
  const trackCustomEvent = useCallback((eventName: string, eventParams: Record<string, any> = {}) => {
    trackEvent(eventName, eventParams);
  }, []);

  // Track user interactions (clicks, etc)
  const trackInteraction = useCallback((category: string, action: string, label?: string, value?: number) => {
    trackUserInteraction(category, action, label, value);
  }, []);

  // Track form submissions
  const trackForm = useCallback((formName: string, step?: string | number, success?: boolean) => {
    trackFormSubmission(formName, step, success);
  }, []);

  // Track feature usage
  const trackFeature = useCallback((featureName: string, params: Record<string, any> = {}) => {
    trackFeatureUsage(featureName, params);
  }, []);

  // Track errors
  const trackAppError = useCallback((type: string, message: string, details?: Record<string, any>) => {
    trackError(type, message, details);
  }, []);

  return {
    trackEvent: trackCustomEvent,
    trackInteraction,
    trackForm,
    trackFeature,
    trackAppError
  };
};
