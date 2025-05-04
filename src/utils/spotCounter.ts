
/**
 * Spot counter utility for creating personalized urgency
 * by showing a decreasing number of available spots to each visitor
 */

// Constants
const TOTAL_SPOTS = 20; // Total spots in the program
const MIN_SPOTS_SHOWN = 3; // Minimum spots we'll show to maintain urgency
const SPOTS_DECREASE_INTERVAL_DAYS = 1; // How often spots decrease (in days)
const STORAGE_KEY = 'vocalExcellenceVisitorData';
const SERVER_SYNC_ENDPOINT = '/api/sync-counter'; // Server endpoint for syncing
const FINGERPRINT_CACHE_KEY = 'cachedVisitorId';
const FINGERPRINT_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
const SESSION_SYNC_FLAG = 'syncedThisSession';

// Types
interface VisitorData {
  visitorId: string;
  spotsRemaining: number;
  lastUpdated: number; // timestamp
  firstVisit: number; // timestamp
}

// Define a minimal type for FingerprintJS to satisfy TypeScript
declare const FingerprintJS: {
  load: () => Promise<{
    get: () => Promise<{ visitorId: string }>
  }>
};

/**
 * Load visitor data from storage with fallbacks
 * @param forceSync - Whether to force a server sync regardless of throttling
 */
export const getVisitorData = async (forceSync = false): Promise<VisitorData> => {
  // Get visitor ID with enhanced fingerprinting (lazy-loaded)
  const visitorId = await getEnhancedVisitorId();
  
  // Try to get existing data from storage
  const storedData = getStoredData(STORAGE_KEY);
  let data: VisitorData | null = storedData ? JSON.parse(storedData) : null;
  
  // If no data exists or it's corrupt, create new visitor data
  if (!data || !data.visitorId) {
    data = {
      visitorId,
      spotsRemaining: calculateInitialSpots(),
      lastUpdated: Date.now(),
      firstVisit: Date.now()
    };
    
    // Save the new data
    storeData(STORAGE_KEY, JSON.stringify(data));
  } else {
    // Check if we need to decrease the spots count
    data = await updateSpotsIfNeeded(data, forceSync);
  }
  
  return data;
};

/**
 * Enhanced visitor identification with fingerprinting and fallbacks
 * Now with lazy loading and caching for better performance
 */
const getEnhancedVisitorId = async (): Promise<string> => {
  // First check if we've already cached the visitor ID this session
  try {
    const cachedData = getStoredData(FINGERPRINT_CACHE_KEY);
    if (cachedData) {
      const { id, timestamp } = JSON.parse(cachedData);
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
    const generateFingerprint = async () => {
      try {
        // Instead of dynamic import, use a script injection approach
        // This avoids TypeScript issues with URL imports
        const fingerprintPromise = new Promise<string>((resolve, reject) => {
          if (typeof window === 'undefined') {
            return reject(new Error('Cannot generate fingerprint in non-browser environment'));
          }

          // Check if FingerprintJS is already loaded
          if (window.hasOwnProperty('FingerprintJS')) {
            FingerprintJS.load()
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
              FingerprintJS.load()
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
    
    // Generate fingerprint asynchronously
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
 * Store data with fallbacks (localStorage -> cookies)
 */
const storeData = (key: string, value: string): void => {
  try {
    // Primary: Try localStorage first
    localStorage.setItem(key, value);
  } catch (e) {
    // Fallback: Use cookies if localStorage fails
    createCookie(key, value, 365);
  }
};

/**
 * Get stored data with fallbacks (localStorage -> cookies)
 */
const getStoredData = (key: string): string | null => {
  // Try localStorage first
  try {
    const data = localStorage.getItem(key);
    if (data) return data;
  } catch (e) {
    // Ignore error and try cookies
  }
  
  // Try cookies next
  return readCookie(key);
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
 * Calculate an initial number of spots to show this visitor
 * Shows slightly different numbers to different visitors for personalization
 */
const calculateInitialSpots = (): number => {
  // Start with a base of 7-10 spots remaining (randomized slightly)
  const baseSpots = Math.floor(Math.random() * 4) + 7;
  return Math.min(baseSpots, TOTAL_SPOTS);
};

/**
 * Attempt to synchronize counter data with the server
 * Now with throttling to limit server requests
 */
const syncWithServer = async (data: VisitorData, forceSync = false): Promise<VisitorData> => {
  // Check if we've already synced this session (unless force sync is requested)
  if (!forceSync) {
    try {
      const hasAlreadySynced = sessionStorage.getItem(SESSION_SYNC_FLAG);
      if (hasAlreadySynced === 'true') {
        // Skip sync if already done this session
        return data;
      }
    } catch (e) {
      // Ignore sessionStorage errors and continue with sync
    }
  }
  
  try {
    // Send visitor ID and counter data to server
    const response = await fetch(SERVER_SYNC_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      // Get the server's canonical version of the counter
      const serverData = await response.json();
      
      // Mark that we've synced this session
      try {
        sessionStorage.setItem(SESSION_SYNC_FLAG, 'true');
      } catch (e) {
        // Ignore sessionStorage errors
      }
      
      return serverData;
    }
  } catch (e) {
    console.error('Server sync failed:', e);
  }
  
  // If server sync fails, use local data
  return data;
};

/**
 * Update spots if enough time has passed since last update
 * @param forceSync - Whether to force server sync regardless of throttling
 */
const updateSpotsIfNeeded = async (data: VisitorData, forceSync = false): Promise<VisitorData> => {
  const now = Date.now();
  const lastUpdate = data.lastUpdated;
  const daysPassed = Math.floor((now - lastUpdate) / (86400000)); // milliseconds in a day
  
  // Only update if at least one day has passed
  if (daysPassed >= 1) {
    // Decrease spots by the number of days passed, but not below MIN_SPOTS_SHOWN
    data.spotsRemaining = Math.max(MIN_SPOTS_SHOWN, data.spotsRemaining - daysPassed);
    data.lastUpdated = now;
    
    // Save the updated data
    storeData(STORAGE_KEY, JSON.stringify(data));
    
    // Always sync with server when spots change
    forceSync = true;
  }
  
  // Try to sync with server if forced or throttled conditions allow
  if (forceSync) {
    try {
      data = await syncWithServer(data, forceSync);
      // Save the synced data
      storeData(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error during server sync:', e);
      // Continue with local data
    }
  }
  
  return data;
};

/**
 * Get the spots remaining to display to the user
 * @param forceSync - Whether to force a server sync
 */
export const getRemainingSpots = async (forceSync = false): Promise<number> => {
  const data = await getVisitorData(forceSync);
  return data.spotsRemaining;
};

/**
 * For debugging purposes - reset the visitor data
 */
export const resetVisitorData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('visitorId');
    localStorage.removeItem(FINGERPRINT_CACHE_KEY);
    sessionStorage.removeItem(SESSION_SYNC_FLAG);
  } catch (e) {
    // If localStorage fails, also try to clear the cookies
    document.cookie = `${STORAGE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `visitorId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `${FINGERPRINT_CACHE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

/**
 * Cookie helper functions
 */
function createCookie(key: string, value: string, expirationDays: number): void {
  const date = new Date();
  date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  const expires = `; expires=${date.toUTCString()}`; 
  document.cookie = `${key}=${value}${expires}; path=/`;
}

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
