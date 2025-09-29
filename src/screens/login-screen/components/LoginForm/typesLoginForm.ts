export interface LoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  errors: {
    email?: string;
    password?: string;
    general?: string;
  };
  isLoading: boolean;
  onEmailChange: (text: string) => void;
  onEmailBlur: () => void;
  onPasswordChange: (text: string) => void;
  onRememberMeToggle: () => void;
  onForgotPassword: () => void;
}

export interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}
