
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  trackPageView, 
  trackEvent, 
  trackConversion, 
  trackFormStep,
  trackFormSubmission,
  trackFileUpload,
  GOOGLE_ADS_CONFIG
} from '@/utils/analytics';

export function useAnalytics() {
  const location = useLocation();
  
  // Track page views when route changes
  useEffect(() => {
    const path = location.pathname + location.search;
    const title = document.title;
    trackPageView(path, title);
    
    // Track specific page views as conversions
    if (path === '/apply' || path.startsWith('/apply/')) {
      trackConversion(GOOGLE_ADS_CONFIG.conversionLabel.programmeView);
    }
  }, [location]);
  
  // Track button clicks
  const trackButtonClick = useCallback((buttonName: string, destination?: string) => {
    trackEvent('Interaction', 'button_click', buttonName, undefined, false, { destination });
  }, []);
  
  // Track navigation links
  const trackNavigation = useCallback((linkName: string, destination: string) => {
    trackEvent('Navigation', 'link_click', linkName, undefined, false, { destination });
  }, []);
  
  // Track form interactions
  const trackForm = {
    step: trackFormStep,
    submission: trackFormSubmission,
    fileUpload: trackFileUpload
  };
  
  // Track scroll depth
  useEffect(() => {
    let scrollDepthMarkers = [25, 50, 75, 90, 100];
    let scrollDepthTracked = new Set<number>();
    
    const handleScroll = () => {
      // Calculate the scroll depth as a percentage
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);
      
      // Check if we've passed any markers
      scrollDepthMarkers.forEach(marker => {
        if (scrollPercentage >= marker && !scrollDepthTracked.has(marker)) {
          scrollDepthTracked.add(marker);
          trackEvent('Engagement', 'scroll_depth', `${marker}%`, marker, true);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return {
    trackButtonClick,
    trackNavigation,
    trackEvent,
    trackConversion,
    trackForm
  };
}
