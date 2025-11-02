import { useState, useCallback } from 'react';
import { addressService } from '@/services/address';

interface CepAutofillResult {
  city: string;
  state: string;
}

interface UseCepAutofillReturn {
  isLoadingCep: boolean;
  cepError: string | null;
  fetchAddressByCep: (cep: string) => Promise<CepAutofillResult | null>;
  clearCepError: () => void;
}

export const useCepAutofill = (): UseCepAutofillReturn => {
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  const clearCepError = useCallback(() => {
    setCepError(null);
  }, []);

  const fetchAddressByCep = useCallback(
    async (cep: string): Promise<CepAutofillResult | null> => {
      const cleanCep = cep.replace(/\D/g, '');

      if (cleanCep.length !== 8) {
        setCepError('CEP deve conter 8 dígitos');
        return null;
      }

      try {
        setIsLoadingCep(true);
        setCepError(null);

        const data = await addressService.searchCep(cleanCep);

        return {
          city: data.city || '',
          state: data.state || '',
        };
      } catch (error) {
        if (error instanceof Error) {
          setCepError(error.message);
        } else {
          setCepError('Erro ao buscar CEP. Tente novamente.');
        }
        return null;
      } finally {
        setIsLoadingCep(false);
      }
    },
    []
  );

  return {
    isLoadingCep,
    cepError,
    fetchAddressByCep,
    clearCepError,
  };
};
