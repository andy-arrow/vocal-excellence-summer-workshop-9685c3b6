
/**
 * Constants for the spot counter functionality
 */

// Spot configuration
export const TOTAL_SPOTS = 20; // Total spots in the program
export const MIN_SPOTS_SHOWN = 3; // Minimum spots we'll show to maintain urgency
export const SPOTS_DECREASE_INTERVAL_DAYS = 1; // How often spots decrease (in days)

// Storage keys
export const STORAGE_KEY = 'vocalExcellenceVisitorData';
export const FINGERPRINT_CACHE_KEY = 'cachedVisitorId';
export const SESSION_SYNC_FLAG = 'syncedThisSession';

// Server endpoint
export const SERVER_SYNC_ENDPOINT = '/api/sync-counter';

// Cache duration
export const FINGERPRINT_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
