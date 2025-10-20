import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { ArenaOpacity } from '@/constants';

export interface ButtonAnimationHooks {
  scale: { value: number };
  opacity: { value: number };
  focusRingOpacity: { value: number };
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
  const scale = { value: 1 };
  const opacity = {
    value: disabled ? ArenaOpacity.medium : ArenaOpacity.opaque,
  };
  const focusRingOpacity = { value: 0 };

  const triggerHaptic = useCallback(() => {
    if (haptic && !disabled && !loading) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [haptic, disabled, loading]);

  const handlePressIn = useCallback(() => {
    if (disabled || loading || disableAnimations) return;
    triggerHaptic();
  }, [disabled, loading, disableAnimations, triggerHaptic]);

  const handlePressOut = useCallback(() => {
    if (disabled || loading || disableAnimations) return;
  }, [disabled, loading, disableAnimations]);

  const handleFocus = useCallback(() => {
    if (disabled || loading || disableAnimations) return;
  }, [disabled, loading, disableAnimations]);

  const handleBlur = useCallback(() => {
    if (disabled || loading || disableAnimations) return;
  }, [disabled, loading, disableAnimations]);

  const animatedContainerStyle = {};
  const animatedTextStyle = {};
  const animatedFocusRingStyle = { opacity: 0 };

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

export const useLoadingAnimation = (
  loading: boolean,
  disableAnimations: boolean = false
) => {
  const loadingOpacity = { value: loading ? 1 : 0 };

  const animatedLoadingStyle = {
    opacity: loading ? 1 : 0,
  };

  return {
    loadingOpacity,
    animatedLoadingStyle,
  };
};
