import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UseWelcomeScreenReturn } from './typesWelcomeScreen';
import { RootStackParamList } from '../../navigation/types';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

export const useWelcomeScreen = (): UseWelcomeScreenReturn => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

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

  const handleShowComponents = useCallback(() => {
    navigation.navigate('ComponentsShowcase');
  }, [navigation]);

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
      handleShowComponents,
      handleReset,
    },
  };
};
