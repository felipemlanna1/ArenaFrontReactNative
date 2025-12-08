import { useState, useEffect, useCallback } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { UseVerifyEmailScreenReturn } from './typesVerifyEmailScreen';

type VerifyEmailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'VerifyEmail'
>;
type VerifyEmailScreenRouteProp = RouteProp<RootStackParamList, 'VerifyEmail'>;

const TIMER_DURATION = 600;
const RESEND_COOLDOWN_KEY = '@Arena:resend_cooldown';
const RESEND_COOLDOWN_DURATION = 60000;

export const useVerifyEmailScreen = (): UseVerifyEmailScreenReturn => {
  const navigation = useNavigation<VerifyEmailScreenNavigationProp>();
  const route = useRoute<VerifyEmailScreenRouteProp>();
  const { user, updateUser } = useAuth();

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    const checkResendCooldown = async () => {
      try {
        const cooldownEnd = await AsyncStorage.getItem(RESEND_COOLDOWN_KEY);
        if (cooldownEnd) {
          const now = Date.now();
          const end = parseInt(cooldownEnd, 10);
          if (now < end) {
            setCanResend(false);
            setTimeout(() => setCanResend(true), end - now);
          }
        }
      } catch {
        setCanResend(true);
      }
    };

    checkResendCooldown();
  }, []);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const autoVerifyWithToken = async () => {
      const token = route.params?.token;
      if (token && token.length === 6) {
        setCode(token);
        await handleVerifyEmailWithCode(token);
      }
    };

    autoVerifyWithToken();
  }, [route.params?.token]);

  const handleVerifyEmailWithCode = async (verificationCode: string) => {
    if (!user?.email || verificationCode.length !== 6) {
      setError('Código inválido. Digite os 6 dígitos.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.verifyEmail(user.email, verificationCode);

      const updatedUser = { ...user, isEmailVerified: true };
      await updateUser(updatedUser);

      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Código inválido ou expirado';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = useCallback(async () => {
    await handleVerifyEmailWithCode(code);
  }, [code, user?.email]);

  const handleResendCode = useCallback(async () => {
    if (!user?.email || !canResend) return;

    setIsResending(true);
    setError(null);

    try {
      await authService.resendVerificationEmail(user.email);

      const cooldownEnd = Date.now() + RESEND_COOLDOWN_DURATION;
      await AsyncStorage.setItem(RESEND_COOLDOWN_KEY, cooldownEnd.toString());

      setCanResend(false);
      setTimeout(() => setCanResend(true), RESEND_COOLDOWN_DURATION);

      setTimer(TIMER_DURATION);
      setCode('');
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao reenviar código. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsResending(false);
    }
  }, [user?.email, canResend]);

  return {
    code,
    setCode,
    isLoading,
    isResending,
    error,
    timer,
    canResend,
    handleVerifyEmail,
    handleResendCode,
  };
};
