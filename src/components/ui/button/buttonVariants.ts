import {
  ArenaColors,
  ArenaSpacing,
  ArenaTypography,
  ArenaBorders,
} from '@/constants';
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
    backgroundColor: ArenaColors.neutral.light,
    borderColor: ArenaColors.neutral.transparent,
    borderWidth: 0,
    textColor: ArenaColors.text.primary,
    hover: {
      backgroundColor: ArenaColors.neutral.lightHover,
      borderColor: ArenaColors.neutral.transparent,
      textColor: ArenaColors.text.secondary,
    },
    pressed: {
      backgroundColor: ArenaColors.neutral.lightPressed,
      borderColor: ArenaColors.neutral.transparent,
      textColor: ArenaColors.text.secondary,
    },
    focus: {
      backgroundColor: ArenaColors.neutral.light,
      borderColor: ArenaColors.neutral.transparent,
      textColor: ArenaColors.text.primary,
      shadowColor: ArenaColors.neutral.darkSubtle,
    },
    disabled: {
      backgroundColor: ArenaColors.neutral.lightDisabled,
      borderColor: ArenaColors.neutral.transparent,
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
      backgroundColor: ArenaColors.semantic.errorHover,
      borderColor: ArenaColors.semantic.errorHover,
      textColor: ArenaColors.neutral.light,
    },
    pressed: {
      backgroundColor: ArenaColors.semantic.errorPressed,
      borderColor: ArenaColors.semantic.errorPressed,
      textColor: ArenaColors.neutral.light,
    },
    focus: {
      backgroundColor: ArenaColors.semantic.error,
      borderColor: ArenaColors.semantic.error,
      textColor: ArenaColors.neutral.light,
      shadowColor: ArenaColors.semantic.errorFocus,
    },
    disabled: {
      backgroundColor: ArenaColors.semantic.errorDisabled,
      borderColor: ArenaColors.semantic.errorDisabled,
      textColor: ArenaColors.disabled.text,
    },
  },
  success: {
    backgroundColor: ArenaColors.semantic.success,
    borderColor: ArenaColors.semantic.success,
    borderWidth: 0,
    textColor: ArenaColors.neutral.light,
    hover: {
      backgroundColor: ArenaColors.semantic.successHover,
      borderColor: ArenaColors.semantic.successHover,
      textColor: ArenaColors.neutral.light,
    },
    pressed: {
      backgroundColor: ArenaColors.semantic.successPressed,
      borderColor: ArenaColors.semantic.successPressed,
      textColor: ArenaColors.neutral.light,
    },
    focus: {
      backgroundColor: ArenaColors.semantic.success,
      borderColor: ArenaColors.semantic.success,
      textColor: ArenaColors.neutral.light,
      shadowColor: ArenaColors.semantic.successFocus,
    },
    disabled: {
      backgroundColor: ArenaColors.semantic.successDisabled,
      borderColor: ArenaColors.semantic.successDisabled,
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
  'outline-light': {
    backgroundColor: ArenaColors.neutral.transparent,
    borderColor: ArenaColors.neutral.light,
    borderWidth: 2,
    textColor: ArenaColors.neutral.light,
    hover: {
      backgroundColor: ArenaColors.neutral.lightSubtleHover,
      borderColor: ArenaColors.neutral.light,
      textColor: ArenaColors.neutral.light,
    },
    pressed: {
      backgroundColor: ArenaColors.neutral.lightSubtlePressed,
      borderColor: ArenaColors.neutral.light,
      textColor: ArenaColors.neutral.light,
    },
    focus: {
      backgroundColor: ArenaColors.neutral.transparent,
      borderColor: ArenaColors.neutral.light,
      textColor: ArenaColors.neutral.light,
      shadowColor: ArenaColors.neutral.lightFocus,
    },
    disabled: {
      backgroundColor: ArenaColors.neutral.transparent,
      borderColor: ArenaColors.disabled.border,
      textColor: ArenaColors.disabled.text,
    },
  },
  'outline-primary': {
    backgroundColor: ArenaColors.neutral.transparent,
    borderColor: ArenaColors.brand.primary,
    borderWidth: 2,
    textColor: ArenaColors.brand.primary,
    hover: {
      backgroundColor: ArenaColors.brand.primarySubtleHover,
      borderColor: ArenaColors.brand.primaryHover,
      textColor: ArenaColors.brand.primaryHover,
    },
    pressed: {
      backgroundColor: ArenaColors.brand.primarySubtlePressed,
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
  fab: {
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
};
export const buttonSizes: ButtonSizeConfigs = {
  xs: {
    height: ArenaSpacing['3xl'],
    paddingHorizontal: ArenaSpacing.md,
    fontSize: ArenaTypography.size.xs,
    iconSize: ArenaTypography.size.sm,
    borderRadius: ArenaBorders.radius.sm,
    minWidth: ArenaSpacing['6xl'],
  },
  sm: {
    height: ArenaSpacing['3xl'] + ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.lg,
    fontSize: ArenaTypography.size.sm,
    iconSize: ArenaTypography.size.md,
    borderRadius: ArenaBorders.radius.md,
    minWidth: ArenaSpacing['6xl'] + ArenaSpacing.sm,
  },
  md: {
    height: ArenaSpacing['4xl'] + ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.xl,
    fontSize: ArenaTypography.size.md,
    iconSize: ArenaTypography.size.lg,
    borderRadius: ArenaBorders.radius.lg,
    minWidth: ArenaSpacing['6xl'] + ArenaSpacing['2xl'],
  },
  lg: {
    height: ArenaSpacing['5xl'] + ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing['2xl'],
    fontSize: ArenaTypography.size.lg,
    iconSize: ArenaTypography.size.xl,
    borderRadius: ArenaBorders.radius.xl - ArenaSpacing.xxs,
    minWidth: ArenaSpacing['6xl'] + ArenaSpacing['4xl'],
  },
  xl: {
    height: ArenaSpacing['5xl'] + ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing['3xl'],
    fontSize: ArenaTypography.size.xl,
    iconSize: ArenaTypography.size['2xl'],
    borderRadius: ArenaBorders.radius.xl,
    minWidth: ArenaSpacing['6xl'] + ArenaSpacing['5xl'] + ArenaSpacing.sm,
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
