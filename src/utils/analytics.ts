
// Define the window.dataLayer array if it doesn't exist
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize dataLayer
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

/**
 * Push an event to Google Tag Manager dataLayer
 * 
 * @param eventName - Name of the event
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  if (typeof window !== 'undefined') {
    // Add timestamp to all events for better analysis
    const eventWithTimestamp = {
      event: eventName,
      event_timestamp: new Date().toISOString(),
      ...eventParams
    };

    window.dataLayer.push(eventWithTimestamp);
    console.log(`Analytics event tracked: ${eventName}`, eventParams);
  }
};

/**
 * Track page view events
 * 
 * @param pagePath - Path of the page (optional, defaults to current path)
 * @param pageTitle - Title of the page (optional, defaults to document.title)
 */
export const trackPageView = (pagePath?: string, pageTitle?: string) => {
  if (typeof window === 'undefined') return;
  
  const path = pagePath || window.location.pathname;
  const title = pageTitle || document.title;
  
  trackEvent('page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
    page_hostname: window.location.hostname
  });
};

/**
 * Track user interactions like button clicks, form submissions, etc.
 * 
 * @param actionCategory - Category of the action (e.g., 'Button', 'Form', 'Link')
 * @param actionName - Specific action name (e.g., 'Click', 'Submit', 'Download')
 * @param actionLabel - Additional label for the action (optional)
 * @param actionValue - Numeric value associated with the action (optional)
 */
export const trackUserInteraction = (
  actionCategory: string,
  actionName: string,
  actionLabel?: string,
  actionValue?: number
) => {
  trackEvent('user_interaction', {
    action_category: actionCategory,
    action_name: actionName,
    action_label: actionLabel,
    action_value: actionValue
  });
};

/**
 * Track form submissions
 * 
 * @param formName - Name of the form
 * @param formStep - Step in multi-step forms (optional)
 * @param formSuccess - Whether submission was successful (optional)
 */
export const trackFormSubmission = (
  formName: string,
  formStep?: string | number,
  formSuccess?: boolean
) => {
  trackEvent('form_submission', {
    form_name: formName,
    form_step: formStep,
    form_success: formSuccess
  });
};

/**
 * Initialize analytics and track initial page view
 */
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Set global GTM variables if needed
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      'event': 'gtm.js',
      'app_version': '1.0.0', // Update with your app version
      'environment': process.env.NODE_ENV
    });
    
    // Track initial page view
    trackPageView();
    
    console.log('Google Tag Manager initialized');
  }
};

/**
 * Setup page view tracking for React Router
 * This function should be called whenever the route changes
 */
export const setupRouteChangeTracking = () => {
  // Function to handle route changes
  const handleRouteChange = () => {
    trackPageView();
  };

  return handleRouteChange;
};

/**
 * Track errors for monitoring
 * 
 * @param errorType - Type of error
 * @param errorMessage - Error message
 * @param errorDetails - Additional error details
 */
export const trackError = (
  errorType: string,
  errorMessage: string,
  errorDetails?: Record<string, any>
) => {
  trackEvent('error_occurred', {
    error_type: errorType,
    error_message: errorMessage,
    error_details: errorDetails,
    page_url: window.location.href
  });
};

/**
 * Track feature usage
 * 
 * @param featureName - Name of the feature
 * @param featureParams - Additional parameters for the feature
 */
export const trackFeatureUsage = (
  featureName: string,
  featureParams: Record<string, any> = {}
) => {
  trackEvent('feature_used', {
    feature_name: featureName,
    ...featureParams
  });
};
