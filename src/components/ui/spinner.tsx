
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'black';
  speed?: number;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  speed = 0.75,
  className = ''
}) => {
  // Map size to pixel values
  const sizeMap = {
    sm: '16px',
    md: '24px',
    lg: '36px'
  };
  
  // Map color to tailwind classes
  const colorMap = {
    primary: 'border-t-blue-600',
    white: 'border-t-white',
    black: 'border-t-black'
  };
  
  return (
    <div 
      className={`rounded-full border-2 border-gray-300/30 animate-spin ${colorMap[color]} ${className}`} 
      style={{ 
        width: sizeMap[size], 
        height: sizeMap[size],
        animationDuration: `${speed}s`
      }}
      aria-label="Loading"
      data-testid="spinner"
    ></div>
  );
};

export default Spinner;
