
import React from 'react';
import { useAnalytics } from '@/hooks/use-analytics';

/**
 * Higher-order component that adds analytics tracking to navigation items
 * 
 * @param Component The component to wrap with tracking
 */
export const withNavTracking = <P extends object>(Component: React.ComponentType<P>) => {
  return function TrackedNavigation(props: P) {
    const { trackInteraction } = useAnalytics();

    // Handler for tracking navigation events
    const handleNavigation = (sectionName: string) => {
      trackInteraction('Navigation', 'Click', sectionName);
    };

    // Extended props with tracking capability
    const extendedProps = {
      ...props,
      trackNavigation: handleNavigation
    };

    return <Component {...extendedProps as P} />;
  };
};

export default withNavTracking;
