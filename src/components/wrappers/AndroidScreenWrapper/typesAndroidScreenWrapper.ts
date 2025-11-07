import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export interface AndroidScreenWrapperProps {
  children: ReactNode;
  enableScroll?: boolean;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  testID?: string;
}
