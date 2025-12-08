import { useState, useCallback } from 'react';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';
import { DeleteAccountStep } from './typesDeleteAccountScreen';
import { ApiError } from '@/services/http';
import { useAlert } from '@/contexts/AlertContext';

interface UseDeleteAccountScreenReturn {
  step: DeleteAccountStep;
  keyword: string;
  isDeleting: boolean;
  error: Error | null;
  setStep: (step: DeleteAccountStep) => void;
  setKeyword: (keyword: string) => void;
  handleDeleteAccount: () => Promise<void>;
  isKeywordValid: boolean;
}

const REQUIRED_KEYWORD = 'EXCLUIR PERMANENTEMENTE';

export const useDeleteAccountScreen = (): UseDeleteAccountScreenReturn => {
  const [step, setStep] = useState<DeleteAccountStep>('info');
  const [keyword, setKeyword] = useState('');
  const { deleteAccount, isDeleting, error } = useDeleteAccount();
  const { showAlert, showError } = useAlert();

  const isKeywordValid = keyword === REQUIRED_KEYWORD;

  const handleDeleteAccount = useCallback(async () => {
    if (!isKeywordValid) {
      showAlert({
        variant: 'error',
        title: 'Palavra-chave incorreta',
        message: 'Digite exatamente "EXCLUIR PERMANENTEMENTE" para confirmar.',
        primaryButton: {
          text: 'OK',
          onPress: () => {},
          variant: 'primary',
        },
        dismissible: true,
      });
      return;
    }

    try {
      await deleteAccount(keyword);
    } catch (err) {
      const apiError = err as ApiError;

      if (apiError.code === 'ORGANIZER_OF_FUTURE_EVENTS') {
        showAlert({
          variant: 'error',
          title: 'Não é possível excluir',
          message: apiError.message,
          primaryButton: {
            text: 'OK',
            onPress: () => {},
            variant: 'primary',
          },
          dismissible: true,
        });
      } else if (apiError.code === 'OWNER_OF_ACTIVE_GROUPS') {
        showAlert({
          variant: 'error',
          title: 'Não é possível excluir',
          message: apiError.message,
          primaryButton: {
            text: 'OK',
            onPress: () => {},
            variant: 'primary',
          },
          dismissible: true,
        });
      } else {
        showError(
          'Não foi possível excluir sua conta. Tente novamente mais tarde.'
        );
      }
    }
  }, [isKeywordValid, keyword, deleteAccount, showAlert, showError]);

  return {
    step,
    keyword,
    isDeleting,
    error,
    setStep,
    setKeyword,
    handleDeleteAccount,
    isKeywordValid,
  };
};
