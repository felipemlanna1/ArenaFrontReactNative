import { ArenaColors } from './colors';

export interface ElevationStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

const SHADOW_COLOR = ArenaColors.text.primary;
const SHADOW_OFFSET_NONE = { width: 0, height: 0 };
const SHADOW_OFFSET_SMALL = { width: 0, height: 2 };
const SHADOW_OFFSET_MEDIUM = { width: 0, height: 4 };
const SHADOW_OFFSET_LARGE = { width: 0, height: 8 };
const SHADOW_OFFSET_XLARGE = { width: 0, height: 12 };

export const ArenaElevations = {
  elevation0: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: SHADOW_OFFSET_NONE,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as ElevationStyle,

  elevation1: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: SHADOW_OFFSET_SMALL,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  } as ElevationStyle,

  elevation2: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: SHADOW_OFFSET_MEDIUM,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  } as ElevationStyle,

  elevation3: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: SHADOW_OFFSET_LARGE,
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  } as ElevationStyle,

  elevation4: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: SHADOW_OFFSET_XLARGE,
    shadowOpacity: 0.24,
    shadowRadius: 24,
    elevation: 12,
  } as ElevationStyle,
} as const;

export const ArenaShadows = {
  none: 'none',

  subtle: '1px 2px 4px 0px rgba(0, 0, 0, 0.15)',
  soft: '2px 4px 8px 0px rgba(0, 0, 0, 0.22)',
  medium: '3px 6px 12px 0px rgba(0, 0, 0, 0.26)',
  strong: '4px 9px 16px 0px rgba(0, 0, 0, 0.28)',
  elevated: '4px 9px 16px 0px rgba(0, 0, 0, 0.25)',

  button: '2px 4px 8px 0px rgba(0, 0, 0, 0.25)',
  input: '1px 2px 6px 0px rgba(0, 0, 0, 0.15)',
  card: '3px 6px 12px 0px rgba(0, 0, 0, 0.24)',

  inputFocused: '0px 0px 10px 0px rgba(255, 83, 1, 0.3)',
  brandGlow: '0px 0px 12px 0px rgba(255, 83, 1, 0.4)',
  errorGlow: '0px 0px 12px 0px rgba(239, 68, 68, 0.35)',

  backgroundImage: '6px 12px 24px 0px rgba(0, 0, 0, 0.35)',
} as const;

export const ArenaShadowConfig = {
  alertShadow: {
    offset: { width: 0, height: -2 },
    opacity: 0.2,
    radius: 12,
    elevation: 8,
  },
} as const;

export type ArenaShadowKey = keyof typeof ArenaShadows;
