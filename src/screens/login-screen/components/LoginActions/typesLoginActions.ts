export interface LoginActionsProps {
  isFormValid: boolean;
  isLoading: boolean;
  onSubmit: () => void;
}

export interface UseLoginActionsParams {
  isFormValid: boolean;
  isLoading: boolean;
  onSubmit: () => void;
}

export interface UseLoginActionsReturn {
  isButtonDisabled: boolean;
  buttonTitle: string;
  handleSubmit: () => void;
}
