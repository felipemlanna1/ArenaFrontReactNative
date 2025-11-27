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
    flexGrow: 1,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  accordionsContainer: {
    gap: ArenaSpacing.lg,
  },
  userList: {
    gap: ArenaSpacing.md,
  },
  emptyContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
  },
  emptyIcon: {
    marginBottom: ArenaSpacing.md,
  },
  loadingContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
    gap: ArenaSpacing.md,
  },
  listContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  itemSeparator: {
    height: ArenaSpacing.sm,
  },
  loadingFooter: {
    paddingVertical: ArenaSpacing.md,
  },
});
