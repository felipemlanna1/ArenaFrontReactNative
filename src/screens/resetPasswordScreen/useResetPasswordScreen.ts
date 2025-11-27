import { useState, useCallback, useMemo } from 'react';
import { authService, ApiError } from '@/services/auth';
import { useAlert } from '@/contexts/AlertContext';
import { RESET_PASSWORD_TEXTS } from '@/constants/texts';
import {
  ResetPasswordScreenNavigationProp,
  ResetPasswordScreenRouteProp,
  ResetPasswordFormData,
  ResetPasswordErrors,
  PasswordRequirement,
  PasswordStrength,
  UseResetPasswordScreenReturn,
} from './typesResetPasswordScreen';

const MIN_LENGTH_REGEX = /.{8,}/;
const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const NUMBER_REGEX = /[0-9]/;
const SPECIAL_CHAR_REGEX = /[@$!%*?&]/;

export const useResetPasswordScreen = (
  navigation: ResetPasswordScreenNavigationProp,
  route: ResetPasswordScreenRouteProp
): UseResetPasswordScreenReturn => {
  const { email, code } = route.params;
  const { showError, showSuccess } = useAlert();

  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRequirements = useMemo((): PasswordRequirement[] => {
    const { password } = formData;
    return [
      {
        id: 'minLength',
        text: RESET_PASSWORD_TEXTS.REQUIREMENTS.MIN_LENGTH,
        isValid: MIN_LENGTH_REGEX.test(password),
      },
      {
        id: 'uppercase',
        text: RESET_PASSWORD_TEXTS.REQUIREMENTS.UPPERCASE,
        isValid: UPPERCASE_REGEX.test(password),
      },
      {
        id: 'lowercase',
        text: RESET_PASSWORD_TEXTS.REQUIREMENTS.LOWERCASE,
        isValid: LOWERCASE_REGEX.test(password),
      },
      {
        id: 'number',
        text: RESET_PASSWORD_TEXTS.REQUIREMENTS.NUMBER,
        isValid: NUMBER_REGEX.test(password),
      },
      {
        id: 'specialChar',
        text: RESET_PASSWORD_TEXTS.REQUIREMENTS.SPECIAL_CHAR,
        isValid: SPECIAL_CHAR_REGEX.test(password),
      },
    ];
  }, [formData]);

  const passwordStrengthPercentage = useMemo((): number => {
    const validCount = passwordRequirements.filter(req => req.isValid).length;
    return (validCount / passwordRequirements.length) * 100;
  }, [passwordRequirements]);

  const passwordStrength = useMemo((): PasswordStrength => {
    if (passwordStrengthPercentage < 40) return 'weak';
    if (passwordStrengthPercentage < 70) return 'medium';
    if (passwordStrengthPercentage < 90) return 'good';
    return 'strong';
  }, [passwordStrengthPercentage]);

  const validatePassword = useCallback(
    (password: string): string | undefined => {
      if (!password) {
        return RESET_PASSWORD_TEXTS.ERRORS.PASSWORD_REQUIRED;
      }
      const allValid = passwordRequirements.every(req => req.isValid);
      if (!allValid) {
        return RESET_PASSWORD_TEXTS.ERRORS.PASSWORD_WEAK;
      }
      return undefined;
    },
    [passwordRequirements]
  );

  const validateConfirmPassword = useCallback(
    (confirmPassword: string): string | undefined => {
      if (!confirmPassword) {
        return RESET_PASSWORD_TEXTS.ERRORS.CONFIRM_PASSWORD_REQUIRED;
      }
      if (confirmPassword !== formData.password) {
        return RESET_PASSWORD_TEXTS.ERRORS.PASSWORD_MISMATCH;
      }
      return undefined;
    },
    [formData.password]
  );

  const handlePasswordChange = useCallback((password: string) => {
    setFormData(prev => ({ ...prev, password }));
    setErrors(prev => ({ ...prev, password: undefined }));
  }, []);

  const handleConfirmPasswordChange = useCallback((confirmPassword: string) => {
    setFormData(prev => ({ ...prev, confirmPassword }));
    setErrors(prev => ({ ...prev, confirmPassword: undefined }));
  }, []);

  const handlePasswordBlur = useCallback(() => {
    if (formData.password) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        setErrors(prev => ({ ...prev, password: passwordError }));
      }
    }
  }, [formData.password, validatePassword]);

  const handleConfirmPasswordBlur = useCallback(() => {
    if (formData.confirmPassword) {
      const confirmPasswordError = validateConfirmPassword(
        formData.confirmPassword
      );
      if (confirmPasswordError) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: confirmPasswordError,
        }));
      }
    }
  }, [formData.confirmPassword, validateConfirmPassword]);

  const handleSubmit = useCallback(async () => {
    setErrors({});

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setErrors({ password: passwordError });
      return;
    }

    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword
    );
    if (confirmPasswordError) {
      setErrors({ confirmPassword: confirmPasswordError });
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPasswordWithCode({
        email,
        code,
        newPassword: formData.password,
      });

      setIsSuccess(true);
      showSuccess(RESET_PASSWORD_TEXTS.SUCCESS_MESSAGE);

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }, 3000);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 400 || error.status === 404) {
          showError(RESET_PASSWORD_TEXTS.ERRORS.TOKEN_INVALID);
        } else if (error.status >= 500) {
          showError(RESET_PASSWORD_TEXTS.ERRORS.NETWORK_ERROR);
        } else {
          showError(error.message || RESET_PASSWORD_TEXTS.ERRORS.GENERIC_ERROR);
        }
      } else {
        showError(RESET_PASSWORD_TEXTS.ERRORS.GENERIC_ERROR);
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    email,
    code,
    formData,
    validatePassword,
    validateConfirmPassword,
    navigation,
    showSuccess,
    showError,
  ]);

  const handleBackToLogin = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }, [navigation]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  return {
    email,
    code,
    formData,
    errors,
    isLoading,
    isSuccess,
    passwordRequirements,
    passwordStrength,
    passwordStrengthPercentage,
    showPassword,
    showConfirmPassword,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handlePasswordBlur,
    handleConfirmPasswordBlur,
    handleSubmit,
    handleBackToLogin,
    toggleShowPassword,
    toggleShowConfirmPassword,
  };
};
