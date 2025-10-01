import { TextStyle } from 'react-native';
import { TextVariant } from '@/components/ui/text/typesText';

export type LinkVariant = TextVariant;

export interface LinkProps {
  children: string;
  onPress: () => void;
  variant?: LinkVariant;
  disabled?: boolean;
  underline?: boolean;
  style?: TextStyle;
  testID?: string;
}

export interface UseLinkParams {
  disabled: boolean;
  variant: LinkVariant;
  underline: boolean;
  onPress: () => void;
}

export interface UseLinkReturn {
  isInteractionDisabled: boolean;
  handlePress: () => void;
  getTextStyle: (pressed: boolean) => TextStyle;
}
