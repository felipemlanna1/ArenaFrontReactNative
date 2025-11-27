import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';

export type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

export interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordScreenNavigationProp;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ForgotPasswordErrors {
  email?: string;
  general?: string;
}

export interface UseForgotPasswordScreenReturn {
  formData: ForgotPasswordFormData;
  errors: ForgotPasswordErrors;
  isLoading: boolean;
  isSuccess: boolean;
  handleEmailChange: (email: string) => void;
  handleEmailBlur: () => void;
  handleSubmit: () => Promise<void>;
  handleBackPress: () => void;
}
