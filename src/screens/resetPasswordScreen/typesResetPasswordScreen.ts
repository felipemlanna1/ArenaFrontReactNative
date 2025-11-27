import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/typesNavigation';

export type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ResetPassword'
>;

export type ResetPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'ResetPassword'
>;

export interface ResetPasswordScreenProps {
  navigation: ResetPasswordScreenNavigationProp;
  route: ResetPasswordScreenRouteProp;
}

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordErrors {
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export interface PasswordRequirement {
  id: string;
  text: string;
  isValid: boolean;
}

export type PasswordStrength = 'weak' | 'medium' | 'good' | 'strong';

export interface UseResetPasswordScreenReturn {
  email: string;
  code: string;
  formData: ResetPasswordFormData;
  errors: ResetPasswordErrors;
  isLoading: boolean;
  isSuccess: boolean;
  passwordRequirements: PasswordRequirement[];
  passwordStrength: PasswordStrength;
  passwordStrengthPercentage: number;
  showPassword: boolean;
  showConfirmPassword: boolean;
  handlePasswordChange: (password: string) => void;
  handleConfirmPasswordChange: (confirmPassword: string) => void;
  handlePasswordBlur: () => void;
  handleConfirmPasswordBlur: () => void;
  handleSubmit: () => Promise<void>;
  handleBackToLogin: () => void;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
}
