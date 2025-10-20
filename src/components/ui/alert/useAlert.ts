import { useCallback, useMemo } from 'react';
import * as Haptics from 'expo-haptics';
import { ArenaColors } from '@/constants';
import {
  UseAlertParams,
  UseAlertReturn,
  AlertVariantConfigs,
} from './typesAlert';

const VARIANT_CONFIGS: AlertVariantConfigs = {
  success: {
    iconName: 'checkmark-circle',
    iconColor: ArenaColors.semantic.success,
    containerBorderColor: ArenaColors.semantic.success,
  },
  error: {
    iconName: 'close-circle',
    iconColor: ArenaColors.semantic.error,
    containerBorderColor: ArenaColors.semantic.error,
  },
  warning: {
    iconName: 'warning',
    iconColor: ArenaColors.semantic.warning,
    containerBorderColor: ArenaColors.semantic.warning,
  },
  info: {
    iconName: 'information-circle',
    iconColor: ArenaColors.brand.primary,
    containerBorderColor: ArenaColors.brand.primary,
  },
  confirm: {
    iconName: 'map',
    iconColor: ArenaColors.brand.primary,
    containerBorderColor: ArenaColors.brand.primary,
  },
};

export const useAlertComponent = ({
  visible,
  variant,
  dismissible,
  onClose,
}: UseAlertParams): UseAlertReturn => {
  const variantConfig = useMemo(() => VARIANT_CONFIGS[variant], [variant]);

  const handleBackdropPress = useCallback(async () => {
    if (!dismissible) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  }, [dismissible, onClose]);

  const handlePrimaryPress = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  const handleSecondaryPress = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const containerStyle = useMemo(
    () => ({
      borderColor: variantConfig.containerBorderColor,
    }),
    [variantConfig]
  );

  const titleStyle = useMemo(() => ({}), []);
  const messageStyle = useMemo(() => ({}), []);

  return {
    iconName: variantConfig.iconName,
    iconColor: variantConfig.iconColor,
    containerStyle,
    titleStyle,
    messageStyle,
    handleBackdropPress,
    handlePrimaryPress,
    handleSecondaryPress,
  };
};
