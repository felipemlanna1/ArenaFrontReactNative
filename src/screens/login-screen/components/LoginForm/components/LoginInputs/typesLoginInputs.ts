export interface LoginInputsProps {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
  onEmailChange: (text: string) => void;
  onEmailBlur: () => void;
  onPasswordChange: (text: string) => void;
}
