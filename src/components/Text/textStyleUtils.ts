import { TextStyle } from 'react-native';
import { ArenaColors } from '@/constants';

export const createLineHeightStyle = (fontSize: number, multiplier: number) => ({
  lineHeight: fontSize * multiplier,
});

export const createLetterSpacingStyle = (spacing: number) => ({
  letterSpacing: spacing,
});

export const createTextShadow = (
  color: string = ArenaColors.neutral.darkest,
  offset: { width: number; height: number } = { width: 0, height: 1 },
  radius: number = 2
) => ({
  textShadowColor: color,
  textShadowOffset: offset,
  textShadowRadius: radius,
});

export const createOpacityStyle = (opacity: number) => ({
  opacity: Math.max(0, Math.min(1, opacity)),
});

export const buttonTextStyle = [
  {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  {
    textAlign: 'center' as const,
    userSelect: 'none' as const,
  } as TextStyle,
];

export const labelTextStyle = [
  {
    includeFontPadding: false,
    textAlignVertical: 'center',
    marginBottom: 4,
  },
];

export const validationErrorStyle = [
  {
    includeFontPadding: false,
    textAlignVertical: 'center',
    color: '#EF4444',
    marginTop: 4,
    fontSize: 12,
  },
];

export const placeholderStyle = [
  {
    includeFontPadding: false,
    textAlignVertical: 'center',
    opacity: 0.6,
  },
];

export const linkTextStyle = [
  {
    includeFontPadding: false,
    textAlignVertical: 'center',
    color: ArenaColors.brand.primary,
    textDecorationLine: 'underline',
  },
];

export const badgeTextStyle = [
  {
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'center' as const,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
];

export const getResponsiveFontSize = (baseFontSize: number, screenWidth: number) => {
  const scaleFactor = screenWidth / 375;
  const minScale = 0.85;
  const maxScale = 1.15;

  const finalScale = Math.max(minScale, Math.min(maxScale, scaleFactor));
  return Math.round(baseFontSize * finalScale);
};

export const getOptimalLineHeight = (fontSize: number) => {
  if (fontSize >= 32) return 1.1;
  if (fontSize >= 24) return 1.2;
  if (fontSize >= 18) return 1.3;
  if (fontSize >= 16) return 1.4;
  return 1.5;
};