import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    padding: ArenaSpacing.lg,
    marginBottom: ArenaSpacing.lg,
    gap: ArenaSpacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ArenaSpacing.lg,
    gap: ArenaSpacing.xs,
  },
  mainRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.md,
  },
  ratingValue: {
    textAlign: 'center',
  },
  breakdown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: ArenaSpacing.md,
    paddingTop: ArenaSpacing.sm,
    borderTopWidth: 1,
    borderTopColor: ArenaColors.neutral.medium,
  },
  breakdownItem: {
    flex: 1,
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  count: {
    textAlign: 'center',
    paddingTop: ArenaSpacing.xs,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ArenaSpacing.xl,
  },
});
