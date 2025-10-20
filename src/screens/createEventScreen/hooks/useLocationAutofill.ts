import { useState, useCallback } from 'react';
import { EventLocation } from '../typesCreateEventScreen';

interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

interface UseLocationAutofillReturn {
  isLoadingCep: boolean;
  cepError: string | null;
  fetchAddressByCep: (cep: string) => Promise<Partial<EventLocation> | null>;
}

export const useLocationAutofill = (): UseLocationAutofillReturn => {
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  const fetchAddressByCep = useCallback(
    async (cep: string): Promise<Partial<EventLocation> | null> => {
      const cleanCep = cep.replace(/\D/g, '');

      if (cleanCep.length !== 8) {
        setCepError('CEP deve conter 8 dígitos');
        return null;
      }

      try {
        setIsLoadingCep(true);
        setCepError(null);

        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCep}/json/`
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar CEP');
        }

        const data: CepResponse = await response.json();

        if (data.erro) {
          setCepError('CEP não encontrado');
          return null;
        }

        return {
          zipCode: data.cep.replace('-', ''),
          street: data.logradouro || '',
          district: data.bairro || '',
          city: data.localidade || '',
          state: data.uf || '',
          country: 'Brasil',
        };
      } catch {
        setCepError('Erro ao buscar endereço. Tente novamente.');
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
  };
};
