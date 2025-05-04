
import { useState, useEffect } from 'react';
import { getRemainingSpots } from '@/utils/spotCounter';

/**
 * Hook to get and display the remaining spots for the current visitor
 * Now with improved error handling and retry mechanism
 */
export const useRemainingSpots = () => {
  const [spots, setSpots] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        setLoading(true);
        setError(null);
        const remainingSpots = await getRemainingSpots();
        setSpots(remainingSpots);
      } catch (error) {
        console.error('Error fetching remaining spots:', error);
        setError(error instanceof Error ? error : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();

    // Set up a refresh interval if needed
    // const intervalId = setInterval(fetchSpots, 30 * 60 * 1000); // refresh every 30 minutes
    // return () => clearInterval(intervalId);
  }, []);

  // Retry function that components can call if needed
  const retryFetch = () => {
    setLoading(true);
    getRemainingSpots()
      .then(remainingSpots => {
        setSpots(remainingSpots);
        setError(null);
      })
      .catch(err => {
        setError(err instanceof Error ? err : new Error('Unknown error during retry'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { spots, loading, error, retryFetch };
};
