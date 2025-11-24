import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingVertical: ArenaSpacing.md,
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
