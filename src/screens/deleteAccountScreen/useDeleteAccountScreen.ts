import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';
import { DeleteAccountStep } from './typesDeleteAccountScreen';
import { ApiError } from '@/services/http';

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

  const isKeywordValid = keyword === REQUIRED_KEYWORD;

  const handleDeleteAccount = useCallback(async () => {
    if (!isKeywordValid) {
      Alert.alert(
        'Palavra-chave incorreta',
        'Digite exatamente "EXCLUIR PERMANENTEMENTE" para confirmar.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      await deleteAccount(keyword);
    } catch (err) {
      const apiError = err as ApiError;

      if (apiError.code === 'ORGANIZER_OF_FUTURE_EVENTS') {
        Alert.alert('Não é possível excluir', apiError.message, [
          { text: 'OK' },
        ]);
      } else if (apiError.code === 'OWNER_OF_ACTIVE_GROUPS') {
        Alert.alert('Não é possível excluir', apiError.message, [
          { text: 'OK' },
        ]);
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível excluir sua conta. Tente novamente mais tarde.',
          [{ text: 'OK' }]
        );
      }
    }
  }, [isKeywordValid, keyword, deleteAccount]);

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
