
/**
 * Storage utilities for the spot counter
 */

/**
 * Store data with fallbacks (localStorage -> cookies)
 */
export const storeData = (key: string, value: string): void => {
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
export const getStoredData = (key: string): string | null => {
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
 * Cookie helper functions
 */
export function createCookie(key: string, value: string, expirationDays: number): void {
  const date = new Date();
  date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  const expires = `; expires=${date.toUTCString()}`; 
  document.cookie = `${key}=${value}${expires}; path=/`;
}

export function readCookie(key: string): string | null {
  const nameEQ = `${key}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
