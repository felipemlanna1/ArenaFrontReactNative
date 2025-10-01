import { ArenaColors, ArenaTypography } from '@/constants';
import { LinkSizeConfig, LinkVariantConfig } from './typesLink';

export const linkSizes: Record<string, LinkSizeConfig> = {
  sm: {
    fontSize: ArenaTypography.size.sm,
    lineHeight: ArenaTypography.lineHeight.sm,
  },
  md: {
    fontSize: ArenaTypography.size.md,
    lineHeight: ArenaTypography.lineHeight.md,
  },
  lg: {
    fontSize: ArenaTypography.size.lg,
    lineHeight: ArenaTypography.lineHeight.lg,
  },
};

export const linkVariants: Record<string, LinkVariantConfig> = {
  primary: {
    color: ArenaColors.brand.primary,
    pressedColor: ArenaColors.brand.primaryPressed,
    disabled: {
      color: ArenaColors.disabled.text,
    },
  },
  secondary: {
    color: ArenaColors.text.inverse,
    pressedColor: ArenaColors.neutral.medium,
    disabled: {
      color: ArenaColors.disabled.text,
    },
  },
  subtle: {
    color: ArenaColors.text.inverse,
    pressedColor: ArenaColors.brand.primary,
    disabled: {
      color: ArenaColors.disabled.text,
    },
  },
};
