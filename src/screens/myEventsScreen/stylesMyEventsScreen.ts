import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  listContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,
    paddingBottom: ArenaSpacing['2xl'],
    gap: ArenaSpacing.md,
  },
  loadingContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,
    gap: ArenaSpacing.lg,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing['2xl'],
    gap: ArenaSpacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing['2xl'],
    gap: ArenaSpacing.md,
  },
  loadingFooter: {
    paddingVertical: ArenaSpacing.lg,
    alignItems: 'center',
  },
  eventCardContainer: {
    marginBottom: ArenaSpacing.md,
  },
});
