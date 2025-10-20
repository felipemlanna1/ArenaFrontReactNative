import {
  ArenaColors,
  ArenaSpacing,
  ArenaTypography,
  ArenaBorders,
  ArenaShadows,
  ArenaOpacity,
} from '@/constants';
import {
  CheckboxSizeConfig,
  CheckboxVariantConfig,
  CheckboxCardVariantConfig,
} from './typesCheckbox';

export const checkboxSizes: Record<string, CheckboxSizeConfig> = {
  sm: {
    checkboxSize: ArenaSpacing.lg,
    iconSize: ArenaSpacing.md,
    fontSize: ArenaTypography.size.sm,
    spacing: ArenaSpacing.xs,
  },
  md: {
    checkboxSize: ArenaSpacing.xl,
    iconSize: ArenaTypography.size.sm,
    fontSize: ArenaTypography.size.md,
    spacing: ArenaSpacing.sm,
  },
  lg: {
    checkboxSize: ArenaSpacing['2xl'],
    iconSize: ArenaSpacing.lg,
    fontSize: ArenaTypography.size.lg,
    spacing: ArenaSpacing.md,
  },
};

export const checkboxVariants: Record<string, CheckboxVariantConfig> = {
  default: {
    backgroundColor: ArenaColors.neutral.light,
    borderColor: ArenaColors.neutral.medium,
    borderWidth: 1,
    checkColor: ArenaColors.neutral.darkest,
    labelColor: ArenaColors.text.inverse,
    disabled: {
      backgroundColor: ArenaColors.disabled.background,
      borderColor: ArenaColors.disabled.border,
      checkColor: ArenaColors.disabled.text,
      labelColor: ArenaColors.disabled.text,
    },
  },
  primary: {
    backgroundColor: ArenaColors.brand.primary,
    borderColor: ArenaColors.brand.primary,
    borderWidth: 2,
    checkColor: ArenaColors.neutral.light,
    labelColor: ArenaColors.text.inverse,
    disabled: {
      backgroundColor: ArenaColors.disabled.background,
      borderColor: ArenaColors.disabled.border,
      checkColor: ArenaColors.disabled.text,
      labelColor: ArenaColors.disabled.text,
    },
  },
  secondary: {
    backgroundColor: ArenaColors.neutral.light,
    borderColor: ArenaColors.brand.primary,
    borderWidth: 2,
    checkColor: ArenaColors.brand.primary,
    labelColor: ArenaColors.text.inverse,
    disabled: {
      backgroundColor: ArenaColors.disabled.background,
      borderColor: ArenaColors.disabled.border,
      checkColor: ArenaColors.disabled.text,
      labelColor: ArenaColors.disabled.text,
    },
  },
};

export const checkboxCardVariant: CheckboxCardVariantConfig = {
  unselected: {
    backgroundColor: `${ArenaColors.neutral.dark}CC`,
    borderColor: 'transparent',
    borderWidth: ArenaBorders.width.medium,
    textColor: ArenaColors.neutral.light,
    fontSize: ArenaTypography.size.md,
    fontWeight: ArenaTypography.weight.regular.toString(),
    boxShadow: ArenaShadows.soft,
  },
  selected: {
    backgroundColor: ArenaColors.neutral.dark,
    borderColor: ArenaColors.brand.primary,
    borderWidth: ArenaBorders.width.medium,
    textColor: ArenaColors.brand.primary,
    fontSize: ArenaTypography.size.md,
    fontWeight: ArenaTypography.weight.semibold.toString(),
    boxShadow: ArenaShadows.elevated,
  },
  disabled: {
    opacity: ArenaOpacity.medium,
    backgroundColor: ArenaColors.disabled.surface,
    borderColor: ArenaColors.disabled.border,
    textColor: ArenaColors.disabled.text,
  },
};
