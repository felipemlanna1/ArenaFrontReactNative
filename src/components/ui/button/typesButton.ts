import * as React from 'react';
import { TouchableOpacityProps } from 'react-native';
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'subtle'
  | 'destructive'
  | 'success'
  | 'ghost'
  | 'outline-light'
  | 'outline-primary';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonIconPosition = 'left' | 'right';
export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ComponentType<{ size: number; color: string }>;
  rightIcon?: React.ComponentType<{ size: number; color: string }>;
  iconOnly?: boolean;
  onPress: () => void;
  children: React.ReactNode;
  testID?: string;
  haptic?: boolean;
  fullWidth?: boolean;
  loadingText?: string;
  disableAnimations?: boolean;
}
export interface ButtonVariantConfig {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  textColor: string;
  hover: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
  };
  pressed: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
  };
  focus: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    shadowColor: string;
  };
  disabled: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
  };
}
export interface ButtonSizeConfig {
  height: number;
  paddingHorizontal: number;
  fontSize: number;
  iconSize: number;
  borderRadius: number;
  minWidth?: number;
}
export interface UseButtonParams {
  variant: ButtonVariant;
  size: ButtonSize;
  loading: boolean;
  disabled: boolean;
  haptic: boolean;
  fullWidth: boolean;
  iconOnly: boolean;
  onPress: () => void;
  disableAnimations: boolean;
}
export interface UseButtonReturn {
  buttonConfig: ButtonVariantConfig;
  sizeConfig: ButtonSizeConfig;
  isInteractionDisabled: boolean;
  handlePress: () => void;
  computedStyles: {
    container: object;
    text: object;
    icon: object;
    loadingSpinner: object;
  };
  animatedValues: {
    scale: unknown;
    opacity: unknown;
  };
  iconProps: {
    size: number;
    color: string;
  };
}
export interface ButtonAnimationConfig {
  pressScale: number;
  pressDuration: number;
  releaseBounceDuration: number;
  disabledOpacity: number;
  loadingOpacity: number;
}
export interface ButtonAccessibilityProps {
  accessibilityRole: 'button';
  accessibilityState: {
    disabled: boolean;
    busy?: boolean;
  };
  accessibilityLabel: string;
  accessibilityHint?: string;
}
export type ButtonVariantConfigs = Record<ButtonVariant, ButtonVariantConfig>;
export type ButtonSizeConfigs = Record<ButtonSize, ButtonSizeConfig>;
export interface ButtonThemeConfig {
  variants: ButtonVariantConfigs;
  sizes: ButtonSizeConfigs;
  animations: ButtonAnimationConfig;
}
