import {
  ArenaColors,
  ArenaSpacing,
  ArenaTypography,
  ArenaBorders,
} from '@/constants';
import {
  InputVariantPresets,
  InputSizePresets,
  InputType,
  InputTypeConfig,
} from './typesInput';

export const INPUT_VARIANT_PRESETS: InputVariantPresets = {
  default: {
    backgroundColor: ArenaColors.neutral.lighter,
    borderColor: ArenaColors.neutral.medium,
    textColor: ArenaColors.text.primary,
    placeholderColor: ArenaColors.neutral.mediumSubtle60,
    labelColor: ArenaColors.text.primary,
    helperTextColor: ArenaColors.neutral.mediumSubtle80,
    iconColor: ArenaColors.neutral.medium,
    focusBorderColor: ArenaColors.brand.primary,
    focusRingColor: ArenaColors.interaction.focus.primary,
    focusShadowColor: ArenaColors.brand.primary,
  },

  error: {
    backgroundColor: ArenaColors.neutral.dark,
    borderColor: ArenaColors.semantic.error,
    textColor: ArenaColors.neutral.light,
    placeholderColor: ArenaColors.neutral.mediumSubtle60,
    labelColor: ArenaColors.semantic.error,
    helperTextColor: ArenaColors.semantic.error,
    iconColor: ArenaColors.semantic.error,
    focusBorderColor: ArenaColors.semantic.error,
    focusRingColor: ArenaColors.semantic.errorSubtle20,
    focusShadowColor: ArenaColors.semantic.error,
  },

  success: {
    backgroundColor: ArenaColors.neutral.dark,
    borderColor: ArenaColors.semantic.success,
    textColor: ArenaColors.neutral.light,
    placeholderColor: ArenaColors.neutral.mediumSubtle60,
    labelColor: ArenaColors.semantic.success,
    helperTextColor: ArenaColors.semantic.success,
    iconColor: ArenaColors.semantic.success,
    focusBorderColor: ArenaColors.semantic.success,
    focusRingColor: ArenaColors.semantic.successSubtle20,
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
      height: ArenaSpacing['3xl'],
      paddingHorizontal: ArenaSpacing.sm,
      paddingVertical: ArenaSpacing.xs,
      borderRadius: ArenaBorders.radius.md,
    },
    text: {
      fontSize: ArenaTypography.size.xs,
      lineHeight: ArenaTypography.size.xs * ArenaTypography.lineHeight.tight,
    },
    icon: {
      size: ArenaTypography.size.sm,
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
      height: ArenaSpacing['3xl'] + ArenaSpacing.xs,
      paddingHorizontal: ArenaSpacing.md,
      paddingVertical: ArenaSpacing.sm,
      borderRadius: ArenaBorders.radius.md,
    },
    text: {
      fontSize: ArenaTypography.size.sm,
      lineHeight: ArenaTypography.size.sm * ArenaTypography.lineHeight.tight,
    },
    icon: {
      size: ArenaSpacing.lg,
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
      height: ArenaSpacing['4xl'] + ArenaSpacing.xs,
      paddingHorizontal: ArenaSpacing.lg,
      paddingVertical: ArenaSpacing.md,
      borderRadius: ArenaBorders.radius.lg,
    },
    text: {
      fontSize: ArenaTypography.size.md,
      lineHeight: ArenaTypography.size.md * ArenaTypography.lineHeight.tight,
    },
    icon: {
      size: ArenaTypography.size.lg,
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
      height: ArenaSpacing['5xl'] + ArenaSpacing.xs,
      paddingHorizontal: ArenaSpacing.xl,
      paddingVertical: ArenaSpacing.lg,
      borderRadius: ArenaBorders.radius.xl,
    },
    text: {
      fontSize: ArenaTypography.size.lg,
      lineHeight: ArenaTypography.size.lg * ArenaTypography.lineHeight.tight,
    },
    icon: {
      size: ArenaSpacing.xl,
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
      height: ArenaSpacing['5xl'] + ArenaSpacing.md,
      paddingHorizontal: ArenaSpacing['2xl'],
      paddingVertical: ArenaSpacing.xl,
      borderRadius: ArenaBorders.radius.xl,
    },
    text: {
      fontSize: ArenaTypography.size.xl,
      lineHeight: ArenaTypography.size.xl * ArenaTypography.lineHeight.tight,
    },
    icon: {
      size: ArenaTypography.size['2xl'],
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

export const getInputTypeConfig = (
  type: InputType = 'text'
): InputTypeConfig => {
  const configs: Record<InputType, InputTypeConfig> = {
    text: {
      keyboardType: 'default',
      autoCapitalize: 'sentences',
      autoComplete: 'off',
    },
    email: {
      keyboardType: 'email-address',
      autoCapitalize: 'none',
      autoComplete: 'email',
      textContentType: 'emailAddress',
    },
    password: {
      keyboardType: 'default',
      autoCapitalize: 'none',
      secureTextEntry: true,
      autoComplete: 'current-password',
      textContentType: 'password',
    },
    phone: {
      keyboardType: 'phone-pad',
      autoCapitalize: 'none',
      autoComplete: 'tel',
      textContentType: 'telephoneNumber',
    },
    number: {
      keyboardType: 'numeric',
      autoCapitalize: 'none',
      autoComplete: 'off',
    },
    url: {
      keyboardType: 'url',
      autoCapitalize: 'none',
      autoComplete: 'url',
      textContentType: 'URL',
    },
    search: {
      keyboardType: 'default',
      autoCapitalize: 'none',
      autoComplete: 'off',
    },
    textarea: {
      keyboardType: 'default',
      autoCapitalize: 'sentences',
      multiline: true,
      autoComplete: 'off',
    },
    username: {
      keyboardType: 'default',
      autoCapitalize: 'none',
      autoComplete: 'username',
      textContentType: 'username',
    },
    otp: {
      keyboardType: 'number-pad',
      autoCapitalize: 'none',
      autoComplete: 'one-time-code',
      textContentType: 'oneTimeCode',
    },
  };

  return configs[type];
};
