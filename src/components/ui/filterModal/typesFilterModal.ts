import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type FilterModalHeight = '80%' | '85%' | '90%';

export interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
  onCancel?: () => void;
  title: string;
  children: ReactNode;
  height?: FilterModalHeight;
  isLoading?: boolean;
  applyButtonLabel?: string;
  cancelButtonLabel?: string;
  applyButtonDisabled?: boolean;
  testID?: string;
  contentContainerStyle?: ViewStyle;
}
