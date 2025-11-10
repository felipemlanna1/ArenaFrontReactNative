import { ReactNode } from 'react';
import { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';

export interface ArenaKeyboardAwareScrollViewProps extends ScrollViewProps {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  bottomOffset?: number;
  testID?: string;
}
