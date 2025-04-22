
import React, { useState, useEffect } from 'react';

const calculateTimeLeft = (deadline: string) => {
  const difference = new Date(deadline).getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

export const CountdownTimer = ({ deadline }: { deadline: string }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(deadline));
    }, 1000); // Update every second instead of every minute

    return () => clearInterval(timer);
  }, [deadline]);

  if (timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 bg-apple-text/60 backdrop-blur border border-apple-grey/20 rounded-full px-4 py-1.5">
      <span className="text-sm text-white">
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {timeLeft.hours > 0 && `${timeLeft.hours}h `}
        {timeLeft.minutes > 0 && `${timeLeft.minutes}m `}
        {timeLeft.seconds}s until deadline
      </span>
    </div>
  );
};

export default CountdownTimer;
