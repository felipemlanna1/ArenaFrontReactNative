import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, ApiError } from '@/services/auth';
import { useAlert } from '@/contexts/AlertContext';
import { FORGOT_PASSWORD_TEXTS } from '@/constants/texts';
import {
  ForgotPasswordScreenNavigationProp,
  ForgotPasswordFormData,
  ForgotPasswordErrors,
  UseForgotPasswordScreenReturn,
} from './typesForgotPasswordScreen';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_KEY = 'forgot_password_last_attempt';
const RATE_LIMIT_DURATION = 60000;

export const useForgotPasswordScreen = (
  navigation: ForgotPasswordScreenNavigationProp
): UseForgotPasswordScreenReturn => {
  const { showError, showSuccess } = useAlert();
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: '',
  });
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = useCallback((email: string): string | undefined => {
    if (!email.trim()) {
      return FORGOT_PASSWORD_TEXTS.ERRORS.EMAIL_REQUIRED;
    }
    if (!EMAIL_REGEX.test(email)) {
      return FORGOT_PASSWORD_TEXTS.ERRORS.EMAIL_INVALID;
    }
    return undefined;
  }, []);

  const checkRateLimit = useCallback(async (): Promise<boolean> => {
    try {
      const lastAttempt = await AsyncStorage.getItem(RATE_LIMIT_KEY);
      if (lastAttempt) {
        const timeElapsed = Date.now() - parseInt(lastAttempt, 10);
        if (timeElapsed < RATE_LIMIT_DURATION) {
          return false;
        }
      }
      return true;
    } catch {
      return true;
    }
  }, []);

  const saveAttemptTimestamp = useCallback(async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
    } catch (error) {
      void error;
    }
  }, []);

  const handleEmailChange = useCallback(
    (email: string) => {
      setFormData({ email });
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
  }, [formData.email, validateEmail]);

  const handleSubmit = useCallback(async () => {
    setErrors({});

    const emailError = validateEmail(formData.email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    const canProceed = await checkRateLimit();
    if (!canProceed) {
      showError(FORGOT_PASSWORD_TEXTS.ERRORS.RATE_LIMIT);
      return;
    }

    setIsLoading(true);

    try {
      await authService.forgotPassword({ email: formData.email.trim() });
      await saveAttemptTimestamp();

      setIsSuccess(true);
      showSuccess(FORGOT_PASSWORD_TEXTS.SUCCESS_MESSAGE);

      setTimeout(() => {
        navigation.navigate('VerifyCode', { email: formData.email.trim() });
      }, 500);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 429) {
          showError(FORGOT_PASSWORD_TEXTS.ERRORS.RATE_LIMIT);
        } else if (error.status >= 500) {
          showError(FORGOT_PASSWORD_TEXTS.ERRORS.NETWORK_ERROR);
        } else {
          showError(
            error.message || FORGOT_PASSWORD_TEXTS.ERRORS.GENERIC_ERROR
          );
        }
      } else {
        showError(FORGOT_PASSWORD_TEXTS.ERRORS.GENERIC_ERROR);
      }

      setTimeout(() => {
        navigation.navigate('VerifyCode', { email: formData.email.trim() });
      }, 500);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.email,
    validateEmail,
    checkRateLimit,
    saveAttemptTimestamp,
    navigation,
  ]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    formData,
    errors,
    isLoading,
    isSuccess,
    handleEmailChange,
    handleEmailBlur,
    handleSubmit,
    handleBackPress,
  };
};
