
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'blue' | 'gray';
  speed?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md',
  color = 'blue',
  speed = 0.75
}) => {
  // Size mapping
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  // Color mapping
  const colorMap = {
    white: 'border-white/30 border-t-white',
    blue: 'border-apple-blue/30 border-t-apple-blue',
    gray: 'border-gray-300 border-t-gray-600'
  };

  // Animation duration mapping (in seconds)
  const speedStyle = { animationDuration: `${0.6 / speed}s` };

  return (
    <div 
      className={`inline-block ${sizeMap[size]} border-2 ${colorMap[color]} rounded-full animate-spin`}
      style={speedStyle}
      role="status" 
      aria-label="Loading"
    />
  );
};

export default Spinner;
