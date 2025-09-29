import { useCallback, useMemo } from 'react';
import { ArenaColors } from '@/constants';
import { UseCheckboxParams, UseCheckboxReturn } from './typesCheckbox';
import { checkboxSizes, checkboxVariants } from './checkboxVariants';
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
  }, [checked, disabled, sizeConfig, variantConfig]);

  const iconProps = useMemo(
    () => ({
      size: sizeConfig.iconSize,
      color: disabled
        ? variantConfig.disabled.checkColor
        : variantConfig.checkColor,
    }),
    [sizeConfig.iconSize, disabled, variantConfig]
  );

  return {
    isInteractionDisabled,
    handlePress,
    computedStyles,
    iconProps,
  };
};
