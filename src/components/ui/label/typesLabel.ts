import { TextStyle } from 'react-native';

export type LabelVariant = 'form' | 'section' | 'inline' | 'helper';

export type LabelSize = 'xs' | 'sm' | 'md' | 'lg';

export interface LabelProps {
  children: string;
  variant?: LabelVariant;
  size?: LabelSize;
  required?: boolean;
  disabled?: boolean;
  htmlFor?: string;
  style?: TextStyle;
  testID?: string;
}

export interface UseLabelParams {
  variant: LabelVariant;
  size?: LabelSize;
  disabled: boolean;
}

export interface UseLabelReturn {
  labelStyle: TextStyle;
  requiredStyle: TextStyle;
}
