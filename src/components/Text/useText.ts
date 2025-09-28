import { useMemo } from 'react';
import { TextStyle } from 'react-native';
import { ArenaColors, ArenaTypography } from '@/constants';
import {
  TextVariant,
  TextSize,
  TextWeight,
  TextFamily,
  TextColor,
  TextVariantPresets,
  UseTextInput,
  UseTextReturn,
  ComputedTextStyle,
} from './typesText';

const VARIANT_PRESETS: TextVariantPresets = {
  displayPrimary: {
    size: '6xl',
    weight: 'bold',
    family: 'heading',
    lineHeight: 'tight',
    letterSpacing: -0.5,
    color: 'primary',
  },
  displayAccent: {
    size: '6xl',
    weight: 'bold',
    family: 'heading',
    lineHeight: 'tight',
    letterSpacing: -0.5,
    color: 'accent',
  },
  headingPrimary: {
    size: '4xl',
    weight: 'semibold',
    family: 'heading',
    lineHeight: 'tight',
    letterSpacing: -0.25,
    color: 'primary',
  },
  headingAccent: {
    size: '4xl',
    weight: 'semibold',
    family: 'heading',
    lineHeight: 'tight',
    letterSpacing: -0.25,
    color: 'accent',
  },
  titlePrimary: {
    size: '2xl',
    weight: 'semibold',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'primary',
  },
  titleSecondary: {
    size: '2xl',
    weight: 'semibold',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'secondary',
  },
  bodyPrimary: {
    size: 'md',
    weight: 'regular',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'primary',
  },
  bodySecondary: {
    size: 'md',
    weight: 'regular',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'secondary',
  },
  bodyMuted: {
    size: 'md',
    weight: 'regular',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'muted',
  },
  bodyError: {
    size: 'md',
    weight: 'regular',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'error',
  },
  bodySuccess: {
    size: 'md',
    weight: 'regular',
    family: 'body',
    lineHeight: 'comfortable',
    letterSpacing: 0,
    color: 'success',
  },
  captionSecondary: {
    size: 'sm',
    weight: 'regular',
    family: 'body',
    lineHeight: 'relaxed',
    letterSpacing: 0.25,
    color: 'secondary',
  },
  captionMuted: {
    size: 'sm',
    weight: 'regular',
    family: 'body',
    lineHeight: 'relaxed',
    letterSpacing: 0.25,
    color: 'muted',
  },
  captionError: {
    size: 'sm',
    weight: 'regular',
    family: 'body',
    lineHeight: 'relaxed',
    letterSpacing: 0.25,
    color: 'error',
  },
  labelPrimary: {
    size: 'xs',
    weight: 'medium',
    family: 'ui',
    lineHeight: 'comfortable',
    letterSpacing: 0.5,
    color: 'primary',
  },
  labelSecondary: {
    size: 'xs',
    weight: 'medium',
    family: 'ui',
    lineHeight: 'comfortable',
    letterSpacing: 0.5,
    color: 'secondary',
  },
  labelError: {
    size: 'xs',
    weight: 'medium',
    family: 'ui',
    lineHeight: 'comfortable',
    letterSpacing: 0.5,
    color: 'error',
  },
};

const COLOR_MAP: Record<TextColor, string> = {
  primary: ArenaColors.neutral.light,
  secondary: ArenaColors.neutral.medium,
  accent: ArenaColors.brand.primary,
  muted: `${ArenaColors.neutral.medium}80`,
  inverse: ArenaColors.neutral.darkest,
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
};

const getFontSize = (size: TextSize): number => {
  return ArenaTypography.size[size];
};

const getFontWeight = (weight: TextWeight): TextStyle['fontWeight'] => {
  return ArenaTypography.weight[weight] as TextStyle['fontWeight'];
};

const getFontFamily = (family: TextFamily): string => {
  return ArenaTypography.family[family];
};

const getLineHeight = (lineHeight: 'tight' | 'comfortable' | 'relaxed' | 'loose'): number => {
  return ArenaTypography.lineHeight[lineHeight];
};

const getTextColor = (color: TextColor): string => {
  return COLOR_MAP[color];
};

export const useText = (input: UseTextInput): UseTextReturn => {
  const preset = VARIANT_PRESETS[input.variant];
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
    computedStyle: finalStyle as any,
    processedProps,
    isInteractive,
    hasEllipsis,
    isHeading,
  };
};

export const getVariantPreset = (variant: TextVariant) => {
  return VARIANT_PRESETS[variant];
};

export const isHeadingVariant = (variant: TextVariant): boolean => {
  return ['display', 'heading', 'title'].includes(variant);
};

export const getAvailableVariants = (): TextVariant[] => {
  return Object.keys(VARIANT_PRESETS) as TextVariant[];
};

export const getAvailableColors = (): TextColor[] => {
  return Object.keys(COLOR_MAP) as TextColor[];
};
