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
    marginBottom: ArenaSpacing.xs,
  },
  email: {
    textAlign: 'center',
  },
  otpContainer: {
    marginBottom: ArenaSpacing.xl,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.xs,
    marginBottom: ArenaSpacing.xl,
  },
  timerIcon: {
    marginRight: ArenaSpacing.xs,
  },
  actionsContainer: {
    gap: ArenaSpacing.md,
    marginTop: 'auto',
  },
  resendButton: {
    alignSelf: 'center',
  },
  resendCooldown: {
    textAlign: 'center',
  },
});
