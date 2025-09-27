// Arena Welcome Screen - Hook de lógica
import { useState, useCallback } from 'react';
import { UseWelcomeScreenReturn } from './typesWelcomeScreen';

export const useWelcomeScreen = (): UseWelcomeScreenReturn => {
  // Estados
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ações
  const handleGetStarted = useCallback(() => {
    setIsLoading(true);
    setError(null);

    // Simular ação de começar (futuramente navegar para próxima tela)
    setTimeout(() => {
      setIsLoading(false);
      console.log('Arena: Iniciando jornada esportiva!');
    }, 1000);
  }, []);

  const handleReset = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  return {
    // Estado
    isLoading,
    error,

    // Ações
    actions: {
      handleGetStarted,
      handleReset,
    },
  };
};
