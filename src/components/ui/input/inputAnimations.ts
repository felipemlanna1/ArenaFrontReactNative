import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { InputAnimationHooks, InputVariant } from './typesInput';

export const useInputAnimations = (
  _variant: InputVariant,
  disabled: boolean,
  _readonly: boolean,
  _isFocused: boolean,
  _hasValue: boolean,
  _hasError: boolean,
  _hasSuccess: boolean,
  haptic: boolean,
  _disableAnimations: boolean = false
): InputAnimationHooks => {
  const focusRingOpacity = { value: 0 };
  const borderColor = { value: '' };
  const labelY = { value: 0 };
  const labelScale = { value: 1 };
  const errorShake = { value: 0 };
  const loadingOpacity = { value: 0 };

  const triggerHapticFeedback = useCallback(
    (type: 'focus' | 'error' | 'success') => {
      if (!haptic || disabled) return;

      switch (type) {
        case 'focus':
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'error':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        case 'success':
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
      }
    },
    [haptic, disabled]
  );

  const triggerFocusAnimation = useCallback(() => {
    triggerHapticFeedback('focus');
  }, [triggerHapticFeedback]);

  const triggerBlurAnimation = useCallback(() => {}, []);

  const triggerErrorAnimation = useCallback(() => {
    triggerHapticFeedback('error');
  }, [triggerHapticFeedback]);

  const triggerSuccessAnimation = useCallback(() => {
    triggerHapticFeedback('success');
  }, [triggerHapticFeedback]);

  const animatedContainerStyle = {};
  const animatedInputStyle = {};
  const animatedLabelStyle = {};
  const animatedFocusRingStyle = {};
  const animatedErrorShakeStyle = {};

  return {
    focusRingOpacity,
    borderColor,
    labelY,
    labelScale,
    errorShake,
    loadingOpacity,
    animatedContainerStyle,
    animatedInputStyle,
    animatedLabelStyle,
    animatedFocusRingStyle,
    animatedErrorShakeStyle,
    triggerFocusAnimation,
    triggerBlurAnimation,
    triggerErrorAnimation,
    triggerSuccessAnimation,
  };
};

export const useLoadingAnimation = (
  loading: boolean,
  _disableAnimations: boolean = false
) => {
  const animatedLoadingStyle = {
    opacity: loading ? 1 : 0,
  };

  return {
    animatedLoadingStyle,
  };
};
