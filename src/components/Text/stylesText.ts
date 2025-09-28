import { StyleSheet, TextStyle } from 'react-native';
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
    userSelect: 'text' as const,
  } as TextStyle,

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