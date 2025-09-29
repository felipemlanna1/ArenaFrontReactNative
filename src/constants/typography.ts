export const ArenaTypography = {
  family: {
    heading: 'BebasNeue-Regular',
    body: 'Inter-Regular',
    ui: 'Inter-Regular',
    mono: 'Courier',
  },
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
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
export type ArenaFontFamily = keyof typeof ArenaTypography.family;
export type ArenaFontSize = keyof typeof ArenaTypography.size;
export type ArenaFontWeight = keyof typeof ArenaTypography.weight;
export type ArenaLineHeight = keyof typeof ArenaTypography.lineHeight;
