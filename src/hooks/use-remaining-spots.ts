
import { useState, useEffect, useCallback } from 'react';
import { getRemainingSpots } from '@/utils/spotCounter';

/**
 * Hook to get and display the remaining spots for the current visitor
 * Now with improved error handling, retry mechanism, and performance optimizations
 */
export const useRemainingSpots = () => {
  const [spots, setSpots] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastSyncTime, setLastSyncTime] = useState<number | null>(null);

  // Memoized fetch function to avoid unnecessary recreation
  const fetchSpots = useCallback(async (forceSync = false) => {
    try {
      setLoading(true);
      setError(null);
      const remainingSpots = await getRemainingSpots(forceSync);
      setSpots(remainingSpots);
      setLastSyncTime(Date.now());
    } catch (error) {
      console.error('Error fetching remaining spots:', error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only fetch if we haven't already or it's been a while
    if (!lastSyncTime) {
      fetchSpots();
    }

    // Set up a refresh interval if needed
    // const intervalId = setInterval(fetchSpots, 30 * 60 * 1000); // refresh every 30 minutes
    // return () => clearInterval(intervalId);
  }, [fetchSpots, lastSyncTime]);

  // Retry function that components can call if needed
  const retryFetch = () => {
    // Force sync with server on retry
    fetchSpots(true);
  };

  return { spots, loading, error, retryFetch };
};
