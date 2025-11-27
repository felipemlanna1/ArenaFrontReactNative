import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface CompletionRingProps {
  size?: number;

  strokeWidth?: number;

  progress: number;

  children: ReactNode;

  style?: StyleProp<ViewStyle>;

  testID?: string;
}
