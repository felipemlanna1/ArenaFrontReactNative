import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaTypography } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    marginBottom: ArenaSpacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: ArenaTypography.size['3xl'],
    fontWeight: ArenaTypography.weight.bold,
    color: ArenaColors.neutral.light,
    textAlign: 'center',
    marginBottom: ArenaSpacing.xs,
  },
  subtitle: {
    fontSize: ArenaTypography.size.md,
    color: ArenaColors.neutral.medium,
    textAlign: 'center',
  },
});
