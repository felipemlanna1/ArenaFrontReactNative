import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { useCallback, useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import { ArenaColors } from '@/constants';
import { InputAnimationHooks, InputVariant } from './typesInput';
import { getInputVariant } from './inputVariants';

export const useInputAnimations = (
  variant: InputVariant,
  disabled: boolean,
  readonly: boolean,
  isFocused: boolean,
  hasValue: boolean,
  hasError: boolean,
  hasSuccess: boolean,
  haptic: boolean,
  disableAnimations: boolean = false
): InputAnimationHooks => {
  const focusRingOpacity = useSharedValue(0);
  const borderColor = useSharedValue(getInputVariant(variant).borderColor);
  const labelY = useSharedValue(0);
  const labelScale = useSharedValue(1);
  const errorShake = useSharedValue(0);
  const loadingOpacity = useSharedValue(0);

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
    if (disabled || disableAnimations) return;

    runOnJS(triggerHapticFeedback)('focus');

    focusRingOpacity.value = withTiming(1, { duration: 200 });

    const targetColor = hasError
      ? ArenaColors.semantic.error
      : hasSuccess
        ? ArenaColors.semantic.success
        : ArenaColors.brand.primary;

    borderColor.value = withTiming(targetColor, { duration: 200 });

    if (hasValue || isFocused) {
      labelY.value = withSpring(-28, {
        dampingRatio: 0.8,
        duration: 200,
      });
      labelScale.value = withSpring(0.85, {
        dampingRatio: 0.8,
        duration: 200,
      });
    }
  }, [
    disabled,
    disableAnimations,
    hasError,
    hasSuccess,
    hasValue,
    isFocused,
    focusRingOpacity,
    borderColor,
    labelY,
    labelScale,
    triggerHapticFeedback,
  ]);

  const triggerBlurAnimation = useCallback(() => {
    if (disableAnimations) return;

    focusRingOpacity.value = withTiming(0, { duration: 200 });

    const variantConfig = getInputVariant(variant);
    const targetColor = hasError
      ? ArenaColors.semantic.error
      : hasSuccess
        ? ArenaColors.semantic.success
        : variantConfig.borderColor;

    borderColor.value = withTiming(targetColor, { duration: 200 });

    if (!hasValue) {
      labelY.value = withSpring(0, {
        dampingRatio: 0.7,
        duration: 180,
      });
      labelScale.value = withSpring(1, {
        dampingRatio: 0.7,
        duration: 180,
      });
    }
  }, [
    disableAnimations,
    variant,
    hasError,
    hasSuccess,
    hasValue,
    focusRingOpacity,
    borderColor,
    labelY,
    labelScale,
  ]);

  const triggerErrorAnimation = useCallback(() => {
    if (disableAnimations) return;

    runOnJS(triggerHapticFeedback)('error');

    borderColor.value = withTiming(ArenaColors.semantic.error, {
      duration: 200,
    });

    errorShake.value = withSequence(
      withTiming(-4, { duration: 50 }),
      withTiming(4, { duration: 50 }),
      withTiming(-3, { duration: 50 }),
      withTiming(3, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  }, [disableAnimations, borderColor, errorShake, triggerHapticFeedback]);

  const triggerSuccessAnimation = useCallback(() => {
    if (disableAnimations) return;

    runOnJS(triggerHapticFeedback)('success');

    borderColor.value = withTiming(ArenaColors.semantic.success, {
      duration: 200,
    });
  }, [disableAnimations, borderColor, triggerHapticFeedback]);

  useEffect(() => {
    if (disableAnimations) {
      focusRingOpacity.value = 0;
      labelY.value = hasValue || isFocused ? -28 : 0;
      labelScale.value = hasValue || isFocused ? 0.85 : 1;
      errorShake.value = 0;
      return;
    }

    if (disabled) {
      focusRingOpacity.value = withTiming(0, { duration: 200 });
      borderColor.value = withTiming(ArenaColors.disabled.border, {
        duration: 200,
      });
    } else if (readonly) {
      focusRingOpacity.value = withTiming(0, { duration: 200 });
      borderColor.value = withTiming(`${ArenaColors.neutral.medium}30`, {
        duration: 200,
      });
    }
  }, [
    disabled,
    readonly,
    disableAnimations,
    hasValue,
    isFocused,
    focusRingOpacity,
    borderColor,
    labelY,
    labelScale,
  ]);

  useEffect(() => {
    if (hasValue || isFocused) {
      if (!disableAnimations) {
        labelY.value = withSpring(-28, {
          dampingRatio: 0.8,
          duration: 200,
        });
        labelScale.value = withSpring(0.85, {
          dampingRatio: 0.8,
          duration: 200,
        });
      } else {
        labelY.value = -28;
        labelScale.value = 0.85;
      }
    } else if (!isFocused) {
      if (!disableAnimations) {
        labelY.value = withSpring(0, {
          dampingRatio: 0.7,
          duration: 180,
        });
        labelScale.value = withSpring(1, {
          dampingRatio: 0.7,
          duration: 180,
        });
      } else {
        labelY.value = 0;
        labelScale.value = 1;
      }
    }
  }, [hasValue, isFocused, disableAnimations, labelY, labelScale]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    if (disableAnimations) {
      return {};
    }

    return {
      transform: [{ translateX: errorShake.value }],
    };
  });

  const animatedInputStyle = useAnimatedStyle(() => {
    if (disableAnimations) {
      return {};
    }

    return {
      borderColor: borderColor.value,
    };
  });

  const animatedLabelStyle = useAnimatedStyle(() => {
    if (disableAnimations) {
      return {};
    }

    return {
      transform: [{ translateY: labelY.value }, { scale: labelScale.value }],
    };
  });

  const animatedFocusRingStyle = useAnimatedStyle(() => {
    if (disableAnimations) {
      return {};
    }

    return {
      opacity: focusRingOpacity.value,
    };
  });

  const animatedErrorShakeStyle = useAnimatedStyle(() => {
    if (disableAnimations) {
      return {};
    }

    return {
      transform: [{ translateX: errorShake.value }],
    };
  });

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
  disableAnimations: boolean = false
) => {
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (disableAnimations) {
      opacity.value = loading ? 1 : 0;
      return;
    }

    opacity.value = withTiming(loading ? 1 : 0, { duration: 200 });

    if (loading) {
      const startRotation = () => {
        rotation.value = withTiming(360, { duration: 1000 }, finished => {
          if (finished && loading) {
            rotation.value = 0;
            startRotation();
          }
        });
      };
      startRotation();
    }
  }, [loading, disableAnimations, opacity, rotation]);

  const animatedLoadingStyle = useAnimatedStyle(() => {
    if (disableAnimations) {
      return {
        opacity: loading ? 1 : 0,
      };
    }

    return {
      opacity: opacity.value,
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return {
    animatedLoadingStyle,
  };
};
