
import { useState, useEffect } from 'react';

interface ExitIntentOptions {
  threshold?: number;
  maxDisplays?: number;
  scrollThreshold?: number;
  eventThrottle?: number;
  onExitIntent?: () => void;
}

/**
 * Hook to detect when the user intends to exit the page (moving cursor to top of window)
 * or has scrolled past a certain threshold
 */
export function useExitIntent({
  threshold = 20,
  maxDisplays = 1,
  scrollThreshold = 50,
  eventThrottle = 200,
  onExitIntent
}: ExitIntentOptions = {}) {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [displays, setDisplays] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    let throttleTimeout: number | null = null;
    let lastScrollY = window.scrollY;

    const calculateScrollPercentage = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight) * 100;
      setScrollPercentage(scrollPercent);
      
      return scrollPercent;
    };

    const shouldShowExitIntent = () => {
      if (displays >= maxDisplays) return false;
      return true;
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (throttleTimeout !== null) return;
      
      throttleTimeout = window.setTimeout(() => {
        throttleTimeout = null;
      }, eventThrottle);

      const shouldShow = e.clientY <= threshold && shouldShowExitIntent();
      
      if (shouldShow && !showExitIntent) {
        setDisplays(prev => prev + 1);
        setShowExitIntent(true);
        if (onExitIntent) onExitIntent();
      }
    };

    const handleScroll = () => {
      if (throttleTimeout !== null) return;
      
      throttleTimeout = window.setTimeout(() => {
        throttleTimeout = null;
        
        const scrollPercent = calculateScrollPercentage();
        const shouldShow = scrollPercent >= scrollThreshold && shouldShowExitIntent();
        
        if (shouldShow && !showExitIntent) {
          setDisplays(prev => prev + 1);
          setShowExitIntent(true);
          if (onExitIntent) onExitIntent();
        }
      }, eventThrottle);
    };

    // Initial scroll percentage calculation
    calculateScrollPercentage();

    // Add event listeners
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => {
      if (throttleTimeout !== null) {
        window.clearTimeout(throttleTimeout);
      }
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, maxDisplays, scrollThreshold, eventThrottle, displays, showExitIntent, onExitIntent]);

  return {
    showExitIntent,
    setShowExitIntent,
    displays,
    scrollPercentage
  };
}
