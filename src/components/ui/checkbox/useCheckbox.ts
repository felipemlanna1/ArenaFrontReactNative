import { useCallback, useMemo } from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { ArenaColors } from '@/constants';
import { UseCheckboxParams, UseCheckboxReturn } from './typesCheckbox';
import {
  checkboxSizes,
  checkboxVariants,
  checkboxCardVariant,
} from './checkboxVariants';
import { styles } from './stylesCheckbox';

export const useCheckbox = (params: UseCheckboxParams): UseCheckboxReturn => {
  const { checked, disabled, size, variant, onPress } = params;

  const sizeConfig = useMemo(() => checkboxSizes[size], [size]);
  const variantConfig = useMemo(() => checkboxVariants[variant], [variant]);

  const isInteractionDisabled = useMemo(() => disabled, [disabled]);

  const handlePress = useCallback(() => {
    if (!isInteractionDisabled) {
      onPress();
    }
  }, [isInteractionDisabled, onPress]);

  const computedStyles = useMemo(() => {
    if (variant === 'card') {
      const cardConfig = disabled
        ? checkboxCardVariant.disabled
        : checked
          ? checkboxCardVariant.selected
          : checkboxCardVariant.unselected;

      return {
        container: {
          ...styles.cardContainer,
          backgroundColor: cardConfig.backgroundColor,
          borderColor: cardConfig.borderColor,
          borderWidth: 'borderWidth' in cardConfig ? cardConfig.borderWidth : 1,
          opacity: 'opacity' in cardConfig ? cardConfig.opacity : 1,
        } as ViewStyle,
        checkbox: {},
        label: {
          ...styles.cardLabel,
          color: cardConfig.textColor,
          fontSize: 'fontSize' in cardConfig ? cardConfig.fontSize : 16,
          fontWeight:
            'fontWeight' in cardConfig ? cardConfig.fontWeight : '400',
        } as TextStyle,
        checkIcon: {},
      };
    }

    const currentVariant = disabled ? variantConfig.disabled : variantConfig;

    return {
      container: {
        ...styles.container,
        opacity: disabled ? 0.5 : 1,
      },
      checkbox: {
        ...styles.checkbox,
        width: sizeConfig.checkboxSize,
        height: sizeConfig.checkboxSize,
        backgroundColor: checked
          ? currentVariant.backgroundColor
          : ArenaColors.neutral.light,
        borderColor: currentVariant.borderColor,
        borderWidth: disabled ? 1 : variantConfig.borderWidth,
      },
      label: {
        ...styles.label,
        fontSize: sizeConfig.fontSize,
        color: currentVariant.labelColor,
        marginLeft: sizeConfig.spacing,
      },
      checkIcon: {
        ...styles.checkIcon,
        width: sizeConfig.iconSize,
        height: sizeConfig.iconSize,
      },
    };
  }, [checked, disabled, variant, sizeConfig, variantConfig]);

  const iconProps = useMemo(() => {
    if (variant === 'card') {
      return {
        size: 0,
        color: 'transparent',
      };
    }
    return {
      size: sizeConfig.iconSize,
      color: disabled
        ? variantConfig.disabled.checkColor
        : variantConfig.checkColor,
    };
  }, [sizeConfig.iconSize, disabled, variantConfig, variant]);

  return {
    isInteractionDisabled,
    handlePress,
    computedStyles,
    iconProps,
  };
};
