export interface UseVerifyEmailScreenReturn {
  code: string;
  setCode: (code: string) => void;
  isLoading: boolean;
  isResending: boolean;
  error: string | null;
  timer: number;
  canResend: boolean;
  handleVerifyEmail: () => Promise<void>;
  handleResendCode: () => Promise<void>;
}

export interface VerifyEmailScreenParams {
  token?: string;
}
