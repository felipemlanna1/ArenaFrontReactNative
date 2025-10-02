import { useMemo } from 'react';
import { TextStyle } from 'react-native';
import {
  TextVariant,
  UseTextInput,
  UseTextReturn,
  ComputedTextStyle,
} from './typesText';
import { TEXT_VARIANT_PRESETS } from './textPresets';
import {
  getFontSize,
  getFontWeight,
  getFontFamily,
  getLineHeight,
  getTextColor,
} from './textUtils';
export const useText = (input: UseTextInput): UseTextReturn => {
  const preset = TEXT_VARIANT_PRESETS[input.variant];

  if (!preset) {
    throw new Error(
      `Invalid text variant: "${input.variant}". Available variants: ${Object.keys(TEXT_VARIANT_PRESETS).join(', ')}`
    );
  }

  const resolvedSize = preset.size;
  const resolvedWeight = preset.weight;
  const resolvedFamily = preset.family;
  const resolvedColor = preset.color;
  const resolvedAlign = 'left';
  const resolvedTransform = 'none';
  const resolvedLineHeight = preset.lineHeight;
  const resolvedLetterSpacing = preset.letterSpacing;
  const computedStyle: ComputedTextStyle = useMemo(() => {
    const baseStyle: ComputedTextStyle = {
      fontSize: getFontSize(resolvedSize),
      fontWeight: getFontWeight(resolvedWeight),
      fontFamily: getFontFamily(resolvedFamily),
      lineHeight: getFontSize(resolvedSize) * getLineHeight(resolvedLineHeight),
      letterSpacing: resolvedLetterSpacing,
      color: getTextColor(resolvedColor || 'primary'),
      textAlign: resolvedAlign,
      textTransform: resolvedTransform,
      includeFontPadding: false,
      textAlignVertical: 'center',
    };
    return baseStyle;
  }, [
    resolvedSize,
    resolvedWeight,
    resolvedFamily,
    resolvedColor,
    resolvedAlign,
    resolvedTransform,
    resolvedLineHeight,
    resolvedLetterSpacing,
  ]);
  const finalStyle = useMemo(() => {
    if (!input.style) return computedStyle;
    if (Array.isArray(input.style)) {
      return [computedStyle, ...input.style];
    }
    return { ...computedStyle, ...input.style };
  }, [computedStyle, input.style]);
  const processedProps = useMemo(
    () => ({
      numberOfLines: input.numberOfLines,
      ellipsizeMode: input.ellipsizeMode,
      adjustsFontSizeToFit: input.adjustsFontSizeToFit,
      minimumFontScale: input.minimumFontScale,
      selectable: input.selectable,
      onPress: input.onPress,
      onLongPress: input.onLongPress,
      accessibilityLabel: input.accessibilityLabel,
      accessibilityHint: input.accessibilityHint,
      accessibilityRole: input.accessibilityRole,
      testID: input.testID,
    }),
    [
      input.numberOfLines,
      input.ellipsizeMode,
      input.adjustsFontSizeToFit,
      input.minimumFontScale,
      input.selectable,
      input.onPress,
      input.onLongPress,
      input.accessibilityLabel,
      input.accessibilityHint,
      input.accessibilityRole,
      input.testID,
    ]
  );
  const isInteractive = Boolean(input.onPress || input.onLongPress);
  const hasEllipsis = Boolean(input.numberOfLines && input.numberOfLines > 0);
  const isHeading =
    input.variant.startsWith('display') ||
    input.variant.startsWith('heading') ||
    input.variant.startsWith('title');
  return {
    computedStyle: finalStyle as TextStyle,
    processedProps,
    isInteractive,
    hasEllipsis,
    isHeading,
  };
};
export const getVariantPreset = (variant: TextVariant) => {
  return TEXT_VARIANT_PRESETS[variant];
};
export const getAvailableVariants = (): TextVariant[] => {
  return Object.keys(TEXT_VARIANT_PRESETS) as TextVariant[];
};
