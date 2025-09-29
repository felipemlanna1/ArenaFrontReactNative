import { useCallback, useMemo, useState } from 'react';
import { UseLinkParams, UseLinkReturn } from './typesLink';
import { linkSizes, linkVariants } from './linkVariants';
import { styles } from './stylesLink';

export const useLink = (params: UseLinkParams): UseLinkReturn => {
  const { disabled, size, variant, underline, onPress } = params;

  const [isPressed, setIsPressed] = useState(false);

  const sizeConfig = useMemo(() => linkSizes[size], [size]);
  const variantConfig = useMemo(() => linkVariants[variant], [variant]);

  const isInteractionDisabled = useMemo(() => disabled, [disabled]);

  const handlePress = useCallback(() => {
    if (!isInteractionDisabled) {
      onPress();
    }
  }, [isInteractionDisabled, onPress]);

  const handlePressIn = useCallback(() => {
    if (!isInteractionDisabled) {
      setIsPressed(true);
    }
  }, [isInteractionDisabled]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  const computedStyles = useMemo(() => {
    const currentVariant = disabled ? variantConfig.disabled : variantConfig;
    const textColor = isPressed
      ? currentVariant.pressedColor || currentVariant.color
      : currentVariant.color;

    return {
      text: [
        styles.text,
        {
          fontSize: sizeConfig.fontSize,
          lineHeight: sizeConfig.lineHeight,
          color: textColor,
          textDecorationLine: underline ? 'underline' : 'none',
          opacity: disabled ? 0.5 : 1,
        },
      ],
    };
  }, [disabled, sizeConfig, variantConfig, underline, isPressed]);

  return {
    isInteractionDisabled,
    handlePress,
    handlePressIn,
    handlePressOut,
    computedStyles,
  };
};
