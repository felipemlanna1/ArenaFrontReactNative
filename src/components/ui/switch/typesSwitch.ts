import { SwitchProps as RNSwitchProps } from 'react-native';

export type SwitchVariant = 'default' | 'brand';

export type SwitchSize = 'sm' | 'md' | 'lg';

export type SwitchLabelPosition = 'left' | 'right';

export interface SwitchProps extends Omit<RNSwitchProps, 'trackColor' | 'thumbColor'> {
  variant?: SwitchVariant;
  size?: SwitchSize;
  label?: string;
  labelPosition?: SwitchLabelPosition;
  disabled?: boolean;
  testID?: string;
}

export interface SwitchVariantConfig {
  trackColorFalse: string;
  trackColorTrue: string;
  thumbColorFalse: string;
  thumbColorTrue: string;
  disabledOpacity: number;
}

export interface SwitchSizeConfig {
  transform: Array<{ scaleX: number } | { scaleY: number }>;
  labelFontSize: number;
  gap: number;
}

export interface UseSwitchParams {
  variant: SwitchVariant;
  size: SwitchSize;
  value: boolean;
  disabled: boolean;
}

export interface UseSwitchReturn {
  variantConfig: SwitchVariantConfig;
  sizeConfig: SwitchSizeConfig;
  trackColor: {
    false: string;
    true: string;
  };
  thumbColor: string;
  containerStyle: object;
  labelStyle: object;
}
