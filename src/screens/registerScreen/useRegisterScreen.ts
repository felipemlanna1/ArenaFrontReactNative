import { useState, useCallback, useMemo } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { ApiError } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';
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

const validateName = (name: string, field: string): string | undefined => {
  if (!name.trim()) return `${field} é obrigatório`;
  if (name.trim().length < 2) return `${field} muito curto`;
  return undefined;
};

const validateUsername = (username: string): string | undefined => {
  if (!username.trim()) return 'Username é obrigatório';
  if (username.trim().length < 3) return 'Username muito curto';
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username deve conter apenas letras, números e _';
  }
  return undefined;
};

export const useRegisterScreen = (
  navigation: RegisterNavigationProp
): UseRegisterScreenReturn => {
  const { signUp } = useAuth();

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    state: '',
    city: '',
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = useMemo(() => {
    const firstNameError = validateName(formData.firstName, 'Nome');
    const lastNameError = validateName(formData.lastName, 'Sobrenome');
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    return (
      !firstNameError &&
      !lastNameError &&
      !usernameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    );
  }, [formData]);

  const handleFirstNameChange = useCallback(
    (text: string) => {
      setFormData(prev => ({ ...prev, firstName: text }));
      if (errors.firstName) {
        setErrors(prev => ({ ...prev, firstName: undefined }));
      }
    },
    [errors.firstName]
  );

  const handleLastNameChange = useCallback(
    (text: string) => {
      setFormData(prev => ({ ...prev, lastName: text }));
      if (errors.lastName) {
        setErrors(prev => ({ ...prev, lastName: undefined }));
      }
    },
    [errors.lastName]
  );

  const handleUsernameChange = useCallback(
    (text: string) => {
      setFormData(prev => ({ ...prev, username: text }));
      if (errors.username) {
        setErrors(prev => ({ ...prev, username: undefined }));
      }
    },
    [errors.username]
  );

  const handleEmailChange = useCallback(
    (text: string) => {
      setFormData(prev => ({ ...prev, email: text }));
      if (errors.email) {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    },
    [errors.email]
  );

  const handlePasswordChange = useCallback(
    (text: string) => {
      setFormData(prev => ({ ...prev, password: text }));
      if (errors.password) {
        setErrors(prev => ({ ...prev, password: undefined }));
      }
    },
    [errors.password]
  );

  const handleConfirmPasswordChange = useCallback(
    (text: string) => {
      setFormData(prev => ({ ...prev, confirmPassword: text }));
      if (errors.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: undefined }));
      }
    },
    [errors.confirmPassword]
  );

  const handleStateChange = useCallback(
    (state: string) => {
      setFormData(prev => ({ ...prev, state, city: '' }));
      if (errors.state) {
        setErrors(prev => ({ ...prev, state: undefined }));
      }
    },
    [errors.state]
  );

  const handleCityChange = useCallback(
    (city: string) => {
      setFormData(prev => ({ ...prev, city }));
      if (errors.city) {
        setErrors(prev => ({ ...prev, city: undefined }));
      }
    },
    [errors.city]
  );

  const handleSubmit = useCallback(async () => {
    const firstNameError = validateName(formData.firstName, 'Nome');
    const lastNameError = validateName(formData.lastName, 'Sobrenome');
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    if (
      firstNameError ||
      lastNameError ||
      usernameError ||
      emailError ||
      passwordError ||
      confirmPasswordError
    ) {
      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
        username: usernameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    const registerPayload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      state: formData.state?.trim() || undefined,
      city: formData.city?.trim() || undefined,
    };

    console.log('[DEBUG Register] Sending payload:', JSON.stringify(registerPayload, null, 2));

    try {
      await signUp(registerPayload);
      console.log('[DEBUG Register] SignUp successful');
    } catch (error: unknown) {
      console.error('[ERROR Register] SignUp failed:', error);

      if (error instanceof ApiError) {
        switch (error.status) {
          case 400:
            setErrors({
              general: 'Dados inválidos. Verifique os campos.',
            });
            break;
          case 409:
            setErrors({
              general: 'Email ou username já cadastrado.',
            });
            break;
          case 429:
            setErrors({
              general: 'Muitas tentativas. Tente novamente em alguns minutos.',
            });
            break;
          default:
            setErrors({
              general: error.message || 'Erro ao criar conta. Tente novamente.',
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
  }, [formData, signUp]);

  const handleLoginPress = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return {
    formData,
    errors,
    isLoading,
    isFormValid,
    handleFirstNameChange,
    handleLastNameChange,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleStateChange,
    handleCityChange,
    handleSubmit,
    handleLoginPress,
  };
};
