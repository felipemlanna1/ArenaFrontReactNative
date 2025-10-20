import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Animated, Platform } from 'react-native';
import { Text } from '@/components/ui/text';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextData {
  showToast: (message: string, type?: ToastType) => void;
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

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const insets = useSafeAreaInsets();

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type };

    setToasts(prev => [...prev, newToast]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const getToastBackgroundColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return ArenaColors.semantic.success;
      case 'error':
        return ArenaColors.semantic.error;
      case 'warning':
        return ArenaColors.semantic.warning;
      case 'info':
      default:
        return ArenaColors.brand.primary;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <View
        style={[
          styles.toastContainer,
          {
            top: Platform.OS === 'ios' ? insets.top + 10 : 30,
          },
        ]}
        pointerEvents="none"
      >
        {toasts.map(toast => (
          <Animated.View
            key={toast.id}
            style={[
              styles.toast,
              { backgroundColor: getToastBackgroundColor(toast.type) },
            ]}
          >
            <Text variant="bodyPrimary" style={styles.toastText}>
              {toast.message}
            </Text>
          </Animated.View>
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
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.md,
    marginBottom: ArenaSpacing.sm,
    width: '100%',
    alignItems: 'center',
  },
  toastText: {
    color: ArenaColors.neutral.light,
    textAlign: 'center',
  },
});