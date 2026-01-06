
import { useEffect } from 'react';

// Function to preload resources immediately (for use in main.tsx)
export const preloadResources = () => {
  // Preload critical resources
  const criticalImages = [
    '/images/branding/logo.png', // Logo
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
};

// React component version (for use in App.tsx)
export const PreloadResources = () => {
  useEffect(() => {
    preloadResources();
  }, []);

  return null;
};

export default PreloadResources;
