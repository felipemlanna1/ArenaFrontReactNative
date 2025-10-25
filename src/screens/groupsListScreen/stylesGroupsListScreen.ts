import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  titleContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,
    paddingBottom: ArenaSpacing.sm,
  },
  title: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  accordionsContainer: {
    gap: ArenaSpacing.lg,
  },
  loadingContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    paddingHorizontal: ArenaSpacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
  groupsListContainer: {
    gap: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.md,
  },
  loadMoreContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  fab: {
    position: 'absolute',
    bottom: ArenaSpacing['2xl'],
    right: ArenaSpacing.lg,
  },
});
