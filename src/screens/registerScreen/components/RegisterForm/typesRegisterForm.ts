import {
  RegisterFormData,
  RegisterErrors,
} from '@/screens/registerScreen/typesRegisterScreen';

export interface RegisterFormProps {
  formData: RegisterFormData;
  errors: RegisterErrors;
  isLoading: boolean;
  onFirstNameChange: (text: string) => void;
  onLastNameChange: (text: string) => void;
  onUsernameChange: (text: string) => void;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
  onCityChange: (text: string) => void;
  onStateChange: (text: string) => void;
}
