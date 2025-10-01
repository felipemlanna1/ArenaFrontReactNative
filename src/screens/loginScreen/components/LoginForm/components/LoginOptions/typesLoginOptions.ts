export interface LoginOptionsProps {
  rememberMe: boolean;
  isLoading: boolean;
  onRememberMeToggle: () => void;
  onForgotPassword: () => void;
}
