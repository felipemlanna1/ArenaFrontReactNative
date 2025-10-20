import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaTypography,
  ArenaBorders,
  ArenaShadows,
} from '@/constants';
import { BadgeVariantConfig, BadgeSizeConfig } from './typesBadge';

export const variantConfigs: Record<string, BadgeVariantConfig> = {
  default: {
    backgroundColor: `${ArenaColors.neutral.medium}22`,
    borderColor: ArenaColors.neutral.medium,
    borderWidth: 1,
    textColor: ArenaColors.neutral.light,
    removeIconColor: ArenaColors.neutral.medium,
  },
  primary: {
    backgroundColor: `${ArenaColors.brand.primary}22`,
    borderColor: ArenaColors.brand.primary,
    borderWidth: 1,
    textColor: ArenaColors.brand.primary,
    removeIconColor: ArenaColors.neutral.medium,
  },
  success: {
    backgroundColor: `${ArenaColors.semantic.success}22`,
    borderColor: ArenaColors.semantic.success,
    borderWidth: 1,
    textColor: ArenaColors.semantic.success,
    removeIconColor: ArenaColors.neutral.medium,
  },
  error: {
    backgroundColor: `${ArenaColors.semantic.error}22`,
    borderColor: ArenaColors.semantic.error,
    borderWidth: 1,
    textColor: ArenaColors.semantic.error,
    removeIconColor: ArenaColors.neutral.medium,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderColor: ArenaColors.neutral.medium,
    borderWidth: 1,
    textColor: ArenaColors.neutral.light,
    removeIconColor: ArenaColors.neutral.medium,
  },
};

export const sizeConfigs: Record<string, BadgeSizeConfig> = {
  sm: {
    paddingVertical: ArenaSpacing.xs / 2,
    paddingHorizontal: ArenaSpacing.sm,
    fontSize: ArenaTypography.size.xs,
    borderRadius: ArenaBorders.radius.xl,
  },
  md: {
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.md,
    fontSize: ArenaTypography.size.sm,
    borderRadius: ArenaBorders.radius['2xl'],
  },
  lg: {
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.lg,
    fontSize: ArenaTypography.size.md,
    borderRadius: ArenaBorders.radius['3xl'],
  },
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    boxShadow: ArenaShadows.subtle,
  },
  text: {
    paddingRight: ArenaSpacing.xs,
  },
  removeButton: {
    marginLeft: ArenaSpacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
