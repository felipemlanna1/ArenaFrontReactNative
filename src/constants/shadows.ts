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
