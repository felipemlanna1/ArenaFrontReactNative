import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  SharedValue,
} from 'react-native-reanimated';
import { useCallback, useEffect } from 'react';
import * as Haptics from 'expo-haptics';

export interface ButtonAnimationHooks {
  scale: SharedValue<number>;
  opacity: SharedValue<number>;
  focusRingOpacity: SharedValue<number>;
  animatedContainerStyle: Record<string, unknown>;
  animatedTextStyle: Record<string, unknown>;
  animatedFocusRingStyle: Record<string, unknown>;
  handlePressIn: () => void;
  handlePressOut: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
}

export const useButtonAnimations = (
  disabled: boolean,
  loading: boolean,
  haptic: boolean,
  disableAnimations: boolean = false
): ButtonAnimationHooks => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const focusRingOpacity = useSharedValue(0);

  const triggerHapticFeedback = useCallback(() => {
    if (haptic && !disabled && !loading) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [haptic, disabled, loading]);

  const handlePressIn = useCallback(() => {
    if (disabled || loading || disableAnimations) return;

    runOnJS(triggerHapticFeedback)();
    scale.value = withSpring(0.98, {
      duration: 100,
      dampingRatio: 0.8,
    });
  }, [disabled, loading, disableAnimations, scale, triggerHapticFeedback]);

  const handlePressOut = useCallback(() => {
    if (disabled || loading || disableAnimations) return;

    scale.value = withSpring(1, {
      duration: 150,
      dampingRatio: 0.7,
    });
  }, [disabled, loading, disableAnimations, scale]);

  const handleFocus = useCallback(() => {
    if (disabled || loading) return;

    focusRingOpacity.value = withTiming(1, { duration: 200 });
  }, [disabled, loading, focusRingOpacity]);

  const handleBlur = useCallback(() => {
    focusRingOpacity.value = withTiming(0, { duration: 200 });
  }, [focusRingOpacity]);

  useEffect(() => {
    if (disableAnimations) {
      // Set static values without animation
      opacity.value = disabled ? 0.5 : loading ? 0.7 : 1;
      scale.value = 1;
      return;
    }

    if (disabled) {
      opacity.value = withTiming(0.5, { duration: 200 });
      scale.value = withTiming(1, { duration: 200 });
    } else if (loading) {
      opacity.value = withTiming(0.7, { duration: 200 });
      scale.value = withTiming(1, { duration: 200 });
    } else {
      opacity.value = withTiming(1, { duration: 200 });
    }
  }, [disabled, loading, disableAnimations, opacity, scale]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    if (disableAnimations) {
      return {};
    }
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    if (disableAnimations) {
      return {};
    }
    const textOpacity = interpolate(
      opacity.value,
      [0.5, 0.7, 1],
      [0.5, 0.8, 1]
    );

    return {
      opacity: textOpacity,
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

  return {
    scale,
    opacity,
    focusRingOpacity,
    animatedContainerStyle,
    animatedTextStyle,
    animatedFocusRingStyle,
    handlePressIn,
    handlePressOut,
    handleFocus,
    handleBlur,
  };
};

export const useLoadingSpinnerAnimation = (
  disableAnimations: boolean = false
) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (disableAnimations) return;

    const startRotation = () => {
      rotation.value = withTiming(360, { duration: 1000 }, finished => {
        if (finished) {
          rotation.value = 0;
          startRotation();
        }
      });
    };

    startRotation();
  }, [rotation, disableAnimations]);

  const animatedSpinnerStyle = useAnimatedStyle(() => {
    if (disableAnimations) {
      return {};
    }
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return {
    animatedSpinnerStyle,
  };
};
