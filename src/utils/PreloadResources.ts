
/**
 * Utility for preloading critical resources to improve page load times
 */

// List of critical resources to preload
const criticalResources = {
  images: [
    '/og-image.png', // Preload OG image for social sharing
  ],
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap'
  ],
  scripts: [
    '/src/main.tsx'
  ],
  preconnects: [
    { href: 'https://fonts.googleapis.com', crossOrigin: '' },
    { href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { href: 'https://cdn.gpteng.co', crossOrigin: 'anonymous' },
  ],
  dnsPrefetch: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdn.gpteng.co'
  ]
};

/**
 * Preloads critical resources to improve initial page load performance
 */
export function preloadResources(): void {
  if (typeof document === 'undefined') return;
  
  // Use Promise.all for parallel loading
  Promise.all([
    preloadCriticalImages(),
    preloadCriticalStylesheets(),
    preloadCriticalScripts(),
    setupPreconnects(),
    setupDnsPrefetch()
  ]).catch(console.error);
}

function preloadCriticalImages(): Promise<void[]> {
  return Promise.all(
    criticalResources.images.map(src => {
      return new Promise<void>((resolve) => {
        const link = document.createElement('link') as HTMLLinkElement;
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.fetchPriority = 'high';
        link.onload = () => resolve();
        link.onerror = () => resolve(); // Continue even if one image fails
        document.head.appendChild(link);
      });
    })
  );
}

function preloadCriticalStylesheets(): Promise<void[]> {
  return Promise.all(
    criticalResources.stylesheets.map(href => {
      return new Promise<void>((resolve) => {
        if (document.querySelector(`link[href="${href}"]`)) {
          resolve();
          return;
        }
        
        const link = document.createElement('link') as HTMLLinkElement;
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        
        link.onload = function(this: HTMLLinkElement) {
          this.onload = null;
          this.rel = 'stylesheet';
          resolve();
        };
        
        link.onerror = () => resolve(); // Continue even if one stylesheet fails
        document.head.appendChild(link);
      });
    })
  );
}

function preloadCriticalScripts(): Promise<void[]> {
  return Promise.all(
    criticalResources.scripts.map(src => {
      return new Promise<void>((resolve) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        
        const link = document.createElement('link') as HTMLLinkElement;
        link.rel = 'modulepreload';
        link.href = src;
        link.as = 'script';
        link.onload = () => resolve();
        link.onerror = () => resolve();
        document.head.appendChild(link);
      });
    })
  );
}

function setupPreconnects(): Promise<void[]> {
  return Promise.all(
    criticalResources.preconnects.map(({ href, crossOrigin }) => {
      return new Promise<void>((resolve) => {
        if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
          resolve();
          return;
        }
        
        const link = document.createElement('link') as HTMLLinkElement;
        link.rel = 'preconnect';
        link.href = href;
        if (crossOrigin) link.crossOrigin = crossOrigin;
        link.onload = () => resolve();
        link.onerror = () => resolve();
        document.head.appendChild(link);
      });
    })
  );
}

function setupDnsPrefetch(): Promise<void[]> {
  return Promise.all(
    criticalResources.dnsPrefetch.map(href => {
      return new Promise<void>((resolve) => {
        if (document.querySelector(`link[rel="dns-prefetch"][href="${href}"]`)) {
          resolve();
          return;
        }
        
        const link = document.createElement('link') as HTMLLinkElement;
        link.rel = 'dns-prefetch';
        link.href = href;
        link.onload = () => resolve();
        link.onerror = () => resolve();
        document.head.appendChild(link);
      });
    })
  );
}

/**
 * Preloads a specific image for critical UI elements
 */
export function preloadImage(src: string): Promise<void> {
  if (typeof document === 'undefined' || !src) return Promise.resolve();
  
  return new Promise((resolve) => {
    const link = document.createElement('link') as HTMLLinkElement;
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.onload = () => resolve();
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });
}
