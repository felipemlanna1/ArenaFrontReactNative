/**
 * Toast Component - Simple Custom Implementation
 *
 * Uses React Native's Animated API for Web compatibility.
 * Auto-dismisses after 3 seconds, slides in from top.
 *
 * @module components/ui/toast
 */

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onDismiss?: () => void;
  style?: ViewStyle;
  testID?: string;
}

const VARIANT_CONFIG: Record<
  ToastVariant,
  { icon: keyof typeof Ionicons.glyphMap; color: string }
> = {
  success: { icon: 'checkmark-circle', color: ArenaColors.semantic.success },
  error: { icon: 'close-circle', color: ArenaColors.semantic.error },
  warning: { icon: 'warning', color: ArenaColors.semantic.warning },
  info: { icon: 'information-circle', color: ArenaColors.brand.primary },
};

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  duration = 3000,
  onDismiss,
  style,
  testID = 'toast',
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Slide in animation
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto-dismiss after duration
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDismiss?.();
      });
    }, duration);

    return () => clearTimeout(timeout);
  }, [translateY, opacity, duration, onDismiss]);

  const config = VARIANT_CONFIG[variant];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
          backgroundColor: ArenaColors.neutral.darkest,
          borderLeftColor: config.color,
        },
        style,
      ]}
      testID={testID}
    >
      <Ionicons name={config.icon} size={24} color={config.color} />
      <Text variant="bodyPrimary" style={styles.message}>
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: ArenaSpacing.xl,
    left: ArenaSpacing.lg,
    right: ArenaSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.md,
    borderLeftWidth: 4,
    shadowColor: ArenaColors.neutral.darkest,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 9999,
    gap: ArenaSpacing.sm,
  },
  message: {
    flex: 1,
  },
});

/**
 * Toast Manager - Global toast state
 */
interface ToastState {
  id: number;
  message: string;
  variant: ToastVariant;
}

let toastState: ToastState | null = null;
let toastListeners: Array<(state: ToastState | null) => void> = [];

/**
 * Show a toast notification
 */
export const showToast = (params: {
  message: string;
  variant?: ToastVariant;
  duration?: number;
}): void => {
  const { message, variant = 'info', duration = 3000 } = params;

  toastState = {
    id: Date.now(),
    message,
    variant,
  };

  toastListeners.forEach((listener) => listener(toastState));

  // Auto-dismiss
  setTimeout(() => {
    toastState = null;
    toastListeners.forEach((listener) => listener(null));
  }, duration + 300); // duration + animation time
};

/**
 * Subscribe to toast changes
 */
export const subscribeToToast = (
  listener: (state: ToastState | null) => void
): (() => void) => {
  toastListeners.push(listener);
  return () => {
    toastListeners = toastListeners.filter((l) => l !== listener);
  };
};

/**
 * ToastContainer - Place once at root of app
 */
export const ToastContainer: React.FC = () => {
  const [currentToast, setCurrentToast] = React.useState<ToastState | null>(
    null
  );

  useEffect(() => {
    const unsubscribe = subscribeToToast(setCurrentToast);
    return unsubscribe;
  }, []);

  if (!currentToast) return null;

  return (
    <Toast
      key={currentToast.id}
      message={currentToast.message}
      variant={currentToast.variant}
      onDismiss={() => setCurrentToast(null)}
    />
  );
};
