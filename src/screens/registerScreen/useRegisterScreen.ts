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

const validateCity = (city: string): string | undefined => {
  if (!city.trim()) return 'Cidade é obrigatória';
  if (city.trim().length < 2) return 'Cidade inválida';
  return undefined;
};

const validateState = (state: string): string | undefined => {
  if (!state.trim()) return 'Estado é obrigatório';
  const stateUpper = state.trim().toUpperCase();
  if (stateUpper.length !== 2) return 'Estado deve ter 2 letras (ex: SP)';
  if (!/^[A-Z]{2}$/.test(stateUpper)) {
    return 'Estado inválido (use sigla: SP, RJ, etc)';
  }
  return undefined;
};

export const useRegisterScreen = (
  navigation: RegisterNavigationProp
): UseRegisterScreenReturn => {
  const { signUp } = useAuth();
  const { showError } = useAlert();

  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
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
    const cityError = validateCity(formData.city);
    const stateError = validateState(formData.state);

    return (
      !firstNameError &&
      !lastNameError &&
      !usernameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError &&
      !cityError &&
      !stateError
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

  const handleCityChange = useCallback(
    (text: string) => {
      setFormData(prev => ({ ...prev, city: text }));
      if (errors.city) {
        setErrors(prev => ({ ...prev, city: undefined }));
      }
    },
    [errors.city]
  );

  const handleStateChange = useCallback(
    (text: string) => {
      setFormData(prev => ({ ...prev, state: text }));
      if (errors.state) {
        setErrors(prev => ({ ...prev, state: undefined }));
      }
      if (formData.state !== text) {
        setFormData(prev => ({ ...prev, city: '' }));
      }
    },
    [errors.state, formData.state]
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
    const cityError = validateCity(formData.city);
    const stateError = validateState(formData.state);

    if (
      firstNameError ||
      lastNameError ||
      usernameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      cityError ||
      stateError
    ) {
      setErrors({
        firstName: firstNameError,
        lastName: lastNameError,
        username: usernameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        city: cityError,
        state: stateError,
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await signUp({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        city: formData.city.trim(),
        state: formData.state.trim().toUpperCase(),
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
    handleFirstNameChange,
    handleLastNameChange,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleCityChange,
    handleStateChange,
    handleSubmit,
    handleLoginPress,
  };
};
