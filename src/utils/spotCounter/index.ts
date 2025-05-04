
/**
 * Spot counter utility for creating personalized urgency
 * by showing a decreasing number of available spots to each visitor
 * 
 * Main entry point that combines all modular components
 */

import { VisitorData } from './types';
import { getEnhancedVisitorId } from './fingerprinting';
import { getStoredData, storeData } from './storage';
import { syncWithServer } from './server-sync';
import { 
  STORAGE_KEY, 
  MIN_SPOTS_SHOWN,
  SESSION_SYNC_FLAG
} from './constants';

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
 * Calculate an initial number of spots to show this visitor
 * Shows slightly different numbers to different visitors for personalization
 */
const calculateInitialSpots = (): number => {
  // Start with a base of 7-10 spots remaining (randomized slightly)
  const baseSpots = Math.floor(Math.random() * 4) + 7;
  return baseSpots;
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
    sessionStorage.removeItem(SESSION_SYNC_FLAG);
  } catch (e) {
    // If localStorage fails, also try to clear the cookies
    document.cookie = `${STORAGE_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `visitorId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};
