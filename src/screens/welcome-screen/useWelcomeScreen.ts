import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { WELCOME_TEXTS } from '@/constants/texts';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

export interface UseWelcomeScreenReturn {
  handleGetStarted: () => void;
  handleLogin: () => void;
  error: string | null;
  isDev: boolean;
  titleLines: string[];
  subtitle: string;
  startButtonTitle: string;
  createAccountButtonTitle: string;
}

export const useWelcomeScreen = (): UseWelcomeScreenReturn => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const [error, setError] = useState<string | null>(null);

  const isDev = __DEV__;

  const handleGetStarted = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      navigation.navigate('ComponentsShowcase');
    } catch {
      setError('Erro ao iniciar. Tente novamente.');
    }
  }, [navigation]);

  const handleLogin = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      navigation.navigate('ComponentsShowcase');
    } catch {
      setError('Erro ao fazer login. Tente novamente.');
    }
  }, [navigation]);

  return {
    handleGetStarted,
    handleLogin,
    error,
    isDev,
    titleLines: [...WELCOME_TEXTS.TITLE_LINES],
    subtitle: WELCOME_TEXTS.SUBTITLE,
    startButtonTitle: WELCOME_TEXTS.START_BUTTON,
    createAccountButtonTitle: WELCOME_TEXTS.CREATE_ACCOUNT_BUTTON,
  };
};
