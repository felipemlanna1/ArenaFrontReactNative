import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.md,
  },
  card: {
    minHeight: 80,
  },
  interactiveCard: {
    minHeight: 100,
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
