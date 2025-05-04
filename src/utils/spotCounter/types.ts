
/**
 * Types for the spot counter functionality
 */

export interface VisitorData {
  visitorId: string;
  spotsRemaining: number;
  lastUpdated: number; // timestamp
  firstVisit: number; // timestamp
}

export interface CachedFingerprint {
  id: string;
  timestamp: number;
}
