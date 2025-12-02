import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  listContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
    gap: ArenaSpacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
    gap: ArenaSpacing.md,
  },
  retryButton: {
    marginTop: ArenaSpacing.md,
  },
});
