import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerParams {
  initialTime: number;
  onExpire?: () => void;
  autoStart?: boolean;
}

interface UseTimerReturn {
  timeLeft: number;
  isExpired: boolean;
  isRunning: boolean;
  formattedTime: string;
  start: () => void;
  pause: () => void;
  reset: (newTime?: number) => void;
}

export const useTimer = ({
  initialTime,
  onExpire,
  autoStart = false,
}: UseTimerParams): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      if (onExpireRef.current) {
        onExpireRef.current();
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          if (onExpireRef.current) {
            onExpireRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const formattedTime = useCallback(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [timeLeft]);

  const start = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  }, [timeLeft]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (newTime?: number) => {
      setIsRunning(false);
      setTimeLeft(newTime ?? initialTime);
    },
    [initialTime]
  );

  const isExpired = timeLeft <= 0;

  return {
    timeLeft,
    isExpired,
    isRunning,
    formattedTime: formattedTime(),
    start,
    pause,
    reset,
  };
};
