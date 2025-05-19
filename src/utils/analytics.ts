
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
    window.dataLayer.push({
      event: eventName,
      ...eventParams
    });
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
  const path = pagePath || window.location.pathname;
  const title = pageTitle || document.title;
  
  trackEvent('page_view', {
    page_path: path,
    page_title: title
  });
};

/**
 * Initialize analytics and track initial page view
 */
export const initializeAnalytics = () => {
  // Track initial page view
  trackPageView();
  
  console.log('Google Tag Manager initialized');
};
