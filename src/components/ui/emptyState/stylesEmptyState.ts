import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing['2xl'],
    paddingVertical: ArenaSpacing['3xl'],
  },
  iconContainer: {
    marginBottom: ArenaSpacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.sm,
  },
  message: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.xl,
  },
  actionContainer: {
    width: '100%',

    maxWidth: ArenaSpacing['13xl'],
  },
  secondaryActionContainer: {
    width: '100%',

    maxWidth: ArenaSpacing['13xl'],
    marginTop: ArenaSpacing.md,
  },
});
