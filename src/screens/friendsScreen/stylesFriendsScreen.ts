import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,
    paddingBottom: ArenaSpacing.sm,
  },
  title: {
    textAlign: 'left',
  },
  content: {
    flex: 1,
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
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
  },
});
