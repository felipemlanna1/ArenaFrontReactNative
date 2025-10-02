import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  filterBarWrapper: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['3xl'],
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
