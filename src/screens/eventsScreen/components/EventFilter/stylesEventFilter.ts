import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
  },
  filtersRow: {
    flexDirection: 'row',
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: 8,
    padding: ArenaSpacing.xs,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.xs,
    borderRadius: 6,
    gap: ArenaSpacing.xs,
  },
  filterButtonActive: {
    backgroundColor: ArenaColors.brand.primary,
  },
  countText: {
    textAlign: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: ArenaColors.neutral.medium,
    opacity: 0.2,
  },
});
