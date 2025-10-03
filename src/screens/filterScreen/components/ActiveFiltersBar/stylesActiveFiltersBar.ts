import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.dark,
    paddingVertical: ArenaSpacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.md,
    marginBottom: ArenaSpacing.xs,
  },
  chipsContainer: {
    paddingHorizontal: ArenaSpacing.md,
  },
  chipsScrollView: {
    flexGrow: 0,
  },
  chipsContent: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
  },
  clearAllButton: {
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.sm,
  },
});
