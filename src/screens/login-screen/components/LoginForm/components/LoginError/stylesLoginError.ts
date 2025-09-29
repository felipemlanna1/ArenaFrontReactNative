import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaTypography,
  ArenaBorders,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    marginTop: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    backgroundColor: ArenaColors.semantic.errorSubtle,
    borderRadius: ArenaSpacing.xs,
    borderLeftWidth: ArenaBorders.width.bold,
    borderLeftColor: ArenaColors.semantic.error,
  },
  errorText: {
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.semantic.error,
    fontWeight: ArenaTypography.weight.medium,
    lineHeight: ArenaTypography.lineHeight.sm,
  },
});
