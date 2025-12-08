import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

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
    borderRadius: ArenaBorders.radius.lg,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    textAlign: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.xs,
  },
  errorContainer: {
    backgroundColor: ArenaColors.semantic.errorSubtle,
    borderRadius: ArenaBorders.radius.lg,
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
  centeredText: {
    textAlign: 'center',
  },
  flexText: {
    flex: 1,
  },
});
