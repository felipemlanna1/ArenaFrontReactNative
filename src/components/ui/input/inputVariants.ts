import {
  ArenaColors,
  ArenaSpacing,
  ArenaTypography,
  ArenaBorders,
} from '@/constants';
import { InputVariantPresets, InputSizePresets } from './typesInput';

export const INPUT_VARIANT_PRESETS: InputVariantPresets = {
  default: {
    backgroundColor: ArenaColors.neutral.dark,
    borderColor: `${ArenaColors.neutral.medium}4D`,
    textColor: ArenaColors.neutral.light,
    placeholderColor: `${ArenaColors.neutral.medium}99`,
    labelColor: ArenaColors.neutral.light,
    helperTextColor: `${ArenaColors.neutral.medium}CC`,
    iconColor: ArenaColors.neutral.medium,
    focusBorderColor: ArenaColors.brand.primary,
    focusRingColor: ArenaColors.interaction.focus.primary,
    focusShadowColor: ArenaColors.brand.primary,
  },

  error: {
    backgroundColor: ArenaColors.neutral.dark,
    borderColor: ArenaColors.semantic.error,
    textColor: ArenaColors.neutral.light,
    placeholderColor: `${ArenaColors.neutral.medium}99`,
    labelColor: ArenaColors.semantic.error,
    helperTextColor: ArenaColors.semantic.error,
    iconColor: ArenaColors.semantic.error,
    focusBorderColor: ArenaColors.semantic.error,
    focusRingColor: `${ArenaColors.semantic.error}33`,
    focusShadowColor: ArenaColors.semantic.error,
  },

  success: {
    backgroundColor: ArenaColors.neutral.dark,
    borderColor: ArenaColors.semantic.success,
    textColor: ArenaColors.neutral.light,
    placeholderColor: `${ArenaColors.neutral.medium}99`,
    labelColor: ArenaColors.semantic.success,
    helperTextColor: ArenaColors.semantic.success,
    iconColor: ArenaColors.semantic.success,
    focusBorderColor: ArenaColors.semantic.success,
    focusRingColor: `${ArenaColors.semantic.success}33`,
    focusShadowColor: ArenaColors.semantic.success,
  },

  warning: {
    backgroundColor: ArenaColors.neutral.dark,
    borderColor: ArenaColors.semantic.warning,
    textColor: ArenaColors.neutral.light,
    placeholderColor: `${ArenaColors.neutral.medium}99`,
    labelColor: ArenaColors.semantic.warning,
    helperTextColor: ArenaColors.semantic.warning,
    iconColor: ArenaColors.semantic.warning,
    focusBorderColor: ArenaColors.semantic.warning,
    focusRingColor: `${ArenaColors.semantic.warning}33`,
    focusShadowColor: ArenaColors.semantic.warning,
  },
};

export const INPUT_SIZE_PRESETS: InputSizePresets = {
  xs: {
    container: {
      height: 32,
      paddingHorizontal: ArenaSpacing.sm,
      paddingVertical: ArenaSpacing.xs,
      borderRadius: ArenaBorders.radius.md,
    },
    text: {
      fontSize: ArenaTypography.size.xs,
      lineHeight: ArenaTypography.size.xs * ArenaTypography.lineHeight.tight,
    },
    icon: {
      size: 14,
    },
    label: {
      fontSize: ArenaTypography.size.xs * 0.85,
      marginBottom: ArenaSpacing.xs,
    },
    helperText: {
      fontSize: ArenaTypography.size.xs * 0.9,
      marginTop: ArenaSpacing.xs,
    },
  },

  sm: {
    container: {
      height: 36,
      paddingHorizontal: ArenaSpacing.md,
      paddingVertical: ArenaSpacing.sm,
      borderRadius: ArenaBorders.radius.md,
    },
    text: {
      fontSize: ArenaTypography.size.sm,
      lineHeight: ArenaTypography.size.sm * ArenaTypography.lineHeight.tight,
    },
    icon: {
      size: 16,
    },
    label: {
      fontSize: ArenaTypography.size.sm * 0.85,
      marginBottom: ArenaSpacing.xs,
    },
    helperText: {
      fontSize: ArenaTypography.size.sm * 0.9,
      marginTop: ArenaSpacing.xs,
    },
  },

  md: {
    container: {
      height: 44,
      paddingHorizontal: ArenaSpacing.lg,
      paddingVertical: ArenaSpacing.md,
      borderRadius: ArenaBorders.radius.lg,
    },
    text: {
      fontSize: ArenaTypography.size.md,
      lineHeight: ArenaTypography.size.md * ArenaTypography.lineHeight.tight,
    },
    icon: {
      size: 18,
    },
    label: {
      fontSize: ArenaTypography.size.md * 0.85,
      marginBottom: ArenaSpacing.sm,
    },
    helperText: {
      fontSize: ArenaTypography.size.md * 0.9,
      marginTop: ArenaSpacing.sm,
    },
  },

  lg: {
    container: {
      height: 52,
      paddingHorizontal: ArenaSpacing.xl,
      paddingVertical: ArenaSpacing.lg,
      borderRadius: ArenaBorders.radius.xl,
    },
    text: {
      fontSize: ArenaTypography.size.lg,
      lineHeight: ArenaTypography.size.lg * ArenaTypography.lineHeight.tight,
    },
    icon: {
      size: 20,
    },
    label: {
      fontSize: ArenaTypography.size.lg * 0.85,
      marginBottom: ArenaSpacing.sm,
    },
    helperText: {
      fontSize: ArenaTypography.size.lg * 0.9,
      marginTop: ArenaSpacing.sm,
    },
  },

  xl: {
    container: {
      height: 60,
      paddingHorizontal: ArenaSpacing['2xl'],
      paddingVertical: ArenaSpacing.xl,
      borderRadius: ArenaBorders.radius.xl,
    },
    text: {
      fontSize: ArenaTypography.size.xl,
      lineHeight: ArenaTypography.size.xl * ArenaTypography.lineHeight.tight,
    },
    icon: {
      size: 22,
    },
    label: {
      fontSize: ArenaTypography.size.xl * 0.85,
      marginBottom: ArenaSpacing.md,
    },
    helperText: {
      fontSize: ArenaTypography.size.xl * 0.9,
      marginTop: ArenaSpacing.md,
    },
  },
};

export const getInputVariant = (
  variant: keyof typeof INPUT_VARIANT_PRESETS
) => {
  return INPUT_VARIANT_PRESETS[variant];
};

export const getInputSize = (size: keyof typeof INPUT_SIZE_PRESETS) => {
  return INPUT_SIZE_PRESETS[size];
};

export const getDisabledVariant = (
  baseVariant: keyof typeof INPUT_VARIANT_PRESETS
) => {
  return {
    ...INPUT_VARIANT_PRESETS[baseVariant],
    backgroundColor: ArenaColors.disabled.surface,
    borderColor: ArenaColors.disabled.border,
    textColor: ArenaColors.disabled.text,
    labelColor: ArenaColors.disabled.text,
    helperTextColor: ArenaColors.disabled.text,
    iconColor: ArenaColors.disabled.text,
    placeholderColor: ArenaColors.disabled.text,
  };
};

export const getReadonlyVariant = (
  baseVariant: keyof typeof INPUT_VARIANT_PRESETS
) => {
  return {
    ...INPUT_VARIANT_PRESETS[baseVariant],
    backgroundColor: `${ArenaColors.neutral.dark}80`,
    borderColor: `${ArenaColors.neutral.medium}30`,
    textColor: `${ArenaColors.neutral.light}CC`,
  };
};
