import React from 'react';
import { TextInputProps, ViewStyle, TextStyle, TextInput } from 'react-native';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type InputVariant = 'default' | 'error' | 'success' | 'warning';
export type InputState = 'default' | 'focused' | 'disabled' | 'readonly';
export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'phone'
  | 'number'
  | 'url'
  | 'search'
  | 'textarea'
  | 'username'
  | 'otp';

export interface IconProps {
  size: number;
  color: string;
}

export interface InputProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;

  type?: InputType;
  variant?: InputVariant;
  size?: InputSize;

  disabled?: boolean;
  loading?: boolean;
  readonly?: boolean;

  error?: string | boolean;
  success?: string | boolean;
  warning?: string | boolean;
  required?: boolean;

  label?: string;
  helperText?: string;
  fullWidth?: boolean;

  leftIcon?: React.ComponentType<IconProps>;
  rightIcon?: React.ComponentType<IconProps>;

  clearable?: boolean;
  autoFocus?: boolean;
  selectTextOnFocus?: boolean;

  disableAnimations?: boolean;
  haptic?: boolean;

  showPasswordToggle?: boolean;
  showPasswordStrength?: boolean;

  onSearch?: (query: string) => void;
  debounceMs?: number;
  autoSearch?: boolean;
  showSearchIcon?: boolean;

  rows?: number;
  maxRows?: number;
  autoGrow?: boolean;

  countryCode?: string;
  formatPhone?: boolean;

  showCharacterCount?: boolean;
  maxLength?: number;

  style?: ViewStyle;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  testID?: string;
}

export interface InputConfig {
  height: number;
  fontSize: number;
  paddingHorizontal: number;
  paddingVertical: number;
  iconSize: number;
  borderRadius: number;
  borderWidth: number;
}

export interface InputTypeConfig {
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'url'
    | 'number-pad';
  autoComplete?:
    | 'email'
    | 'password'
    | 'username'
    | 'tel'
    | 'url'
    | 'off'
    | 'one-time-code'
    | 'new-password'
    | 'current-password';
  textContentType?:
    | 'none'
    | 'emailAddress'
    | 'password'
    | 'username'
    | 'telephoneNumber'
    | 'URL'
    | 'oneTimeCode'
    | 'newPassword';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  multiline?: boolean;
  passwordRules?: string;
}

export interface InputVariantConfig {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  placeholderColor: string;
  labelColor: string;
  helperTextColor: string;
  iconColor: string;
  focusBorderColor: string;
  focusRingColor: string;
  focusShadowColor: string;
}

export interface InputSizeConfig {
  container: {
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
  };
  text: {
    fontSize: number;
    lineHeight: number;
  };
  icon: {
    size: number;
  };
  label: {
    fontSize: number;
    marginBottom: number;
  };
  helperText: {
    fontSize: number;
    marginTop: number;
  };
}

export interface UseInputParams {
  value: string;
  variant: InputVariant;
  size: InputSize;
  disabled: boolean;
  loading: boolean;
  readonly: boolean;
  error?: string | boolean;
  success?: string | boolean;
  warning?: string | boolean;
  label?: string;
  placeholder?: string;
  required: boolean;
  clearable: boolean;
  fullWidth: boolean;
  disableAnimations: boolean;
  haptic: boolean;
  inputRef?: React.RefObject<TextInput | null>;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
}

export interface UseInputReturn {
  inputConfig: InputConfig;
  variantConfig: InputVariantConfig;
  sizeConfig: InputSizeConfig;

  isFocused: boolean;
  hasValue: boolean;
  isInteractionDisabled: boolean;
  shouldShowLabel: boolean;
  shouldShowHelperText: boolean;
  shouldShowClearButton: boolean;

  computedStyles: {
    container: ViewStyle[];
    inputContainer: ViewStyle[];
    input: TextStyle[];
    label: TextStyle[];
    helperText: TextStyle[];
    leftIconContainer: ViewStyle[];
    rightIconContainer: ViewStyle[];
    clearButton: ViewStyle[];
    focusRing: ViewStyle[];
  };

  animationValues: {
    focusRingOpacity: { value: number };
    borderColor: { value: string };
    labelY: { value: number };
    labelScale: { value: number };
    errorShake: { value: number };
    loadingOpacity: { value: number };
  };

  animatedStyles: {
    animatedContainerStyle: ViewStyle;
    animatedInputStyle: TextStyle;
    animatedLabelStyle: TextStyle;
    animatedFocusRingStyle: ViewStyle;
  };

  handlers: {
    handleFocus: () => void;
    handleBlur: () => void;
    handleChangeText: (text: string) => void;
    handleClear: () => void;
    handlePress: () => void;
  };

  iconProps: {
    size: number;
    color: string;
  };
}

export interface InputAnimationHooks {
  focusRingOpacity: { value: number };
  borderColor: { value: string };
  labelY: { value: number };
  labelScale: { value: number };
  errorShake: { value: number };
  loadingOpacity: { value: number };

  animatedContainerStyle: ViewStyle;
  animatedInputStyle: TextStyle;
  animatedLabelStyle: TextStyle;
  animatedFocusRingStyle: ViewStyle;
  animatedErrorShakeStyle: ViewStyle;

  triggerFocusAnimation: () => void;
  triggerBlurAnimation: () => void;
  triggerErrorAnimation: () => void;
  triggerSuccessAnimation: () => void;
}

export interface InputAccessibilityProps {
  accessible: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole: 'none' | 'text';
  accessibilityState: {
    disabled?: boolean;
    selected?: boolean;
    invalid?: boolean;
  };
  accessibilityLiveRegion?: 'none' | 'polite' | 'assertive';
}

export type InputSizePresets = Record<InputSize, InputSizeConfig>;
export type InputVariantPresets = Record<InputVariant, InputVariantConfig>;

export interface FloatingLabelProps {
  label: string;
  isFocused: boolean;
  hasValue: boolean;
  size: InputSize;
  variant: InputVariant;
  required?: boolean;
  disabled?: boolean;
  disableAnimations?: boolean;
}

export interface ClearButtonProps {
  onPress: () => void;
  size: InputSize;
  variant: InputVariant;
  disabled?: boolean;
  disableAnimations?: boolean;
  testID?: string;
}

export interface InputIconProps extends Omit<IconProps, 'size'> {
  position: 'left' | 'right';
  size: InputSize;
  variant: InputVariant;
  disabled?: boolean;
}

export interface ErrorMessageProps {
  message: string;
  size: InputSize;
  variant: InputVariant;
  disableAnimations?: boolean;
}

export interface HelperTextProps {
  text: string;
  size: InputSize;
  variant: InputVariant;
  disabled?: boolean;
}

export interface InputValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface InputValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  phone?: boolean;
  custom?: (value: string) => InputValidationResult;
}
