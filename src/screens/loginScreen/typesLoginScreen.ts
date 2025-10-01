import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';

export interface LoginScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface UseLoginScreenReturn {
  formData: LoginFormData;
  errors: LoginErrors;
  isLoading: boolean;
  rememberMe: boolean;
  isFormValid: boolean;
  handleEmailChange: (text: string) => void;
  handleEmailBlur: () => void;
  handlePasswordChange: (text: string) => void;
  handleRememberMeToggle: () => void;
  handleSubmit: () => void;
  handleForgotPassword: () => void;
  handleRegister: () => void;
  handleGoogleLogin: () => void;
  handleAppleLogin: () => void;
}

export interface LoginScreenState {
  isLoading: boolean;
  errors: LoginErrors;
  rememberMe: boolean;
}
