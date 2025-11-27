import { TextInput, ViewStyle } from 'react-native';

export interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  error?: string;
  onComplete?: (code: string) => void;
  style?: ViewStyle;
  testID?: string;
}

export interface OTPInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

export interface UseOTPInputParams {
  value: string;
  onChange: (value: string) => void;
  length: number;
  disabled: boolean;
  onComplete?: (code: string) => void;
}

export interface UseOTPInputReturn {
  digits: string[];
  isFocused: boolean;
  inputRef: React.RefObject<TextInput | null>;
  handlePress: () => void;
  handleChange: (text: string) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  focus: () => void;
  blur: () => void;
  clear: () => void;
}
