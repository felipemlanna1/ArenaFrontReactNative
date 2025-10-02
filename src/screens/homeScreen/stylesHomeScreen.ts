import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['3xl'],
  },
  title: {
    color: ArenaColors.neutral.light,
    marginBottom: ArenaSpacing.md,
  },
  subtitle: {
    color: ArenaColors.neutral.medium,
    textAlign: 'center',
  },
});
