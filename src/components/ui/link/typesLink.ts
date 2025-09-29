import { TextStyle } from 'react-native';

export type LinkSize = 'sm' | 'md' | 'lg';
export type LinkVariant = 'primary' | 'secondary' | 'subtle';

export interface LinkProps {
  children: string;
  onPress: () => void;
  size?: LinkSize;
  variant?: LinkVariant;
  disabled?: boolean;
  underline?: boolean;
  style?: TextStyle;
  testID?: string;
}

export interface UseLinkParams {
  disabled: boolean;
  size: LinkSize;
  variant: LinkVariant;
  underline: boolean;
  onPress: () => void;
}

export interface UseLinkReturn {
  isInteractionDisabled: boolean;
  handlePress: () => void;
  handlePressIn: () => void;
  handlePressOut: () => void;
  computedStyles: {
    text: TextStyle;
  };
}

export interface LinkSizeConfig {
  fontSize: number;
  lineHeight: number;
}

export interface LinkVariantConfig {
  color: string;
  pressedColor?: string;
  disabled: {
    color: string;
  };
}
