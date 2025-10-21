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
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
}
