import { ReactNode } from 'react';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info' | 'confirm';

export interface AlertButton {
  text: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'destructive';
  testID?: string;
}

export interface AlertConfig {
  id?: string;
  variant: AlertVariant;
  title: string;
  message: string;
  primaryButton: AlertButton;
  secondaryButton?: AlertButton;
  dismissible?: boolean;
  icon?: ReactNode;
  testID?: string;
  autoDismissTime?: number;
}

export interface AlertProps {
  visible: boolean;
  config: AlertConfig;
  onClose: () => void;
  index?: number;
}

export interface UseAlertParams {
  visible: boolean;
  variant: AlertVariant;
  dismissible: boolean;
  onClose: () => void;
}

export interface UseAlertReturn {
  iconName: string;
  iconColor: string;
  containerStyle: object;
  titleStyle: object;
  messageStyle: object;
  handleBackdropPress: () => void | Promise<void>;
  handlePrimaryPress: () => void | Promise<void>;
  handleSecondaryPress: () => void | Promise<void>;
}

export interface AlertVariantConfig {
  iconName: string;
  iconColor: string;
  containerBorderColor: string;
}

export type AlertVariantConfigs = Record<AlertVariant, AlertVariantConfig>;
