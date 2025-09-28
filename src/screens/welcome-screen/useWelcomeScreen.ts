import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UseWelcomeScreenReturn } from './typesWelcomeScreen';
import { RootStackParamList } from '@/navigation/typesNavigation';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

export const useWelcomeScreen = (): UseWelcomeScreenReturn => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetStarted = useCallback(() => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
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
    isLoading,
    error,
    actions: {
      handleGetStarted,
      handleShowComponents,
      handleReset,
    },
  };
};
