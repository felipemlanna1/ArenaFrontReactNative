import { StyleSheet } from 'react-native';
import { ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  baseText: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  interactive: {
  },

  interactivePressed: {
    opacity: 0.7,
  },

  focused: {
    textShadowColor: ArenaColors.brand.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },

  displayText: {
    textAlignVertical: 'top',
  },

  disabled: {
    opacity: 0.5,
  },

  truncated: {
  },

  selectable: {
    userSelect: 'text' as any,
  },

  headingFont: {
  },

  monoFont: {
    letterSpacing: 0,
  },

  uppercase: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  lowercase: {
    textTransform: 'lowercase',
  },

  capitalize: {
    textTransform: 'capitalize',
  },

  textLeft: {
    textAlign: 'left',
  },

  textCenter: {
    textAlign: 'center',
  },

  textRight: {
    textAlign: 'right',
  },

  textJustify: {
    textAlign: 'justify',
  },

  tightLineHeight: {
  },

  relaxedLineHeight: {
  },

  highDensity: {
  },

  noWrap: {
    flexWrap: 'nowrap',
  },

  container: {
  },

  containerCentered: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    color: '#EF4444',
  },

  successText: {
    color: '#10B981',
  },

  warningText: {
    color: '#F59E0B',
  },
});

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
  styles.baseText,
  styles.interactive,
  {
    textAlign: 'center' as const,
    userSelect: 'none' as any,
  },
];

export const labelTextStyle = [
  styles.baseText,
  {
    marginBottom: 4,
  },
];

export const validationErrorStyle = [
  styles.baseText,
  styles.errorText,
  {
    marginTop: 4,
    fontSize: 12,
  },
];

export const placeholderStyle = [
  styles.baseText,
  {
    opacity: 0.6,
  },
];

export const linkTextStyle = [
  styles.baseText,
  styles.interactive,
  {
    color: ArenaColors.brand.primary,
    textDecorationLine: 'underline',
  },
];

export const badgeTextStyle = [
  styles.baseText,
  {
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