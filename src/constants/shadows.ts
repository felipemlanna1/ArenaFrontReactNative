import { Platform } from 'react-native';
import { ArenaColors } from './colors';
export const ArenaShadows = {
  none: Platform.select({
    ios: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
    android: { elevation: 0 },
  }),
  subtle: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.12,
      shadowRadius: 3,
    },
    android: { elevation: 2 },
  }),
  soft: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.18,
      shadowRadius: 6,
    },
    android: { elevation: 4 },
  }),
  medium: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.22,
      shadowRadius: 10,
    },
    android: { elevation: 8 },
  }),
  strong: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.28,
      shadowRadius: 16,
    },
    android: { elevation: 12 },
  }),
  elevated: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
    },
    android: { elevation: 10 },
  }),
  button: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.22,
      shadowRadius: 8,
    },
    android: { elevation: 6 },
  }),
  input: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    },
    android: { elevation: 3 },
  }),
  inputFocused: Platform.select({
    ios: {
      shadowColor: ArenaColors.brand.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    android: { elevation: 5 },
  }),
  card: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
    },
    android: { elevation: 7 },
  }),
  brandGlow: Platform.select({
    ios: {
      shadowColor: ArenaColors.brand.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
    },
    android: { elevation: 6 },
  }),
} as const;
export type ArenaShadowKey = keyof typeof ArenaShadows;
