import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaTypography,
  ArenaSpacing,
  ArenaOpacity,
} from '@/constants';
import { SwitchVariantConfig, SwitchSizeConfig } from './typesSwitch';

export const variantConfigs: Record<string, SwitchVariantConfig> = {
  default: {
    trackColorFalse: ArenaColors.neutral.medium,
    trackColorTrue: ArenaColors.neutral.light,
    thumbColorFalse: ArenaColors.neutral.light,
    thumbColorTrue: ArenaColors.neutral.medium,
    disabledOpacity: ArenaOpacity.medium,
  },
  brand: {
    trackColorFalse: ArenaColors.neutral.medium,
    trackColorTrue: ArenaColors.brand.primary,
    thumbColorFalse: ArenaColors.neutral.light,
    thumbColorTrue: ArenaColors.neutral.light,
    disabledOpacity: ArenaOpacity.medium,
  },
};

export const sizeConfigs: Record<string, SwitchSizeConfig> = {
  sm: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    labelFontSize: ArenaTypography.size.xs,
    gap: ArenaSpacing.sm,
  },
  md: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }],
    labelFontSize: ArenaTypography.size.sm,
    gap: ArenaSpacing.md,
  },
  lg: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    labelFontSize: ArenaTypography.size.md,
    gap: ArenaSpacing.lg,
  },
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: ArenaColors.neutral.light,
  },
});
