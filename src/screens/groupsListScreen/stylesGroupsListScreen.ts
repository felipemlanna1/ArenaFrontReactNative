import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
    marginTop: ArenaSpacing.lg,
  },
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
  },
  accordionsContainer: {
    gap: ArenaSpacing.lg,
  },
  loadingContainer: {
    flex: 1,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
    gap: ArenaSpacing.md,
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
  listContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,
    paddingBottom: ArenaSpacing['2xl'],
  },
  itemSeparator: {
    height: ArenaSpacing.sm,
  },
  loadingFooter: {
    paddingVertical: ArenaSpacing.md,
  },
  fab: {
    position: 'absolute',
    bottom: ArenaSpacing['2xl'],
    right: ArenaSpacing.lg,
  },
});
