import { useMemo, useCallback } from 'react';
import {
  UseLoginActionsParams,
  UseLoginActionsReturn,
} from './typesLoginActions';

export const useLoginActions = ({
  isFormValid,
  isLoading,
  onSubmit,
}: UseLoginActionsParams): UseLoginActionsReturn => {
  const isButtonDisabled = useMemo(
    () => !isFormValid || isLoading,
    [isFormValid, isLoading]
  );

  const buttonTitle = useMemo(() => 'Entrar', []);

  const handleSubmit = useCallback(() => {
    if (!isButtonDisabled) {
      onSubmit();
    }
  }, [isButtonDisabled, onSubmit]);

  return {
    isButtonDisabled,
    buttonTitle,
    handleSubmit,
  };
};
