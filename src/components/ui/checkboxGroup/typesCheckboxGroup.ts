import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { CheckboxVariant, CheckboxSize } from '../checkbox/typesCheckbox';
import { ArenaSpacing } from '@/constants';

export interface CheckboxOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface CheckboxGroupProps<T = string> {
  options: CheckboxOption<T>[];
  value: T | T[];
  onChange: (value: T | T[]) => void;
  multiSelect?: boolean;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  direction?: 'horizontal' | 'vertical';
  columns?: 1 | 2 | 3 | 4;
  spacing?: keyof typeof ArenaSpacing;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  style?: ViewStyle;
  testID?: string;
}

export interface UseCheckboxGroupParams<T = string> {
  value: T | T[];
  multiSelect: boolean;
  onChange: (value: T | T[]) => void;
}

export interface UseCheckboxGroupReturn<T = string> {
  handleSelect: (optionValue: T) => void;
  isSelected: (optionValue: T) => boolean;
}

export interface CheckboxGroupStyles {
  container: ViewStyle;
  labelContainer: ViewStyle;
  label: TextStyle;
  optionsContainer: ViewStyle;
  checkboxWrapper: ViewStyle;
  helperText: TextStyle;
  errorText: TextStyle;
}
