import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
  },
  filtersRow: {
    flexDirection: 'row',
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing.xs,
    gap: ArenaSpacing.xs,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.md,
    gap: ArenaSpacing.xs,
  },
  filterButtonActive: {
    backgroundColor: ArenaColors.brand.primary,
  },
});
