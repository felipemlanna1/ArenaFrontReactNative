import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { View, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Alert } from '@/components/ui/alert';
import { AlertConfig, AlertVariant } from '@/components/ui/alert/typesAlert';
import { ArenaSpacing } from '@/constants';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface ConfirmConfig {
  title: string;
  message: string;
  variant?: AlertVariant;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  destructive?: boolean;
}

interface AlertContextData {
  showAlert: (config: AlertConfig) => void;
  showSuccess: (message: string, onConfirm?: () => void) => void;
  showError: (message: string, onRetry?: () => void) => void;
  showWarning: (message: string, onConfirm?: () => void) => void;
  showInfo: (message: string, onConfirm?: () => void) => void;
  showConfirm: (config: ConfirmConfig) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextData | undefined>(undefined);

export const useAlert = (): AlertContextData => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

const MAX_ALERTS = 3;

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertConfig[]>([]);

  const showAlert = useCallback((alertConfig: AlertConfig) => {
    const id = alertConfig.id || `alert-${Date.now()}-${Math.random()}`;
    const newAlert = { ...alertConfig, id };

    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });

    setAlerts(currentAlerts => {
      if (currentAlerts.length >= MAX_ALERTS) {
        return [...currentAlerts.slice(1), newAlert];
      }
      return [...currentAlerts, newAlert];
    });
  }, []);

  const hideAlert = useCallback((alertId?: string) => {
    LayoutAnimation.configureNext({
      duration: 300,
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });

    setAlerts(currentAlerts => {
      if (alertId) {
        return currentAlerts.filter(alert => alert.id !== alertId);
      }
      return currentAlerts.slice(0, -1);
    });
  }, []);

  const showSuccess = useCallback(
    (message: string, onConfirm?: () => void) => {
      showAlert({
        variant: 'success' as AlertVariant,
        title: 'Sucesso!',
        message,
        primaryButton: {
          text: 'OK',
          onPress: () => {
            if (onConfirm) onConfirm();
          },
          variant: 'primary',
        },
        dismissible: true,
        autoDismissTime: 5000,
      });
    },
    [showAlert]
  );

  const showError = useCallback(
    (message: string, onRetry?: () => void) => {
      showAlert({
        variant: 'error' as AlertVariant,
        title: 'Erro',
        message,
        primaryButton: {
          text: onRetry ? 'Tentar Novamente' : 'OK',
          onPress: () => {
            if (onRetry) onRetry();
          },
          variant: 'primary',
        },
        dismissible: true,
        autoDismissTime: 5000,
      });
    },
    [showAlert]
  );

  const showWarning = useCallback(
    (message: string, onConfirm?: () => void) => {
      showAlert({
        variant: 'warning' as AlertVariant,
        title: 'Atenção',
        message,
        primaryButton: {
          text: 'Entendi',
          onPress: () => {
            if (onConfirm) onConfirm();
          },
          variant: 'primary',
        },
        dismissible: true,
        autoDismissTime: 5000,
      });
    },
    [showAlert]
  );

  const showInfo = useCallback(
    (message: string, onConfirm?: () => void) => {
      showAlert({
        variant: 'info' as AlertVariant,
        title: 'Informação',
        message,
        primaryButton: {
          text: 'OK',
          onPress: () => {
            if (onConfirm) onConfirm();
          },
          variant: 'primary',
        },
        dismissible: true,
        autoDismissTime: 5000,
      });
    },
    [showAlert]
  );

  const showConfirm = useCallback(
    (confirmConfig: ConfirmConfig) => {
      showAlert({
        variant: (confirmConfig.variant || 'confirm') as AlertVariant,
        title: confirmConfig.title,
        message: confirmConfig.message,
        primaryButton: {
          text: confirmConfig.confirmText || 'Confirmar',
          onPress: confirmConfig.onConfirm,
          variant: confirmConfig.destructive ? 'destructive' : 'primary',
        },
        secondaryButton: {
          text: confirmConfig.cancelText || 'Cancelar',
          onPress: () => {
            if (confirmConfig.onCancel) confirmConfig.onCancel();
          },
          variant: 'secondary',
        },
        dismissible: true,
      });
    },
    [showAlert]
  );

  const value: AlertContextData = {
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm,
    hideAlert,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      {alerts.length > 0 && (
        <View style={alertContainerStyles.alertStack} pointerEvents="box-none">
          {alerts.map((alert, index) => (
            <Alert
              key={alert.id}
              visible={true}
              config={alert}
              onClose={() => hideAlert(alert.id)}
              index={index}
            />
          ))}
        </View>
      )}
    </AlertContext.Provider>
  );
};

const alertContainerStyles = {
  alertStack: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: ArenaSpacing.lg,
    paddingHorizontal: ArenaSpacing['3xl'],
    zIndex: 9999,
    pointerEvents: 'box-none' as const,
  },
};
