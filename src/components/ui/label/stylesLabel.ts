import { ArenaColors, ArenaSpacing, ArenaTypography } from '@/constants';
import { LabelVariant } from './typesLabel';

interface VariantConfig {
  size: 'xs' | 'sm' | 'md' | 'lg';
  fontWeight: string;
  color: string;
  marginBottom: number;
}

export const VARIANT_CONFIG: Record<LabelVariant, VariantConfig> = {
  form: {
    size: 'sm',
    fontWeight: ArenaTypography.weight.medium,
    color: ArenaColors.neutral.light,
    marginBottom: ArenaSpacing.xs,
  },
  section: {
    size: 'md',
    fontWeight: ArenaTypography.weight.semibold,
    color: ArenaColors.neutral.light,
    marginBottom: ArenaSpacing.xs,
  },
  inline: {
    size: 'sm',
    fontWeight: ArenaTypography.weight.regular,
    color: ArenaColors.neutral.light,
    marginBottom: 0,
  },
  helper: {
    size: 'xs',
    fontWeight: ArenaTypography.weight.regular,
    color: ArenaColors.neutral.medium,
    marginBottom: 0,
  },
};
