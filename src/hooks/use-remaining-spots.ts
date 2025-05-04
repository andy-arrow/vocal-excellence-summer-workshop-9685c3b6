
import { useState, useEffect } from 'react';
import { getRemainingSpots } from '@/utils/spotCounter';

/**
 * Hook to get and display the remaining spots for the current visitor
 */
export const useRemainingSpots = () => {
  const [spots, setSpots] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const remainingSpots = await getRemainingSpots();
        setSpots(remainingSpots);
      } catch (error) {
        console.error('Error fetching remaining spots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  return { spots, loading };
};
