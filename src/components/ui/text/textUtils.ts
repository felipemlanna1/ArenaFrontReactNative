import { TextStyle } from 'react-native';
import { ArenaColors, ArenaTypography } from '@/constants';
import {
  TextSize,
  TextWeight,
  TextFamily,
  TextColor,
  TextVariant,
} from './typesText';

export const COLOR_MAP: Record<TextColor, string> = {
  primary: ArenaColors.neutral.light,
  secondary: ArenaColors.neutral.medium,
  accent: ArenaColors.brand.primary,
  muted: `${ArenaColors.neutral.medium}80`,
  inverse: ArenaColors.neutral.darkest,
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
};

export const getFontSize = (size: TextSize): number => {
  return ArenaTypography.size[size];
};

export const getFontWeight = (weight: TextWeight): TextStyle['fontWeight'] => {
  return ArenaTypography.weight[weight] as TextStyle['fontWeight'];
};

const getBodyFontFamilyByWeight = (weight: TextWeight): string => {
  switch (weight) {
    case 'bold':
    case 'extrabold':
      return ArenaTypography.fontFamily.bold;
    case 'semibold':
      return ArenaTypography.fontFamily.semibold;
    case 'medium':
      return ArenaTypography.fontFamily.medium;
    default:
      return ArenaTypography.fontFamily.regular;
  }
};

const getFallbackFontFamily = (family: TextFamily): string => {
  return ArenaTypography.family[family];
};

export const getFontFamily = (
  family: TextFamily,
  weight?: TextWeight
): string => {
  if (family === 'body' && weight) {
    return getBodyFontFamilyByWeight(weight);
  }

  return getFallbackFontFamily(family);
};

export const getLineHeight = (
  lineHeight: 'tight' | 'comfortable' | 'relaxed' | 'loose'
): number => {
  return ArenaTypography.lineHeight[lineHeight];
};

export const getLetterSpacing = (
  letterSpacing:
    | number
    | 'tighter'
    | 'tight'
    | 'normal'
    | 'wide'
    | 'wider'
    | 'widest'
): number => {
  if (typeof letterSpacing === 'number') {
    return letterSpacing;
  }
  return ArenaTypography.letterSpacing[letterSpacing];
};

export const getTextColor = (color: TextColor): string => {
  return COLOR_MAP[color];
};

export const isHeadingVariant = (variant: TextVariant): boolean => {
  return ['display', 'heading', 'title'].includes(variant);
};

export const getAvailableColors = (): TextColor[] => {
  return Object.keys(COLOR_MAP) as TextColor[];
};
