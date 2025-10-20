export const ArenaColors = {
  brand: {
    primary: '#FF5301',
    secondary: '#20303D',
    primaryHover: '#E04A00',
    primaryPressed: '#D23E00',
    primarySubtle: 'rgba(255, 83, 1, 0.15)',
    primarySubtleHover: 'rgba(255, 83, 1, 0.1)',
    primarySubtlePressed: 'rgba(255, 83, 1, 0.2)',
  },
  neutral: {
    darkest: '#1B1D29',
    dark: '#20303D',
    darkIntermediate: '#243441',
    darkSubtleBorder: '#2C3E50',
    medium: '#B8B8B8',
    lighter: '#E8E8E8',
    light: '#FFFFFF',
    transparent: 'transparent',
    overlay: 'rgba(0, 0, 0, 0.5)',
    lightHover: 'rgba(255, 255, 255, 0.9)',
    lightPressed: 'rgba(255, 255, 255, 0.8)',
    lightDisabled: 'rgba(255, 255, 255, 0.5)',
    lightSubtleHover: 'rgba(255, 255, 255, 0.1)',
    lightSubtlePressed: 'rgba(255, 255, 255, 0.2)',
    lightFocus: 'rgba(255, 255, 255, 0.3)',
    darkHover: 'rgba(27, 29, 41, 0.9)',
    darkPressed: 'rgba(27, 29, 41, 0.8)',
    darkMedium: 'rgba(27, 29, 41, 0.6)',
    darkSubtle: 'rgba(27, 29, 41, 0.2)',
    lightMedium: 'rgba(255, 255, 255, 0.15)',
    lightSubtle15: 'rgba(255, 255, 255, 0.1)',
    mediumSubtle30: '#B8B8B84D',
    mediumSubtle60: '#B8B8B899',
    mediumSubtle80: '#B8B8B8CC',
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
    errorHover: '#DC2626',
    errorPressed: '#B91C1C',
    errorSubtle: 'rgba(239, 68, 68, 0.1)',
    errorFocus: 'rgba(239, 68, 68, 0.2)',
    errorDisabled: 'rgba(239, 68, 68, 0.5)',
    errorSubtle20: '#EF444433',
    success: '#10B981',
    successHover: '#059669',
    successPressed: '#047857',
    successSubtle: 'rgba(16, 185, 129, 0.1)',
    successFocus: 'rgba(16, 185, 129, 0.2)',
    successDisabled: 'rgba(16, 185, 129, 0.5)',
    successSubtle20: '#10B98133',
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
