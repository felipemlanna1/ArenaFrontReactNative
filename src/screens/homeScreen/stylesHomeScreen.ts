import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  filterBarWrapper: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing['2xl'],
    paddingVertical: ArenaSpacing['4xl'],
  },
  emptyTitle: {
    color: ArenaColors.neutral.light,
    marginBottom: ArenaSpacing.md,
    textAlign: 'center',
  },
  emptyText: {
    color: ArenaColors.neutral.medium,
    textAlign: 'center',
  },
  footer: {
    paddingVertical: ArenaSpacing.lg,
    alignItems: 'center',
  },
  errorContainer: {
    position: 'absolute',
    bottom: ArenaSpacing.lg,
    left: ArenaSpacing.lg,
    right: ArenaSpacing.lg,
    backgroundColor: ArenaColors.semantic.error,
    padding: ArenaSpacing.md,
    borderRadius: ArenaSpacing.sm,
  },
  errorText: {
    color: ArenaColors.text.inverse,
    textAlign: 'center',
  },
});
