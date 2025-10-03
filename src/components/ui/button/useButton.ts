import React, { useCallback, useMemo } from 'react';
import { ArenaBorders } from '@/constants';
import {
  UseButtonParams,
  UseButtonReturn,
  ButtonAccessibilityProps,
} from './typesButton';
import { getButtonVariant, getButtonSize } from './buttonVariants';
import { useButtonAnimations } from './buttonAnimations';
import { styles } from './stylesButton';
export const useButton = (params: UseButtonParams): UseButtonReturn => {
  const { variant, size, loading, disabled, haptic, fullWidth, onPress } =
    params;
  const buttonConfig = useMemo(() => getButtonVariant(variant), [variant]);
  const sizeConfig = useMemo(() => getButtonSize(size), [size]);
  const isInteractionDisabled = disabled || loading;
  const animations = useButtonAnimations(disabled, loading, haptic);
  const handlePress = useCallback(() => {
    if (isInteractionDisabled) {
      return;
    }
    onPress();
  }, [isInteractionDisabled, onPress]);
  const computedStyles = useMemo(() => {
    const containerBaseStyles = [
      styles.container,
      styles[`${size}Container` as keyof typeof styles],
      styles[`${variant}Container` as keyof typeof styles],
      {
        backgroundColor: buttonConfig.backgroundColor,
        borderColor: buttonConfig.borderColor,
        borderWidth: buttonConfig.borderWidth,
        borderRadius:
          ArenaBorders.radius[
            size === 'xs'
              ? 'sm'
              : size === 'sm'
                ? 'md'
                : size === 'md'
                  ? 'lg'
                  : size === 'lg'
                    ? 'xl'
                    : '2xl'
          ],
        height: sizeConfig.height,
        paddingHorizontal: sizeConfig.paddingHorizontal,
        minWidth: fullWidth ? undefined : sizeConfig.minWidth,
      },
    ];
    if (fullWidth) {
      containerBaseStyles.push(styles.containerFullWidth);
    }
    if (disabled || loading) {
      containerBaseStyles.push(styles.containerDisabled);
    }
    const textBaseStyles = [
      styles.text,
      styles[`${size}Text` as keyof typeof styles],
      {
        color: buttonConfig.textColor,
        fontSize: sizeConfig.fontSize,
      },
    ];
    return {
      container: containerBaseStyles,
      text: textBaseStyles,
      icon: {
        size: sizeConfig.iconSize,
        color: buttonConfig.textColor,
      },
      loadingSpinner: [
        styles.loadingSpinner,
        {
          width: sizeConfig.iconSize,
          height: sizeConfig.iconSize,
        },
      ],
    };
  }, [variant, size, buttonConfig, sizeConfig, fullWidth, disabled, loading]);
  const iconProps = useMemo(
    () => ({
      size: sizeConfig.iconSize,
      color: buttonConfig.textColor,
    }),
    [sizeConfig.iconSize, buttonConfig.textColor]
  );
  return {
    buttonConfig,
    sizeConfig,
    isInteractionDisabled,
    handlePress,
    computedStyles,
    animatedValues: {
      scale: animations.scale,
      opacity: animations.opacity,
    },
    iconProps,
  };
};
export const useButtonAccessibility = (
  children: React.ReactNode,
  loading: boolean,
  disabled: boolean,
  variant: string
): ButtonAccessibilityProps => {
  return useMemo(() => {
    const getAccessibilityHint = () => {
      if (loading) return 'Carregando, aguarde...';
      if (disabled) return 'Botão desabilitado';
      switch (variant) {
        case 'destructive':
          return 'Duplo toque para ação destrutiva';
        case 'primary':
          return 'Duplo toque para ação principal';
        case 'secondary':
          return 'Duplo toque para ação secundária';
        default:
          return 'Duplo toque para ativar';
      }
    };

    const label = typeof children === 'string' ? children : 'Botão';

    return {
      accessibilityRole: 'button' as const,
      accessibilityState: {
        disabled,
        busy: loading,
      },
      accessibilityLabel: label,
      accessibilityHint: getAccessibilityHint(),
    };
  }, [children, loading, disabled, variant]);
};
