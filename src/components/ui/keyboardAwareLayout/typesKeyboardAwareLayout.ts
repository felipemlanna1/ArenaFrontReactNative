import { ReactNode } from 'react';
import { ViewStyle, ScrollViewProps } from 'react-native';

export interface KeyboardAwareLayoutProps {
  children: ReactNode;
  enableKeyboardAvoid?: boolean;
  verticalOffset?: number;
  scrollEnabled?: boolean;
  contentContainerStyle?: ViewStyle;
  scrollViewProps?: Omit<ScrollViewProps, 'children' | 'contentContainerStyle'>;
  testID?: string;
  withScrollView?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
}

export interface UseKeyboardAwareLayoutReturn {
  keyboardBehavior: 'padding' | 'height' | undefined;
  keyboardOffset: number;
  shouldEnableAvoid: boolean;
}
