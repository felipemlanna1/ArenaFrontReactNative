import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
    gap: ArenaSpacing.lg,
  },
  section: {
    gap: ArenaSpacing.md,
  },
  iconContainer: {
    alignSelf: 'center',
    marginBottom: ArenaSpacing.md,
  },
  titleContainer: {
    gap: ArenaSpacing.xs,
    alignItems: 'center',
  },
  instructionsContainer: {
    gap: ArenaSpacing.sm,
  },
  codeInputContainer: {
    gap: ArenaSpacing.xs,
  },
  codeInput: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: 8,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    textAlign: 'center',
    letterSpacing: 8,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.xs,
  },
  errorContainer: {
    backgroundColor: ArenaColors.semantic.errorLight,
    borderRadius: 8,
    padding: ArenaSpacing.md,
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    alignItems: 'flex-start',
  },
  buttonsContainer: {
    gap: ArenaSpacing.md,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.xs,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
