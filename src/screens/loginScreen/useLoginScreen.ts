import { useState, useCallback, useMemo, useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { ApiError } from '@/services/auth';
import { storageService } from '@/utils/storage';
import { useAuth } from '@/contexts/AuthContext';
import { useAlert } from '@/contexts/AlertContext';
import {
  UseLoginScreenReturn,
  LoginFormData,
  LoginErrors,
} from './typesLoginScreen';

type LoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) return 'Email é obrigatório';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Email inválido';
  return undefined;
};

const validatePassword = (password: string): string | undefined => {
  if (!password.trim()) return 'Senha é obrigatória';
  if (password.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
  return undefined;
};

export const useLoginScreen = (
  navigation: LoginNavigationProp
): UseLoginScreenReturn => {
  const { signIn } = useAuth();
  const { showInfo } = useAlert();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedRememberMe =
          await storageService.getItem('@arena:remember_me');
        const savedEmail = await storageService.getItem('@arena:saved_email');

        if (savedRememberMe === 'true' && savedEmail) {
          setRememberMe(true);
          setFormData(prev => ({ ...prev, email: savedEmail }));
        }
      } catch {
        return;
      }
    };

    loadSavedData();
  }, []);

  const isFormValid = useMemo(() => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    return !emailError && !passwordError;
  }, [formData.email, formData.password]);

  const handleEmailChange = useCallback(
    (text: string) => {
      setFormData(prev => ({ ...prev, email: text }));
      if (errors.email) {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    },
    [errors.email]
  );

  const handleEmailBlur = useCallback(() => {
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors(prev => ({ ...prev, email: emailError }));
    }
  }, [formData.email]);

  const handlePasswordChange = useCallback(
    (text: string) => {
      setFormData(prev => ({ ...prev, password: text }));
      if (errors.password) {
        setErrors(prev => ({ ...prev, password: undefined }));
      }
    },
    [errors.password]
  );

  const handleRememberMeToggle = useCallback(() => {
    setRememberMe(prev => !prev);
  }, []);

  const handleSubmit = useCallback(async () => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await signIn({
        email: formData.email,
        password: formData.password,
        rememberMe,
      });

      if (rememberMe) {
        await storageService.setItem('@arena:remember_me', 'true');
        await storageService.setItem('@arena:saved_email', formData.email);
      }
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 401:
            setErrors({
              general: 'Email ou senha incorretos.',
            });
            break;
          case 403:
            setErrors({
              general: 'Conta não verificada. Verifique seu email.',
            });
            break;
          case 429:
            setErrors({
              general: 'Muitas tentativas. Tente novamente em alguns minutos.',
            });
            break;
          default:
            setErrors({
              general: error.message || 'Erro ao fazer login. Tente novamente.',
            });
        }
      } else {
        setErrors({
          general: 'Erro de conexão. Verifique sua internet.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData.email, formData.password, rememberMe, signIn]);

  const handleForgotPassword = useCallback(() => {
    showInfo('Funcionalidade será implementada em breve.');
  }, [showInfo]);

  const handleRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  const handleGoogleLogin = useCallback(async () => {
    setIsLoading(true);
    setErrors({});

    try {
      showInfo('Funcionalidade será implementada em breve.');
    } catch {
      setErrors({
        general: 'Erro ao fazer login com Google. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [showInfo]);

  const handleAppleLogin = useCallback(async () => {
    setIsLoading(true);
    setErrors({});

    try {
      showInfo('Funcionalidade será implementada em breve.');
    } catch {
      setErrors({
        general: 'Erro ao fazer login com Apple. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [showInfo]);

  return {
    formData,
    errors,
    isLoading,
    rememberMe,
    isFormValid,
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handleRememberMeToggle,
    handleSubmit,
    handleForgotPassword,
    handleRegister,
    handleGoogleLogin,
    handleAppleLogin,
  };
};
