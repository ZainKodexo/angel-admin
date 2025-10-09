'use client';
import { useEffect, useState } from 'react';
import { OTP_EXPIRY_TIME } from '../utils';

export const useCountDown = () => {
  const [timeRemaining, setTimeRemaining] = useState(OTP_EXPIRY_TIME);
  const [isExpired, setIsExpired] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const resetTime = () => {
    setTimeRemaining(OTP_EXPIRY_TIME);
    setIsExpired(false);
  };

  useEffect(() => {
    if (timeRemaining <= 0) {
      setIsExpired(true);
      return;
    }

    const countDownInterval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countDownInterval);
  }, [timeRemaining]);

  return { isExpired, formatTime, timeRemaining, resetTime };
};
