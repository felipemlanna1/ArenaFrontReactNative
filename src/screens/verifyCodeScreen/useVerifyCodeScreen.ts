import { useState, useCallback, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService, ApiError } from '@/services/auth';
import { useTimer } from '@/hooks/useTimer';
import { useAlert } from '@/contexts/AlertContext';
import { VERIFY_CODE_TEXTS } from '@/constants/texts';
import {
  VerifyCodeScreenNavigationProp,
  VerifyCodeScreenRouteProp,
  VerifyCodeFormData,
  VerifyCodeErrors,
  UseVerifyCodeScreenReturn,
} from './typesVerifyCodeScreen';

const CODE_EXPIRATION_TIME = 600;
const RESEND_COOLDOWN_KEY = 'verify_code_resend_cooldown';
const RESEND_COOLDOWN_DURATION = 60000;

export const useVerifyCodeScreen = (
  navigation: VerifyCodeScreenNavigationProp,
  route: VerifyCodeScreenRouteProp
): UseVerifyCodeScreenReturn => {
  const email = route.params.email;
  const { showError, showSuccess } = useAlert();

  const [formData, setFormData] = useState<VerifyCodeFormData>({ code: '' });
  const [errors, setErrors] = useState<VerifyCodeErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [canResend, setCanResend] = useState(false);

  const timer = useTimer({
    initialTime: CODE_EXPIRATION_TIME,
    autoStart: true,
    onExpire: () => {
      setCanResend(true);
      showError(VERIFY_CODE_TEXTS.CODE_EXPIRED);
    },
  });

  const checkResendCooldown = useCallback(async (): Promise<boolean> => {
    try {
      const lastResend = await AsyncStorage.getItem(RESEND_COOLDOWN_KEY);
      if (lastResend) {
        const timeElapsed = Date.now() - parseInt(lastResend, 10);
        if (timeElapsed < RESEND_COOLDOWN_DURATION) {
          return false;
        }
      }
      return true;
    } catch {
      return true;
    }
  }, []);

  const saveResendTimestamp = useCallback(async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(RESEND_COOLDOWN_KEY, Date.now().toString());
    } catch (error) {
      void error;
    }
  }, []);

  const validateCode = useCallback((code: string): string | undefined => {
    if (!code || code.length === 0) {
      return VERIFY_CODE_TEXTS.ERRORS.CODE_REQUIRED;
    }
    if (code.length !== 6) {
      return VERIFY_CODE_TEXTS.ERRORS.CODE_LENGTH;
    }
    return undefined;
  }, []);

  const handleCodeChange = useCallback(
    (code: string) => {
      setFormData({ code });
      if (errors.code) {
        setErrors(prev => ({ ...prev, code: undefined }));
      }

      if (code.length === 6) {
        handleVerifyRef.current(code);
      }
    },
    [errors.code]
  );

  const handleVerify = useCallback(
    async (codeOverride?: string) => {
      const codeToVerify = codeOverride || formData.code;
      setErrors({});

      const codeError = validateCode(codeToVerify);
      if (codeError) {
        setErrors({ code: codeError });
        return;
      }

      if (timer.isExpired) {
        showError(VERIFY_CODE_TEXTS.CODE_EXPIRED);
        setCanResend(true);
        return;
      }

      setIsLoading(true);

      try {
        const response = await authService.verifyResetCode({
          email,
          code: codeToVerify,
        });

        if (response.valid) {
          showSuccess(VERIFY_CODE_TEXTS.SUCCESS_MESSAGE);

          setTimeout(() => {
            navigation.navigate('ResetPassword', {
              email,
              code: codeToVerify,
            });
          }, 500);
        } else {
          setErrors({ code: VERIFY_CODE_TEXTS.ERRORS.CODE_INVALID });
          showError(VERIFY_CODE_TEXTS.ERRORS.CODE_INVALID);
        }
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 404 || error.status === 400) {
            setErrors({ code: VERIFY_CODE_TEXTS.ERRORS.CODE_INVALID });
            showError(VERIFY_CODE_TEXTS.ERRORS.CODE_INVALID);
          } else if (error.status >= 500) {
            showError(VERIFY_CODE_TEXTS.ERRORS.NETWORK_ERROR);
          } else {
            showError(error.message || VERIFY_CODE_TEXTS.ERRORS.GENERIC_ERROR);
          }
        } else {
          showError(VERIFY_CODE_TEXTS.ERRORS.GENERIC_ERROR);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [
      formData.code,
      email,
      timer.isExpired,
      validateCode,
      navigation,
      showSuccess,
      showError,
    ]
  );

  const handleVerifyRef = useRef(handleVerify);
  useEffect(() => {
    handleVerifyRef.current = handleVerify;
  }, [handleVerify]);

  const handleResend = useCallback(async () => {
    const canProceed = await checkResendCooldown();
    if (!canProceed) {
      showError(VERIFY_CODE_TEXTS.ERRORS.RESEND_ERROR);
      return;
    }

    setIsResending(true);

    try {
      await authService.forgotPassword({ email });
      await saveResendTimestamp();

      timer.reset(CODE_EXPIRATION_TIME);
      setCanResend(false);
      setFormData({ code: '' });
      setErrors({});

      showSuccess(VERIFY_CODE_TEXTS.RESEND_SUCCESS);
    } catch (error) {
      if (error instanceof ApiError) {
        showError(error.message || VERIFY_CODE_TEXTS.ERRORS.RESEND_ERROR);
      } else {
        showError(VERIFY_CODE_TEXTS.ERRORS.RESEND_ERROR);
      }
    } finally {
      setIsResending(false);
    }
  }, [
    email,
    checkResendCooldown,
    saveResendTimestamp,
    timer,
    showSuccess,
    showError,
  ]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    email,
    formData,
    errors,
    isLoading,
    isResending,
    canResend: canResend || timer.isExpired,
    timer: {
      timeLeft: timer.timeLeft,
      formattedTime: timer.formattedTime,
      isExpired: timer.isExpired,
    },
    handleCodeChange,
    handleVerify,
    handleResend,
    handleBack,
  };
};
