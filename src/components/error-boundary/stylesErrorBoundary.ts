import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ArenaColors.neutral.darkest,
    padding: ArenaSpacing.xl,
  },
  title: {
    marginBottom: ArenaSpacing.md,
    textAlign: 'center',
  },
  message: {
    marginBottom: ArenaSpacing.xl,
    textAlign: 'center',
  },
});
