import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  scrollContent: {
    padding: ArenaSpacing.lg,
    gap: ArenaSpacing.lg,
  },
  section: {
    gap: ArenaSpacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: ArenaSpacing.md,
  },
  flex1: {
    flex: 1,
  },
  actions: {
    gap: ArenaSpacing.sm,
    paddingTop: ArenaSpacing.md,
  },
});
