import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import type { SafeAreaEdgeConfig } from '@/constants';

export interface AndroidScreenWrapperProps {
  children: ReactNode;
  enableScroll?: boolean;
  safeAreaEdges?: SafeAreaEdgeConfig | false;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  testID?: string;
}
