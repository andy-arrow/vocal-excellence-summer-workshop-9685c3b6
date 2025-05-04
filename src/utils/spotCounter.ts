
/**
 * Spot counter utility for creating personalized urgency
 * by showing a decreasing number of available spots to each visitor
 */

// Constants
const TOTAL_SPOTS = 20; // Total spots in the program
const MIN_SPOTS_SHOWN = 3; // Minimum spots we'll show to maintain urgency
const SPOTS_DECREASE_INTERVAL_DAYS = 1; // How often spots decrease (in days)
const STORAGE_KEY = 'vocalExcellenceVisitorData';

// Types
interface VisitorData {
  visitorId: string;
  spotsRemaining: number;
  lastUpdated: number; // timestamp
  firstVisit: number; // timestamp
}

/**
 * Load visitor data from storage with fallbacks
 */
export const getVisitorData = async (): Promise<VisitorData> => {
  // Try to get existing data from storage
  const storedData = getStoredData(STORAGE_KEY);
  let data: VisitorData | null = storedData ? JSON.parse(storedData) : null;
  
  // If no data exists or it's corrupt, create new visitor data
  if (!data || !data.visitorId) {
    // Generate a fingerprint using a combination of available browser info
    const visitorId = generateSimpleFingerprint();
    
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
    data = updateSpotsIfNeeded(data);
  }
  
  return data;
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
 * Update spots if enough time has passed since last update
 */
const updateSpotsIfNeeded = (data: VisitorData): VisitorData => {
  const now = Date.now();
  const daysSinceUpdate = (now - data.lastUpdated) / (1000 * 60 * 60 * 24);
  
  // If at least one day has passed since the last update
  if (daysSinceUpdate >= SPOTS_DECREASE_INTERVAL_DAYS) {
    // Calculate how many days have passed and decrease accordingly
    const daysToCount = Math.floor(daysSinceUpdate / SPOTS_DECREASE_INTERVAL_DAYS);
    const newSpots = Math.max(data.spotsRemaining - daysToCount, MIN_SPOTS_SHOWN);
    
    // Update the data
    data.spotsRemaining = newSpots;
    data.lastUpdated = now;
    
    // Save the updated data
    storeData(STORAGE_KEY, JSON.stringify(data));
  }
  
  return data;
};

/**
 * Get the spots remaining to display to the user
 */
export const getRemainingSpots = async (): Promise<number> => {
  const data = await getVisitorData();
  return data.spotsRemaining;
};

/**
 * For debugging purposes - reset the visitor data
 */
export const resetVisitorData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // If localStorage fails, also try to clear the cookie
    document.cookie = `${STORAGE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

/**
 * Cookie helper functions
 */
function createCookie(key: string, value: string, expirationDays: number): void {
  const date = new Date();
  date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  const expires = `; expires=${date.toGMTString()}`;
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
