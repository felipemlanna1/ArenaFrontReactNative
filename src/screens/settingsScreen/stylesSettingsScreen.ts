import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing['2xl'],
  },
  iconContainer: {
    marginBottom: ArenaSpacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.md,
  },
  message: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.lg,
  },
  caption: {
    textAlign: 'center',
    maxWidth: ArenaSpacing['14xl'],
  },
});
