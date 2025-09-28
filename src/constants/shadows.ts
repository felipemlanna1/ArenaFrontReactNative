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
      shadowColor: ArenaColors.neutral.darkest,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: { elevation: 1 },
  }),
  soft: Platform.select({
    ios: {
      shadowColor: ArenaColors.neutral.darkest,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    android: { elevation: 2 },
  }),
  medium: Platform.select({
    ios: {
      shadowColor: ArenaColors.neutral.darkest,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    android: { elevation: 4 },
  }),
  strong: Platform.select({
    ios: {
      shadowColor: ArenaColors.neutral.darkest,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
    },
    android: { elevation: 8 },
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
