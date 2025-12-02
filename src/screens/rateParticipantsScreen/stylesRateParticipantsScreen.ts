import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ArenaColors.neutral.darkest,
  },
  header: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing.md,
    gap: ArenaSpacing.xs,
  },
  progressContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing.md,
    gap: ArenaSpacing.xs,
  },
  listContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing['2xl'],
    gap: ArenaSpacing.md,
  },
  footer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkest,
    gap: ArenaSpacing.sm,
    borderTopWidth: 1,
    borderTopColor: ArenaColors.neutral.dark,
  },
});
