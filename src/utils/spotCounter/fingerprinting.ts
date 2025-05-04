
/**
 * Fingerprinting utilities for visitor identification
 */

import { getStoredData, storeData } from './storage';
import { FINGERPRINT_CACHE_KEY, FINGERPRINT_CACHE_DURATION } from './constants';
import { CachedFingerprint } from './types';

/**
 * Enhanced visitor identification with fingerprinting and fallbacks
 * Now with lazy loading and caching for better performance
 */
export const getEnhancedVisitorId = async (): Promise<string> => {
  // First check if we've already cached the visitor ID this session
  try {
    const cachedData = getStoredData(FINGERPRINT_CACHE_KEY);
    if (cachedData) {
      const { id, timestamp } = JSON.parse(cachedData) as CachedFingerprint;
      // Check if the cached ID is still valid (not expired)
      if (Date.now() - timestamp < FINGERPRINT_CACHE_DURATION) {
        return id;
      }
    }
  } catch (e) {
    // Ignore cache read errors and continue to generation
  }
  
  // If no valid cache, try fingerprinting
  try {
    // Lazy-load the fingerprinting library only when needed
    const fingerprintId = await generateFingerprint();
    
    // Cache the generated ID to avoid recalculation
    const cacheData = JSON.stringify({
      id: fingerprintId,
      timestamp: Date.now()
    });
    storeData(FINGERPRINT_CACHE_KEY, cacheData);
    
    return fingerprintId;
  } catch (e) {
    // If fingerprinting fails, use stored ID or generate a new one
    let fallbackId = null;
    
    try {
      fallbackId = localStorage.getItem('visitorId');
    } catch (e) {
      // Ignore error and try cookies
    }
    
    if (!fallbackId) {
      fallbackId = readCookie('visitorId');
    }
    
    if (!fallbackId) {
      fallbackId = `user_${Math.random().toString(36).substring(2, 15)}`;
    }
    
    // Try to store for future use
    try { 
      localStorage.setItem('visitorId', fallbackId); 
    } catch(e) { 
      createCookie('visitorId', fallbackId, 365);
    }
    
    return fallbackId;
  }
};

/**
 * Generate fingerprint using FingerprintJS library with script injection
 */
const generateFingerprint = async (): Promise<string> => {
  try {
    // Use a script injection approach to load FingerprintJS
    const fingerprintPromise = new Promise<string>((resolve, reject) => {
      if (typeof window === 'undefined') {
        return reject(new Error('Cannot generate fingerprint in non-browser environment'));
      }

      // Check if FingerprintJS is already loaded
      if (window.hasOwnProperty('FingerprintJS')) {
        window.FingerprintJS!.load()
          .then(fp => fp.get())
          .then(result => resolve(result.visitorId))
          .catch(reject);
        return;
      }

      // Create script element to load FingerprintJS
      const script = document.createElement('script');
      script.src = 'https://openfpcdn.io/fingerprintjs/v4';
      script.async = true;
      script.onload = () => {
        if (window.hasOwnProperty('FingerprintJS')) {
          window.FingerprintJS!.load()
            .then(fp => fp.get())
            .then(result => resolve(result.visitorId))
            .catch(reject);
        } else {
          reject(new Error('FingerprintJS failed to load properly'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load FingerprintJS'));
      document.head.appendChild(script);
    });

    return await fingerprintPromise;
  } catch (e) {
    // Fallback to our simpler method
    return generateSimpleFingerprint();
  }
};

/**
 * Generate a simple fingerprint using available browser information
 */
const generateSimpleFingerprint = (): string => {
  const components = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset(),
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    navigator.hardwareConcurrency,
    navigator.platform
  ];
  
  // Create a simple hash from components
  const fingerprint = components.join('|||');
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
};

/**
 * Helper function to read cookies for fallback identification
 */
function readCookie(key: string): string | null {
  const nameEQ = `${key}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Helper function to create cookies for fallback identification
 */
function createCookie(key: string, value: string, expirationDays: number): void {
  const date = new Date();
  date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  const expires = `; expires=${date.toUTCString()}`; 
  document.cookie = `${key}=${value}${expires}; path=/`;
}
