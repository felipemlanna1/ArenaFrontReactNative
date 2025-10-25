import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: ArenaSpacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ArenaSpacing.md,
  },
  loadingContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
  eventsList: {
    gap: ArenaSpacing.md,
  },
  eventCard: {
    marginBottom: ArenaSpacing.md,
  },
});
