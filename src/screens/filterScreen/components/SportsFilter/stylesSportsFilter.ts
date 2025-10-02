import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.sm,
  },
  loadingContainer: {
    padding: ArenaSpacing.lg,
    alignItems: 'center',
  },
  errorContainer: {
    padding: ArenaSpacing.md,
    backgroundColor: ArenaColors.semantic.errorSubtle,
    borderRadius: ArenaBorders.radius.sm,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.sm,
  },
  emptyText: {
    textAlign: 'center',
    padding: ArenaSpacing.md,
  },
});
