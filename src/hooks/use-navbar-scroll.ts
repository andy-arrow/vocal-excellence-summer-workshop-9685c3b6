
import { useState, useEffect } from 'react';

export function useNavbarScroll() {
  const [visible, setVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Make navbar visible when:
          // 1. User scrolls up
          // 2. User is at the top of the page
          if (currentScrollY < lastScrollY || currentScrollY < 10) {
            setVisible(true);
          } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
            // Hide when scrolling down and not at the top
            setVisible(false);
          }
          
          setScrollPosition(currentScrollY);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Add passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { visible, scrollPosition };
}
