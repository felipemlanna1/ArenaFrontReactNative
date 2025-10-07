import { useMemo } from 'react';
import { UseProgressBarParams, UseProgressBarReturn } from './typesProgressBar';

export const useProgressBar = ({
  progress,
  animated,
}: UseProgressBarParams): UseProgressBarReturn => {
  const clampedProgress = useMemo(() => {
    return Math.min(Math.max(progress, 0), 100);
  }, [progress]);

  const animatedWidth = useMemo(() => {
    return { width: `${clampedProgress}%` };
  }, [clampedProgress]);

  const percentageText = useMemo(() => {
    return `${Math.round(clampedProgress)}%`;
  }, [clampedProgress]);

  return {
    animatedWidth,
    clampedProgress,
    percentageText,
  };
};
