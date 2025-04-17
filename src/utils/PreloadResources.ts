
/**
 * Utility for preloading critical resources to improve page load times
 */

// List of critical resources to preload
const criticalResources = {
  images: [
    // Add critical image paths here if needed
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap'
  ],
  preconnects: [
    { href: 'https://fonts.googleapis.com', crossOrigin: '' },
    { href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  ],
  dnsPrefetch: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ]
};

/**
 * Preloads critical resources to improve initial page load performance
 */
export function preloadResources(): void {
  // Only run in browser environment
  if (typeof document === 'undefined') return;
  
  // Preload critical images
  criticalResources.images.forEach(src => {
    const link = document.createElement('link') as HTMLLinkElement;
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });

  // Preload critical stylesheets
  criticalResources.stylesheets.forEach(href => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link') as HTMLLinkElement;
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      
      link.onload = function(this: HTMLLinkElement) {
        this.onload = null;
        this.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    }
  });

  // Add preconnect for external domains
  criticalResources.preconnects.forEach(({ href, crossOrigin }) => {
    if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
      const link = document.createElement('link') as HTMLLinkElement;
      link.rel = 'preconnect';
      link.href = href;
      if (crossOrigin) link.crossOrigin = crossOrigin;
      document.head.appendChild(link);
    }
  });

  // Add DNS prefetch
  criticalResources.dnsPrefetch.forEach(href => {
    if (!document.querySelector(`link[rel="dns-prefetch"][href="${href}"]`)) {
      const link = document.createElement('link') as HTMLLinkElement;
      link.rel = 'dns-prefetch';
      link.href = href;
      document.head.appendChild(link);
    }
  });
}

/**
 * Preloads a specific image for critical UI elements
 */
export function preloadImage(src: string): void {
  if (typeof document === 'undefined' || !src) return;
  
  const link = document.createElement('link') as HTMLLinkElement;
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}
