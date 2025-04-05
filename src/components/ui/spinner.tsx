
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'white';
}

const Spinner = ({
  size = 'md',
  className,
  color = 'primary'
}: SpinnerProps) => {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }[size];

  const colorClass = {
    primary: 'text-fuchsia-600',
    secondary: 'text-violet-600',
    accent: 'text-indigo-600',
    white: 'text-white',
  }[color];

  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1.5,
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.span
        className={cn(
          sizeClass,
          colorClass,
          "opacity-75",
          className
        )}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-full h-full"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </motion.span>
      
      {/* Decorative glow effect */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full blur-md opacity-50",
          {
            'bg-fuchsia-500/30': color === 'primary',
            'bg-violet-500/30': color === 'secondary',
            'bg-indigo-500/30': color === 'accent',
            'bg-white/30': color === 'white',
          }
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default Spinner;
