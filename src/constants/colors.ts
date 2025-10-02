export const ArenaColors = {
  brand: {
    primary: '#FF5301',
    secondary: '#20303D',
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
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  text: {
    primary: '#1B1D29',
    secondary: '#20303D',
    inverse: '#FFFFFF',
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
  semantic: {
    error: '#EF4444',
    errorSubtle: 'rgba(239, 68, 68, 0.1)',
    success: '#10B981',
    successSubtle: 'rgba(16, 185, 129, 0.1)',
    warning: '#F59E0B',
    warningSubtle: 'rgba(245, 158, 11, 0.1)',
  },
} as const;
export type ArenaBrandColor = keyof typeof ArenaColors.brand;
export type ArenaNeutralColor = keyof typeof ArenaColors.neutral;
export const getArenaBrandColor = (color: ArenaBrandColor) => {
  return ArenaColors.brand[color];
};
export const getArenaNeutralColor = (color: ArenaNeutralColor) => {
  return ArenaColors.neutral[color];
};
