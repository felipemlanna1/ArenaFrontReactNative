import {
  RegisterFormData,
  RegisterErrors,
} from '@/screens/registerScreen/typesRegisterScreen';

export interface RegisterFormProps {
  formData: RegisterFormData;
  errors: RegisterErrors;
  isLoading: boolean;
  onFirstNameChange: (text: string) => void;
  onFirstNameBlur: () => void;
  onLastNameChange: (text: string) => void;
  onLastNameBlur: () => void;
  onUsernameChange: (text: string) => void;
  onUsernameBlur: () => void;
  onEmailChange: (text: string) => void;
  onEmailBlur: () => void;
  onPasswordChange: (text: string) => void;
  onPasswordBlur: () => void;
  onConfirmPasswordChange: (text: string) => void;
  onConfirmPasswordBlur: () => void;
  onCityChange: (text: string) => void;
  onStateChange: (text: string) => void;
}
