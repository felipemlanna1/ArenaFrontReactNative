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
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,
    paddingBottom: ArenaSpacing.xl,
  },
  errorContainer: {
    marginBottom: ArenaSpacing.md,
  },
  errorText: {
    textAlign: 'center',
  },
});
