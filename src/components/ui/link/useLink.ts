import { useCallback, useMemo } from 'react';
import { TextStyle } from 'react-native';
import { UseLinkParams, UseLinkReturn } from './typesLink';
import { linkVariants } from './linkVariants';
import { styles } from './stylesLink';
import {
  getFontSize,
  getFontFamily,
  getLineHeight,
  getLetterSpacing,
  getTextColor,
} from '@/components/ui/text/textUtils';
import { ArenaColors, ArenaTypography } from '@/constants';

export const useLink = (params: UseLinkParams): UseLinkReturn => {
  const { disabled, variant, underline, onPress } = params;

  const variantConfig = useMemo(() => linkVariants[variant], [variant]);

  const isInteractionDisabled = useMemo(() => disabled, [disabled]);

  const handlePress = useCallback(() => {
    if (!isInteractionDisabled) {
      onPress();
    }
  }, [isInteractionDisabled, onPress]);

  const getTextStyle = useCallback(
    (pressed: boolean): TextStyle => {
      const fontSize = getFontSize(variantConfig.size);
      const fontFamily = getFontFamily(variantConfig.family);
      const lineHeightMultiplier = getLineHeight(variantConfig.lineHeight);
      const baseColor = getTextColor(variantConfig.color || 'primary');

      let textColor: string;
      if (disabled) {
        textColor = ArenaColors.disabled.text;
      } else {
        textColor = pressed ? `${baseColor}CC` : baseColor;
      }

      return {
        ...styles.text,
        fontSize,
        fontFamily,
        lineHeight: fontSize * lineHeightMultiplier,
        letterSpacing: getLetterSpacing(variantConfig.letterSpacing),
        color: textColor,
        fontWeight: ArenaTypography.weight.bold,
        fontStyle: 'italic',
        textDecorationLine: underline ? 'underline' : 'none',
        opacity: disabled ? 0.5 : 1,
      };
    },
    [disabled, variantConfig, underline]
  );

  return {
    isInteractionDisabled,
    handlePress,
    getTextStyle,
  };
};
