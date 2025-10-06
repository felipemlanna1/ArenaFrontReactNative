import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.md,
  },
  card: {
    minHeight: ArenaSpacing['7xl'],
  },
  interactiveCard: {
    minHeight: ArenaSpacing['8xl'],
  },
  customCard: {
    padding: ArenaSpacing.xl,
    borderRadius: ArenaSpacing.lg,
  },
  counter: {
    marginTop: ArenaSpacing.sm,
    color: ArenaColors.brand.primary,
  },
});
