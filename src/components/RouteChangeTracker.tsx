
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/analytics';

/**
 * Component that tracks page views when routes change
 * This is used as a wrapper around routes in the application
 */
export const RouteChangeTracker = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Extract page title from document or try to derive from path
    const getPageTitle = () => {
      // First try to get the document title
      if (document.title && document.title !== "") {
        return document.title;
      }
      
      // If document title is empty, try to derive from path
      const path = location.pathname;
      if (path === "/") return "Home";
      
      // Convert path to title case (e.g., /about-us -> About Us)
      return path
        .replace(/^\//g, '') // Remove leading slash
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') || "Page";
    };
    
    // Track page view with enhanced information
    trackPageView(
      location.pathname, 
      getPageTitle()
    );
  }, [location]);
  
  return <>{children}</>;
};

export default RouteChangeTracker;
