import { useState, useCallback, useMemo } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { ApiError } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';
import { useAlert } from '@/contexts/AlertContext';
import {
  UseRegisterScreenReturn,
  RegisterFormData,
  RegisterErrors,
} from './typesRegisterScreen';

type RegisterNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) return 'Email é obrigatório';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Email inválido';
  return undefined;
};

const validatePassword = (password: string): string | undefined => {
  if (!password.trim()) return 'Senha é obrigatória';
  if (password.length < 8) return 'Senha deve ter pelo menos 8 caracteres';
  return undefined;
};

const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (!confirmPassword.trim()) return 'Confirme sua senha';
  if (password !== confirmPassword) return 'As senhas não coincidem';
  return undefined;
};

const validateFullName = (fullName: string): string | undefined => {
  if (!fullName.trim()) return 'Nome completo é obrigatório';
  const words = fullName.trim().split(/\s+/);
  if (words.length < 2) return 'Digite nome e sobrenome';
  if (fullName.trim().length < 3) return 'Nome muito curto';
  return undefined;
};

const validateUsername = (username: string): string | undefined => {
  const cleanUsername = username.replace(/^@/, '');
  if (!cleanUsername.trim()) return 'Username é obrigatório';
  if (cleanUsername.trim().length < 3) return 'Username muito curto';
  if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
    return 'Username deve conter apenas letras, números e _';
  }
  return undefined;
};

const extractFirstName = (fullName: string): string => {
  const trimmed = fullName.trim();
  const firstWord = trimmed.split(/\s+/)[0];
  return firstWord || '';
};

const extractLastName = (fullName: string): string => {
  const trimmed = fullName.trim();
  const words = trimmed.split(/\s+/);
  if (words.length === 1) {
    return words[0];
  }
  return words.slice(1).join(' ');
};

export const useRegisterScreen = (
  navigation: RegisterNavigationProp
): UseRegisterScreenReturn => {
  const { signUp } = useAuth();
  const { showError } = useAlert();

  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = useMemo(() => {
    const fullNameError = validateFullName(formData.fullName);
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    return (
      !fullNameError &&
      !usernameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    );
  }, [formData]);

  const handleFullNameChange = useCallback(
    (text: string) => {
      setFormData(prev => ({ ...prev, fullName: text }));
      if (errors.fullName) {
        setErrors(prev => ({ ...prev, fullName: undefined }));
      }
    },
    [errors.fullName]
  );

  const handleFullNameBlur = useCallback(() => {
    const error = validateFullName(formData.fullName);
    if (error) {
      setErrors(prev => ({ ...prev, fullName: error }));
    }
  }, [formData.fullName]);

  const handleUsernameChange = useCallback(
    (text: string) => {
      let processedText = text;

      if (processedText.length > 0 && !processedText.startsWith('@')) {
        processedText = '@' + processedText;
      }

      if (processedText === '@') {
        processedText = '';
      }

      setFormData(prev => ({ ...prev, username: processedText }));
      if (errors.username) {
        setErrors(prev => ({ ...prev, username: undefined }));
      }
    },
    [errors.username]
  );

  const handleUsernameBlur = useCallback(() => {
    const error = validateUsername(formData.username);
    if (error) {
      setErrors(prev => ({ ...prev, username: error }));
    }
  }, [formData.username]);

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
    const error = validateEmail(formData.email);
    if (error) {
      setErrors(prev => ({ ...prev, email: error }));
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

  const handlePasswordBlur = useCallback(() => {
    const error = validatePassword(formData.password);
    if (error) {
      setErrors(prev => ({ ...prev, password: error }));
    }
  }, [formData.password]);

  const handleConfirmPasswordChange = useCallback(
    (text: string) => {
      setFormData(prev => ({ ...prev, confirmPassword: text }));
      if (errors.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: undefined }));
      }
    },
    [errors.confirmPassword]
  );

  const handleConfirmPasswordBlur = useCallback(() => {
    const error = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    if (error) {
      setErrors(prev => ({ ...prev, confirmPassword: error }));
    }
  }, [formData.password, formData.confirmPassword]);


  const handleSubmit = useCallback(async () => {
    const fullNameError = validateFullName(formData.fullName);
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    if (
      fullNameError ||
      usernameError ||
      emailError ||
      passwordError ||
      confirmPasswordError
    ) {
      setErrors({
        fullName: fullNameError,
        username: usernameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await signUp({
        firstName: extractFirstName(formData.fullName),
        lastName: extractLastName(formData.fullName),
        username: formData.username.replace(/^@/, ''),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        switch (error.status) {
          case 400:
            showError('Dados inválidos. Verifique os campos.');
            break;
          case 409:
            showError('Email ou username já cadastrado.');
            break;
          case 429:
            showError('Muitas tentativas. Tente novamente em alguns minutos.');
            break;
          default:
            showError(error.message || 'Erro ao criar conta. Tente novamente.');
        }
      } else {
        showError('Erro de conexão. Verifique sua internet.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [formData, signUp, showError]);

  const handleLoginPress = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return {
    formData,
    errors,
    isLoading,
    isFormValid,
    handleFullNameChange,
    handleFullNameBlur,
    handleUsernameChange,
    handleUsernameBlur,
    handleEmailChange,
    handleEmailBlur,
    handlePasswordChange,
    handlePasswordBlur,
    handleConfirmPasswordChange,
    handleConfirmPasswordBlur,
    handleSubmit,
    handleLoginPress,
  };
};
