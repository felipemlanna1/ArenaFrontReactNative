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

export type ArenaBorderRadius = keyof typeof ArenaBorders.radius;
export type ArenaBorderWidth = keyof typeof ArenaBorders.width;
