
// Google Ads and analytics tracking utility

/**
 * Google Ads conversion tracking configuration
 * Replace these with your actual Google Ads conversion IDs and labels
 */
export const GOOGLE_ADS_CONFIG = {
  conversionId: 'AW-CONVERSION_ID', // Replace with your actual Google Ads conversion ID
  conversionLabel: {
    signUp: 'SIGNUP_LABEL', // Replace with your actual conversion label for sign-ups
    applicationSubmit: 'APPLICATION_SUBMIT_LABEL', // Replace with your actual conversion label for application submissions
    contactForm: 'CONTACT_FORM_LABEL', // Replace with your actual conversion label for contact form submissions
    programmeView: 'PROGRAMME_VIEW_LABEL', // Replace with your actual conversion label for programme views
  },
};

/**
 * Track a page view in Google Analytics and Google Ads
 */
export function trackPageView(path: string, title: string) {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      console.log(`Analytics: Tracking page view - ${path}`);
      window.gtag('config', 'AW-' + GOOGLE_ADS_CONFIG.conversionId, {
        page_path: path,
        page_title: title,
      });
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

/**
 * Track a Google Ads conversion event
 */
export function trackConversion(
  label: string,
  value?: number,
  transactionId?: string,
  currency?: string,
  customData?: Record<string, any>
) {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      console.log(`Analytics: Tracking conversion - ${label}`);
      const conversionData: Record<string, any> = {
        send_to: `AW-${GOOGLE_ADS_CONFIG.conversionId}/${label}`,
      };

      if (value !== undefined) conversionData.value = value;
      if (currency) conversionData.currency = currency;
      if (transactionId) conversionData.transaction_id = transactionId;
      
      if (customData) {
        Object.keys(customData).forEach(key => {
          conversionData[key] = customData[key];
        });
      }

      window.gtag('event', 'conversion', conversionData);
    }
  } catch (error) {
    console.error('Error tracking conversion:', error);
  }
}

/**
 * Track a general event for Google Analytics and Google Ads
 */
export function trackEvent(
  category: string,
  action: string,
  label?: string,
  value?: number,
  nonInteraction: boolean = false,
  customData?: Record<string, any>
) {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      console.log(`Analytics: Tracking event - ${category}:${action}${label ? `:${label}` : ''}`);
      
      const eventData: Record<string, any> = {
        event_category: category,
        event_label: label,
        value: value,
        non_interaction: nonInteraction,
      };
      
      if (customData) {
        Object.keys(customData).forEach(key => {
          eventData[key] = customData[key];
        });
      }

      window.gtag('event', action, eventData);
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}

/**
 * Track application form steps
 */
export function trackFormStep(
  formName: string,
  stepNumber: number,
  stepName: string
) {
  trackEvent(
    'Form',
    'step_completion',
    `${formName}_step${stepNumber}_${stepName}`,
    stepNumber
  );
}

/**
 * Track form submissions
 */
export function trackFormSubmission(
  formName: string,
  success: boolean,
  data?: Record<string, any>
) {
  trackEvent(
    'Form',
    'submission',
    `${formName}_${success ? 'success' : 'failure'}`,
    undefined,
    false,
    data
  );
  
  // If it's a successful application form submission, track as a conversion
  if (success && formName === 'application') {
    trackConversion(
      GOOGLE_ADS_CONFIG.conversionLabel.applicationSubmit,
      undefined,
      `app_${Date.now()}`,
      undefined,
      { form_name: formName }
    );
  } else if (success && formName === 'contact') {
    trackConversion(
      GOOGLE_ADS_CONFIG.conversionLabel.contactForm
    );
  }
}

/**
 * Track file uploads
 */
export function trackFileUpload(fileType: string, fileSizeKb: number) {
  trackEvent(
    'Interaction',
    'file_upload',
    fileType,
    fileSizeKb
  );
}

/**
 * Track user engagement time
 */
let sessionStartTime = Date.now();
let lastActiveTime = Date.now();
let isTracking = false;

export function startEngagementTracking() {
  if (isTracking) return;
  
  isTracking = true;
  sessionStartTime = Date.now();
  lastActiveTime = Date.now();
  
  const trackActivity = () => {
    lastActiveTime = Date.now();
  };
  
  // Reset timer on user activity
  ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    window.addEventListener(event, trackActivity, { passive: true });
  });
  
  // Track session time every minute
  const intervalId = setInterval(() => {
    const now = Date.now();
    const totalTimeMs = now - sessionStartTime;
    const totalTimeMinutes = Math.floor(totalTimeMs / 60000);
    
    // Only track if user has been active in the last 2 minutes
    if (now - lastActiveTime < 120000) {
      trackEvent(
        'Engagement',
        'session_duration',
        `${totalTimeMinutes}_minutes`,
        totalTimeMinutes,
        true
      );
    }
  }, 60000);
  
  // Clean up when window unloads
  window.addEventListener('beforeunload', () => {
    clearInterval(intervalId);
    const totalTimeMs = Date.now() - sessionStartTime;
    const totalTimeMinutes = Math.floor(totalTimeMs / 60000);
    
    trackEvent(
      'Engagement',
      'total_session_duration',
      `${totalTimeMinutes}_minutes`,
      totalTimeMinutes,
      true
    );
  });
}

// Re-export needed functions to ensure type safety for window.gtag
export interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

// Extend the Window interface to include gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
