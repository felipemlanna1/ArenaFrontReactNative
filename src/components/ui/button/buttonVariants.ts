import { ArenaColors } from '@/constants';
import {
  ButtonVariantConfigs,
  ButtonSizeConfigs,
  ButtonAnimationConfig,
} from './typesButton';
export const buttonVariants: ButtonVariantConfigs = {
  primary: {
    backgroundColor: ArenaColors.brand.primary,
    borderColor: ArenaColors.brand.primary,
    borderWidth: 0,
    textColor: ArenaColors.neutral.light,
    hover: {
      backgroundColor: ArenaColors.brand.primaryHover,
      borderColor: ArenaColors.brand.primaryHover,
      textColor: ArenaColors.neutral.light,
    },
    pressed: {
      backgroundColor: ArenaColors.brand.primaryPressed,
      borderColor: ArenaColors.brand.primaryPressed,
      textColor: ArenaColors.neutral.light,
    },
    focus: {
      backgroundColor: ArenaColors.brand.primary,
      borderColor: ArenaColors.brand.primary,
      textColor: ArenaColors.neutral.light,
      shadowColor: ArenaColors.interaction.focus.primary,
    },
    disabled: {
      backgroundColor: ArenaColors.disabled.background,
      borderColor: ArenaColors.disabled.border,
      textColor: ArenaColors.disabled.text,
    },
  },
  secondary: {
    backgroundColor: ArenaColors.neutral.transparent,
    borderColor: ArenaColors.brand.primary,
    borderWidth: 2,
    textColor: ArenaColors.brand.primary,
    hover: {
      backgroundColor: ArenaColors.brand.primarySubtle,
      borderColor: ArenaColors.brand.primaryHover,
      textColor: ArenaColors.brand.primaryHover,
    },
    pressed: {
      backgroundColor: ArenaColors.interaction.pressed.primary,
      borderColor: ArenaColors.brand.primaryPressed,
      textColor: ArenaColors.brand.primaryPressed,
    },
    focus: {
      backgroundColor: ArenaColors.neutral.transparent,
      borderColor: ArenaColors.brand.primary,
      textColor: ArenaColors.brand.primary,
      shadowColor: ArenaColors.interaction.focus.primary,
    },
    disabled: {
      backgroundColor: ArenaColors.neutral.transparent,
      borderColor: ArenaColors.disabled.border,
      textColor: ArenaColors.disabled.text,
    },
  },
  subtle: {
    backgroundColor: ArenaColors.brand.primarySubtle,
    borderColor: ArenaColors.neutral.transparent,
    borderWidth: 0,
    textColor: ArenaColors.brand.primary,
    hover: {
      backgroundColor: ArenaColors.interaction.hover.primary,
      borderColor: ArenaColors.neutral.transparent,
      textColor: ArenaColors.brand.primaryHover,
    },
    pressed: {
      backgroundColor: ArenaColors.interaction.pressed.primary,
      borderColor: ArenaColors.neutral.transparent,
      textColor: ArenaColors.brand.primaryPressed,
    },
    focus: {
      backgroundColor: ArenaColors.brand.primarySubtle,
      borderColor: ArenaColors.neutral.transparent,
      textColor: ArenaColors.brand.primary,
      shadowColor: ArenaColors.interaction.focus.primary,
    },
    disabled: {
      backgroundColor: ArenaColors.disabled.surface,
      borderColor: ArenaColors.neutral.transparent,
      textColor: ArenaColors.disabled.text,
    },
  },
  destructive: {
    backgroundColor: ArenaColors.semantic.error,
    borderColor: ArenaColors.semantic.error,
    borderWidth: 0,
    textColor: ArenaColors.neutral.light,
    hover: {
      backgroundColor: '#DC2626',
      borderColor: '#DC2626',
      textColor: ArenaColors.neutral.light,
    },
    pressed: {
      backgroundColor: '#B91C1C',
      borderColor: '#B91C1C',
      textColor: ArenaColors.neutral.light,
    },
    focus: {
      backgroundColor: ArenaColors.semantic.error,
      borderColor: ArenaColors.semantic.error,
      textColor: ArenaColors.neutral.light,
      shadowColor: 'rgba(239, 68, 68, 0.2)',
    },
    disabled: {
      backgroundColor: 'rgba(239, 68, 68, 0.5)',
      borderColor: 'rgba(239, 68, 68, 0.5)',
      textColor: ArenaColors.disabled.text,
    },
  },
  success: {
    backgroundColor: ArenaColors.semantic.success,
    borderColor: ArenaColors.semantic.success,
    borderWidth: 0,
    textColor: ArenaColors.neutral.light,
    hover: {
      backgroundColor: '#059669',
      borderColor: '#059669',
      textColor: ArenaColors.neutral.light,
    },
    pressed: {
      backgroundColor: '#047857',
      borderColor: '#047857',
      textColor: ArenaColors.neutral.light,
    },
    focus: {
      backgroundColor: ArenaColors.semantic.success,
      borderColor: ArenaColors.semantic.success,
      textColor: ArenaColors.neutral.light,
      shadowColor: 'rgba(16, 185, 129, 0.2)',
    },
    disabled: {
      backgroundColor: 'rgba(16, 185, 129, 0.5)',
      borderColor: 'rgba(16, 185, 129, 0.5)',
      textColor: ArenaColors.disabled.text,
    },
  },
  ghost: {
    backgroundColor: ArenaColors.neutral.transparent,
    borderColor: ArenaColors.neutral.transparent,
    borderWidth: 0,
    textColor: ArenaColors.neutral.medium,
    hover: {
      backgroundColor: ArenaColors.interaction.hover.neutral,
      borderColor: ArenaColors.neutral.transparent,
      textColor: ArenaColors.neutral.light,
    },
    pressed: {
      backgroundColor: ArenaColors.interaction.pressed.neutral,
      borderColor: ArenaColors.neutral.transparent,
      textColor: ArenaColors.neutral.light,
    },
    focus: {
      backgroundColor: ArenaColors.interaction.focus.neutral,
      borderColor: ArenaColors.neutral.transparent,
      textColor: ArenaColors.neutral.medium,
      shadowColor: ArenaColors.interaction.focus.neutral,
    },
    disabled: {
      backgroundColor: ArenaColors.neutral.transparent,
      borderColor: ArenaColors.neutral.transparent,
      textColor: ArenaColors.disabled.text,
    },
  },
};
export const buttonSizes: ButtonSizeConfigs = {
  xs: {
    height: 32,
    paddingHorizontal: 12,
    fontSize: 11,
    iconSize: 14,
    borderRadius: 4,
    minWidth: 64,
  },
  sm: {
    height: 36,
    paddingHorizontal: 16,
    fontSize: 13,
    iconSize: 16,
    borderRadius: 6,
    minWidth: 72,
  },
  md: {
    height: 44,
    paddingHorizontal: 20,
    fontSize: 15,
    iconSize: 18,
    borderRadius: 8,
    minWidth: 88,
  },
  lg: {
    height: 52,
    paddingHorizontal: 24,
    fontSize: 17,
    iconSize: 20,
    borderRadius: 10,
    minWidth: 104,
  },
  xl: {
    height: 60,
    paddingHorizontal: 32,
    fontSize: 19,
    iconSize: 24,
    borderRadius: 12,
    minWidth: 120,
  },
};
export const buttonAnimations: ButtonAnimationConfig = {
  pressScale: 0.98,
  pressDuration: 100,
  releaseBounceDuration: 150,
  disabledOpacity: 0.5,
  loadingOpacity: 0.7,
};
export const getButtonVariant = (variant: keyof typeof buttonVariants) => {
  return buttonVariants[variant];
};
export const getButtonSize = (size: keyof typeof buttonSizes) => {
  return buttonSizes[size];
};
export const getButtonAnimationConfig = () => {
  return buttonAnimations;
};
