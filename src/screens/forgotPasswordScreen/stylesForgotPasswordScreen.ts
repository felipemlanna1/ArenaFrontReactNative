import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing['2xl'],
  },
  subtitleContainer: {
    marginBottom: ArenaSpacing.xl,
  },
  subtitle: {
    textAlign: 'center',
  },
  formContainer: {
    gap: ArenaSpacing.lg,
    marginBottom: ArenaSpacing.xl,
  },
  actionsContainer: {
    gap: ArenaSpacing.md,
    marginTop: 'auto',
  },
});
