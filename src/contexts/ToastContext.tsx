import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  Animated,
  Platform,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaElevations,
} from '@/constants';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastAction {
  label: string;
  onPress: () => void;
}

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  action?: ToastAction;
}

interface ToastContextData {
  showToast: (message: string, type?: ToastType, action?: ToastAction) => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

const MAX_TOASTS = 3;
const TOAST_DURATION = 3000;
const SWIPE_THRESHOLD = 50;

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(100)).current;
  const panY = useRef(new Animated.Value(0)).current;

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

    Animated.timing(progress, {
      toValue: 0,
      duration: TOAST_DURATION,
      useNativeDriver: false,
    }).start();

    const timeout = setTimeout(() => {
      dismissToast();
    }, TOAST_DURATION);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismissToast = () => {
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
    ]).start(() => onDismiss(toast.id));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -SWIPE_THRESHOLD) {
          Animated.timing(panY, {
            toValue: -200,
            duration: 200,
            useNativeDriver: true,
          }).start(() => onDismiss(toast.id));
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const getToastConfig = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          icon: 'checkmark-circle' as const,
          color: ArenaColors.semantic.success,
        };
      case 'error':
        return {
          icon: 'close-circle' as const,
          color: ArenaColors.semantic.error,
        };
      case 'warning':
        return {
          icon: 'warning' as const,
          color: ArenaColors.semantic.warning,
        };
      case 'info':
      default:
        return {
          icon: 'information-circle' as const,
          color: ArenaColors.brand.primary,
        };
    }
  };

  const config = getToastConfig(toast.type);
  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.toast,
        {
          backgroundColor: config.color,
          transform: [{ translateY: Animated.add(translateY, panY) }],
          opacity,
        },
      ]}
    >
      <View style={styles.toastContent}>
        <Ionicons
          name={config.icon}
          size={24}
          color={ArenaColors.neutral.light}
        />
        <Text
          variant="labelPrimary"
          style={styles.toastMessage}
          numberOfLines={2}
        >
          {toast.message}
        </Text>
        {toast.action && (
          <TouchableOpacity
            onPress={() => {
              toast.action?.onPress();
              dismissToast();
            }}
            style={styles.actionButton}
          >
            <Text variant="labelPrimary" style={styles.actionText}>
              {toast.action.label}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
    </Animated.View>
  );
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const insets = useSafeAreaInsets();

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', action?: ToastAction) => {
      const id = Date.now().toString();
      const newToast: Toast = { id, message, type, action };

      setToasts(prev => {
        const updatedToasts = [...prev, newToast];
        return updatedToasts.slice(-MAX_TOASTS);
      });
    },
    []
  );

  const handleDismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <View
        style={[
          styles.toastContainer,
          {
            top: Platform.OS === 'ios' ? insets.top + 80 : 80,
          },
        ]}
        pointerEvents="box-none"
      >
        {toasts.map(toast => (
          <ToastItem key={toast.id} toast={toast} onDismiss={handleDismiss} />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    left: ArenaSpacing.lg,
    right: ArenaSpacing.lg,
    zIndex: 9999,
    alignItems: 'center',
  },
  toast: {
    borderRadius: ArenaBorders.radius.md,
    marginBottom: ArenaSpacing.sm,
    width: '100%',
    overflow: 'hidden',
    ...ArenaElevations.elevation4,
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.sm,
  },
  toastMessage: {
    flex: 1,
    color: ArenaColors.neutral.light,
  },
  actionButton: {
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    backgroundColor: ArenaColors.neutral.overlay,
    borderRadius: ArenaBorders.radius.sm,
  },
  actionText: {
    color: ArenaColors.neutral.light,
  },
  progressBar: {
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.medium,
  },
});
