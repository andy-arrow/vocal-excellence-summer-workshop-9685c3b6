
/**
 * Server synchronization utilities for spot counter
 */

import { VisitorData } from './types';
import { SERVER_SYNC_ENDPOINT, SESSION_SYNC_FLAG } from './constants';

/**
 * Attempt to synchronize counter data with the server
 * Now with throttling to limit server requests
 */
export const syncWithServer = async (data: VisitorData, forceSync = false): Promise<VisitorData> => {
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
