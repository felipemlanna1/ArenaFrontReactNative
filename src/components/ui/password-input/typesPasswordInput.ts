import { InputProps } from '../input/typesInput';

export interface PasswordStrength {
  score: number; // 0-4
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
  suggestions: string[];
}

export interface PasswordInputProps extends Omit<InputProps, 'secureTextEntry' | 'rightIcon'> {
  showStrength?: boolean;
  showToggle?: boolean;
  strengthMinLength?: number;
  customStrengthValidator?: (password: string) => PasswordStrength;
  onToggleVisibility?: (isVisible: boolean) => void;
  toggleTestID?: string;
}

export interface UsePasswordInputParams {
  value: string;
  showStrength: boolean;
  showToggle: boolean;
  strengthMinLength: number;
  customStrengthValidator?: (password: string) => PasswordStrength;
  onToggleVisibility?: (isVisible: boolean) => void;
}

export interface UsePasswordInputReturn {
  isVisible: boolean;
  strength: PasswordStrength | null;
  shouldShowStrength: boolean;
  toggleVisibility: () => void;
  EyeIcon: React.ComponentType<{ size: number; color: string }>;
}

export interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disableAnimations?: boolean;
}

export interface EyeIconProps {
  size: number;
  color: string;
  isVisible: boolean;
  disabled?: boolean;
}