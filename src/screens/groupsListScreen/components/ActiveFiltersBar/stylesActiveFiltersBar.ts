import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  scrollContent: {
    gap: ArenaSpacing.sm,
    paddingRight: ArenaSpacing.sm,
  },
  clearButton: {
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.xs,
  },
});
