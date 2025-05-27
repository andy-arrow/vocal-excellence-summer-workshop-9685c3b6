
import { useEffect } from 'react';

export const PreloadResources = () => {
  useEffect(() => {
    // Preload critical resources
    const criticalImages = [
      '/lovable-uploads/9994f82c-80e4-477a-b629-3bef5ef8f2c1.png', // Logo
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload fonts if any
    const criticalFonts = [
      // Add any critical font URLs here
    ];

    criticalFonts.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  return null;
};

export default PreloadResources;
