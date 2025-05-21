
/**
 * Analytics utilities for tracking user behavior
 * Uses Google Tag Manager for implementation
 */

// Track page views
export const trackPageView = (path: string, title?: string) => {
  try {
    if (!window.dataLayer) {
      console.warn("Analytics: dataLayer not found, initializing...");
      window.dataLayer = window.dataLayer || [];
    }
    
    const event = {
      event: "page_view",
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
      page_hostname: window.location.hostname,
      timestamp: new Date().toISOString()
    };

    console.info("Analytics event tracked: page_view", event);
    window.dataLayer.push(event);
  } catch (err) {
    console.error("Error tracking page view:", err);
  }
};

// Track user interactions (clicks, etc)
export const trackUserInteraction = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  try {
    if (!window.dataLayer) {
      console.warn("Analytics: dataLayer not found, initializing...");
      window.dataLayer = window.dataLayer || [];
    }
    
    const event = {
      event: "user_interaction",
      interaction_category: category,
      interaction_action: action,
      interaction_label: label,
      interaction_value: value,
      timestamp: new Date().toISOString()
    };

    console.info("Analytics event tracked: user_interaction", event);
    window.dataLayer.push(event);
  } catch (err) {
    console.error("Error tracking user interaction:", err);
  }
};

// Track form submissions
export const trackFormSubmission = (
  formName: string,
  step?: string | number,
  success?: boolean
) => {
  try {
    if (!window.dataLayer) {
      console.warn("Analytics: dataLayer not found, initializing...");
      window.dataLayer = window.dataLayer || [];
    }
    
    const event = {
      event: "form_submission",
      form_name: formName,
      form_step: step,
      submission_success: success,
      timestamp: new Date().toISOString()
    };

    console.info("Analytics event tracked: form_submission", event);
    window.dataLayer.push(event);
  } catch (err) {
    console.error("Error tracking form submission:", err);
  }
};

// Track feature usage
export const trackFeatureUsage = (
  featureName: string,
  params: Record<string, any> = {}
) => {
  try {
    if (!window.dataLayer) {
      console.warn("Analytics: dataLayer not found, initializing...");
      window.dataLayer = window.dataLayer || [];
    }
    
    const event = {
      event: "feature_usage",
      feature_name: featureName,
      ...params,
      timestamp: new Date().toISOString()
    };

    console.info("Analytics event tracked: feature_usage", event);
    window.dataLayer.push(event);
  } catch (err) {
    console.error("Error tracking feature usage:", err);
  }
};

// Track errors
export const trackError = (
  type: string,
  message: string,
  details?: Record<string, any>
) => {
  try {
    if (!window.dataLayer) {
      console.warn("Analytics: dataLayer not found, initializing...");
      window.dataLayer = window.dataLayer || [];
    }
    
    const event = {
      event: "error_occurred",
      error_type: type,
      error_message: message,
      error_details: details ? JSON.stringify(details) : undefined,
      page_url: window.location.href,
      timestamp: new Date().toISOString()
    };

    console.info("Analytics event tracked: error_occurred", event);
    window.dataLayer.push(event);
  } catch (err) {
    console.error("Error tracking error:", err);
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams: Record<string, any> = {}
) => {
  try {
    if (!window.dataLayer) {
      console.warn("Analytics: dataLayer not found, initializing...");
      window.dataLayer = window.dataLayer || [];
    }
    
    const event = {
      event: eventName,
      ...eventParams,
      timestamp: new Date().toISOString()
    };

    console.info(`Analytics event tracked: ${eventName}`, event);
    window.dataLayer.push(event);
  } catch (err) {
    console.error(`Error tracking ${eventName} event:`, err);
  }
};

// Initialize analytics and load GTM if needed
export const initializeAnalytics = () => {
  try {
    console.log("Initializing analytics...");
    if (!window.dataLayer) {
      window.dataLayer = [];
      console.log("Created dataLayer");
    }
    
    // Push GTM version info
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
      environment: import.meta.env.MODE || 'development'
    });
    
    console.log("Analytics initialized successfully");
    return true;
  } catch (err) {
    console.error("Failed to initialize analytics:", err);
    return false;
  }
};

// Add tracking for application form specific events
export const trackApplicationFormEvent = (
  step: string,
  action: string,
  details?: Record<string, any>
) => {
  try {
    trackEvent('application_form', {
      step,
      action,
      ...details,
    });
  } catch (err) {
    console.error("Error tracking application form event:", err);
  }
};
