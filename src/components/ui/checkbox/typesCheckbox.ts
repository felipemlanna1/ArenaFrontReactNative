import { ViewStyle, TextStyle } from 'react-native';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'primary' | 'secondary';

export interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  size?: CheckboxSize;
  variant?: CheckboxVariant;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  testID?: string;
}

export interface UseCheckboxParams {
  checked: boolean;
  disabled: boolean;
  size: CheckboxSize;
  variant: CheckboxVariant;
  onPress: () => void;
}

export interface UseCheckboxReturn {
  isInteractionDisabled: boolean;
  handlePress: () => void;
  computedStyles: {
    container: ViewStyle;
    checkbox: ViewStyle;
    label: TextStyle;
    checkIcon: ViewStyle;
  };
  iconProps: {
    size: number;
    color: string;
  };
}

export interface CheckboxSizeConfig {
  checkboxSize: number;
  iconSize: number;
  fontSize: number;
  spacing: number;
}

export interface CheckboxVariantConfig {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  checkColor: string;
  labelColor: string;
  disabled: {
    backgroundColor: string;
    borderColor: string;
    borderWidth?: number;
    checkColor: string;
    labelColor: string;
  };
}
