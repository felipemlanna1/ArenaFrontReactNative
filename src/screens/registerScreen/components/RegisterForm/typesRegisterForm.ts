import {
  RegisterFormData,
  RegisterErrors,
} from '@/screens/registerScreen/typesRegisterScreen';

export interface RegisterFormProps {
  formData: RegisterFormData;
  errors: RegisterErrors;
  isLoading: boolean;
  onFullNameChange: (text: string) => void;
  onFullNameBlur: () => void;
  onUsernameChange: (text: string) => void;
  onUsernameBlur: () => void;
  onEmailChange: (text: string) => void;
  onEmailBlur: () => void;
  onPasswordChange: (text: string) => void;
  onPasswordBlur: () => void;
  onConfirmPasswordChange: (text: string) => void;
  onConfirmPasswordBlur: () => void;
}
