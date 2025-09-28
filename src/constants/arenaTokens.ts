import { Platform } from 'react-native';

export const ArenaColors = {
  brand: {
    primary: '#FF5301',
    primaryHover: '#E04A00',
    primaryPressed: '#D23E00',
    primarySubtle: 'rgba(255, 83, 1, 0.15)',
  },

  neutral: {
    darkest: '#1B1D29',
    dark: '#20303D',
    medium: '#B8B8B8',
    light: '#FFFFFF',
    transparent: 'transparent',
  },

  interaction: {
    hover: {
      primary: '#E04A00',
      neutral: 'rgba(184, 184, 184, 0.1)',
      surface: '#243441',
    },
    pressed: {
      primary: '#D23E00',
      neutral: 'rgba(184, 184, 184, 0.2)',
      surface: '#1C2A35',
    },
    focus: {
      primary: 'rgba(255, 83, 1, 0.2)',
      neutral: 'rgba(184, 184, 184, 0.05)',
      surface: '#20303D',
    },
  },

  disabled: {
    background: 'rgba(255, 83, 1, 0.08)',
    text: 'rgba(184, 184, 184, 0.5)',
    border: 'rgba(255, 83, 1, 0.5)',
    surface: 'rgba(32, 48, 61, 0.5)',
  },
} as const;

export const ArenaSpacing = {
  micro: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
  '7xl': 80
} as const;

export const ArenaTypography = {
  family: {
    heading: 'BebasNeue-Regular',
    body: 'Helvetica',
    ui: 'Helvetica',
    mono: 'Menlo-Regular',
  },

  size: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 19,
    '2xl': 22,
    '3xl': 26,
    '4xl': 32,
    '5xl': 40,
    '6xl': 48,
    '7xl': 64,
  },

  weight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  lineHeight: {
    tight: 1.2,
    comfortable: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
} as const;

export const ArenaBorders = {
  radius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    '3xl': 20,
    pill: 9999,
    circle: 9999,
  },

  width: {
    none: 0,
    hairline: 0.5,
    thin: 1,
    medium: 1.5,
    thick: 2,
    bold: 3,
  },
} as const;

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

export type ArenaBrandColor = keyof typeof ArenaColors.brand;
export type ArenaNeutralColor = keyof typeof ArenaColors.neutral;

export type ArenaSpacingKey = keyof typeof ArenaSpacing;

export type ArenaBorderRadius = keyof typeof ArenaBorders.radius;
export type ArenaBorderWidth = keyof typeof ArenaBorders.width;

export type ArenaShadowKey = keyof typeof ArenaShadows;

export type ArenaFontFamily = keyof typeof ArenaTypography.family;
export type ArenaFontSize = keyof typeof ArenaTypography.size;
export type ArenaFontWeight = keyof typeof ArenaTypography.weight;
export type ArenaLineHeight = keyof typeof ArenaTypography.lineHeight;

export const getArenaSpacing = (size: ArenaSpacingKey) => {
  return ArenaSpacing[size];
};

export const getArenaBrandColor = (color: ArenaBrandColor) => {
  return ArenaColors.brand[color];
};

export const getArenaNeutralColor = (color: ArenaNeutralColor) => {
  return ArenaColors.neutral[color];
};
