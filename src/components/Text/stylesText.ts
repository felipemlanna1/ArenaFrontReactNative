import { StyleSheet, TextStyle } from 'react-native';
import { ArenaColors, ArenaTypography } from '@/constants';

export const styles = StyleSheet.create({
  baseText: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  interactive: {
    includeFontPadding: false,
    textAlignVertical: 'center',
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

  truncated: {},

  selectable: {
    userSelect: 'text' as const,
    includeFontPadding: false,
    textAlignVertical: 'center',
  } as TextStyle,

  heading: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },

  monoFont: {
    fontFamily: ArenaTypography.family.mono,
    letterSpacing: ArenaTypography.letterSpacing.normal,
  },

  uppercase: {
    textTransform: 'uppercase',
    letterSpacing: ArenaTypography.letterSpacing.wider,
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

  tightLineHeight: {},

  relaxedLineHeight: {},

  highDensity: {},

  noWrap: {
    flexWrap: 'nowrap',
  },

  container: {},

  containerCentered: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  errorText: {
    color: ArenaColors.semantic.error,
  },

  successText: {
    color: ArenaColors.semantic.success,
  },

  warningText: {
    color: ArenaColors.semantic.warning,
  },
});
