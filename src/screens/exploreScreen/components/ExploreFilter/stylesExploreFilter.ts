import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    paddingVertical: ArenaSpacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.darkest,
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  filterButton: {
    flex: 1,
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: ArenaColors.brand.primary,
  },
  countText: {
    marginTop: 2,
  },
  divider: {
    width: ArenaBorders.width.thin,
    alignSelf: 'stretch',
    backgroundColor: ArenaColors.neutral.darkSubtleBorder,
  },
});
