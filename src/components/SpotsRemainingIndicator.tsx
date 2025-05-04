
import React from 'react';
import { motion } from 'framer-motion';
import { UserIcon } from 'lucide-react';
import { useRemainingSpots } from '@/hooks/use-remaining-spots';

interface SpotsRemainingIndicatorProps {
  className?: string;
  showLabel?: boolean;
}

const SpotsRemainingIndicator: React.FC<SpotsRemainingIndicatorProps> = ({ 
  className = '',
  showLabel = true
}) => {
  const { spots, loading } = useRemainingSpots();
  
  if (loading || spots === null) {
    return null;
  }
  
  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  // Urgency coloring based on spots remaining
  const getUrgencyColor = () => {
    if (spots <= 3) return 'text-red-500';
    if (spots <= 5) return 'text-amber-500';
    return 'text-apple-blue';
  };
  
  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className={`flex items-center gap-1 ${getUrgencyColor()}`}>
        <UserIcon className="w-4 h-4" />
        <span className="font-medium">{spots}</span>
      </div>
      {showLabel && (
        <span className="text-apple-grey text-sm">
          {spots === 1 ? 'spot' : 'spots'} remaining
        </span>
      )}
    </motion.div>
  );
};

export default SpotsRemainingIndicator;
