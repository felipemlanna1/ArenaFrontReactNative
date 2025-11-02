import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  membersList: {
    gap: ArenaSpacing.sm,
  },
  emptyState: {
    paddingVertical: ArenaSpacing.xl,
    alignItems: 'center',
  },
});
