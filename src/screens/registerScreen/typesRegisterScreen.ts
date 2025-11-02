import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';

export interface RegisterScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  state: string;
}

export interface RegisterErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  city?: string;
  state?: string;
  general?: string;
}

export interface UseRegisterScreenReturn {
  formData: RegisterFormData;
  errors: RegisterErrors;
  isLoading: boolean;
  isFormValid: boolean;
  handleFirstNameChange: (text: string) => void;
  handleLastNameChange: (text: string) => void;
  handleUsernameChange: (text: string) => void;
  handleEmailChange: (text: string) => void;
  handlePasswordChange: (text: string) => void;
  handleConfirmPasswordChange: (text: string) => void;
  handleCityChange: (text: string) => void;
  handleStateChange: (text: string) => void;
  handleSubmit: () => Promise<void>;
  handleLoginPress: () => void;
}
