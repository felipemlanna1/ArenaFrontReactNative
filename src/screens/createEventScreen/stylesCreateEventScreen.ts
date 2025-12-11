import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  progressContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.sm,
  },
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.md,
  },
  footer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkest,
    gap: ArenaSpacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  flex1: {
    flex: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.sm,
    marginTop: ArenaSpacing.sm,
  },
  loadingText: {
    textAlign: 'center',
  },
});
