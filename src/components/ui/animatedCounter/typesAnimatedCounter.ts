import { TextStyle } from 'react-native';

export type AnimatedCounterVariant =
  | 'displayPrimary'
  | 'headingPrimary'
  | 'titlePrimary'
  | 'bodyPrimary';

export interface AnimatedCounterProps {
  value: number;
  duration?: number;
  variant?: AnimatedCounterVariant;
  style?: TextStyle | TextStyle[];
  testID?: string;
}
