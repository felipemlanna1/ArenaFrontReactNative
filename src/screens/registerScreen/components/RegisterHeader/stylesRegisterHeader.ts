import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    marginBottom: ArenaSpacing.xl,
    alignItems: 'center',
  },
  title: {
    color: ArenaColors.neutral.light,
    textAlign: 'center',
    marginBottom: ArenaSpacing.xs,
  },
  subtitle: {
    color: ArenaColors.neutral.medium,
    textAlign: 'center',
  },
});
