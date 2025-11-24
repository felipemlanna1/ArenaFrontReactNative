export interface ConfettiAnimationProps {
  particleCount?: number;
  duration?: number;
  onComplete?: () => void;
  testID?: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  color: string;
  velocityX: number;
  velocityY: number;
}
