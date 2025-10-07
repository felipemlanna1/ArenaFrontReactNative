export interface ProgressBarProps {
  progress: number;
  height?: number;
  animated?: boolean;
  showPercentage?: boolean;
  backgroundColor?: string;
  progressColor?: string;
  testID?: string;
}

export interface UseProgressBarParams {
  progress: number;
  animated: boolean;
}

export interface UseProgressBarReturn {
  animatedWidth: { width: string };
  clampedProgress: number;
  percentageText: string;
}
