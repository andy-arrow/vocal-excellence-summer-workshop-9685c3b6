
import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'white' | 'blue' | 'gray';
  speed?: 0.5 | 1 | 1.5 | 2;
  className?: string;
}

const Spinner = ({ size = 'md', color = 'blue', speed = 1, className }: SpinnerProps) => {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };
  
  const colorClasses = {
    white: 'border-white/20 border-t-white',
    blue: 'border-apple-blue/20 border-t-apple-blue',
    gray: 'border-gray-200 border-t-gray-600',
  };
  
  const speedClasses = {
    0.5: 'animate-[spin_2s_linear_infinite]',
    1: 'animate-[spin_1s_linear_infinite]',
    1.5: 'animate-[spin_0.66s_linear_infinite]',
    2: 'animate-[spin_0.5s_linear_infinite]',
  };
  
  return (
    <div 
      className={cn(
        'inline-block border-2 rounded-full', 
        sizeClasses[size],
        colorClasses[color],
        speedClasses[speed],
        className
      )}
      role="status" 
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
