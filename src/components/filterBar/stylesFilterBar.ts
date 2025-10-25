import { StyleSheet, TextStyle } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    flexWrap: 'wrap',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius['3xl'],
    borderWidth: 1,
    borderColor: ArenaColors.neutral.darkSubtleBorder,
    backgroundColor: ArenaColors.neutral.dark,
  },
  filterButtonActive: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
  },
  filterButtonText: {
    color: ArenaColors.neutral.medium,
  } as TextStyle,
  filterButtonTextActive: {
    color: ArenaColors.brand.primary,
  } as TextStyle,
  clearButton: {
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius['3xl'],
    backgroundColor: ArenaColors.semantic.errorSubtle,
  },
  clearButtonText: {
    color: ArenaColors.semantic.error,
  } as TextStyle,
});
