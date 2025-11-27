import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { styles } from './stylesToast';

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

interface ToastState {
  id: number;
  message: string;
  variant: ToastVariant;
}

let toastState: ToastState | null = null;
let toastListeners: ((state: ToastState | null) => void)[] = [];

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

  toastListeners.forEach(listener => listener(toastState));

  setTimeout(() => {
    toastState = null;
    toastListeners.forEach(listener => listener(null));
  }, duration + 300);
};

export const subscribeToToast = (
  listener: (state: ToastState | null) => void
): (() => void) => {
  toastListeners.push(listener);
  return () => {
    toastListeners = toastListeners.filter(l => l !== listener);
  };
};

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
