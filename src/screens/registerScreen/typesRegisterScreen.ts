import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';

export interface RegisterScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
}

export interface RegisterFormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterErrors {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export interface UseRegisterScreenReturn {
  formData: RegisterFormData;
  errors: RegisterErrors;
  isLoading: boolean;
  isFormValid: boolean;
  handleFullNameChange: (text: string) => void;
  handleFullNameBlur: () => void;
  handleUsernameChange: (text: string) => void;
  handleUsernameBlur: () => void;
  handleEmailChange: (text: string) => void;
  handleEmailBlur: () => void;
  handlePasswordChange: (text: string) => void;
  handlePasswordBlur: () => void;
  handleConfirmPasswordChange: (text: string) => void;
  handleConfirmPasswordBlur: () => void;
  handleSubmit: () => Promise<void>;
  handleLoginPress: () => void;
}
