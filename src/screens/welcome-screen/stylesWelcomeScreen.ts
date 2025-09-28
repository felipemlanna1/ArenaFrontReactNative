import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaTypography,
  ArenaBorders,
  ArenaShadows,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
    paddingHorizontal: ArenaSpacing['4xl'],
    paddingVertical: ArenaSpacing['6xl'],
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  logoContainer: {
    marginBottom: ArenaSpacing['5xl'],
    alignItems: 'center',
  },

  logo: {
    fontSize: ArenaTypography.size['6xl'],
    fontWeight: ArenaTypography.weight.extrabold,
    color: ArenaColors.brand.primary,
    letterSpacing: ArenaTypography.letterSpacing.wide,
    textAlign: 'center',
    marginBottom: ArenaSpacing.md,
  },

  tagline: {
    fontSize: ArenaTypography.size.lg,
    fontWeight: ArenaTypography.weight.regular,
    color: ArenaColors.neutral.light,
    textAlign: 'center',
    letterSpacing: ArenaTypography.letterSpacing.normal,
  },

  welcomeContainer: {
    marginBottom: ArenaSpacing['5xl'],
    alignItems: 'center',
  },

  welcomeTitle: {
    fontSize: ArenaTypography.size['4xl'],
    fontWeight: ArenaTypography.weight.bold,
    color: ArenaColors.neutral.light,
    textAlign: 'center',
    marginBottom: ArenaSpacing.lg,
    letterSpacing: ArenaTypography.letterSpacing.normal,
  },

  welcomeDescription: {
    fontSize: ArenaTypography.size.md,
    fontWeight: ArenaTypography.weight.regular,
    color: ArenaColors.neutral.medium,
    textAlign: 'center',
    lineHeight: ArenaTypography.lineHeight.relaxed * ArenaTypography.size.md,
    marginBottom: ArenaSpacing.xl,
    paddingHorizontal: ArenaSpacing.lg,
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: ArenaSpacing['2xl'],
    gap: ArenaSpacing.lg,
  },

  getStartedButton: {
    backgroundColor: ArenaColors.brand.primary,
    paddingVertical: ArenaSpacing.lg,
    paddingHorizontal: ArenaSpacing['3xl'],
    borderRadius: ArenaBorders.radius.sm,
    width: '80%',
    alignItems: 'center',
    ...ArenaShadows.brandGlow,
  },

  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.xl,
    borderRadius: ArenaBorders.radius.sm,
    width: '80%',
    alignItems: 'center',
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
  },

  getStartedButtonPressed: {
    backgroundColor: ArenaColors.brand.primaryPressed,
    transform: [{ scale: 0.98 }],
  },

  getStartedButtonDisabled: {
    backgroundColor: ArenaColors.disabled.background,
    ...ArenaShadows.none,
  },

  buttonText: {
    fontSize: ArenaTypography.size.lg,
    fontWeight: ArenaTypography.weight.semibold,
    color: ArenaColors.neutral.light,
    letterSpacing: ArenaTypography.letterSpacing.wide,
  },

  buttonTextDisabled: {
    color: ArenaColors.disabled.text,
  },

  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(27, 29, 41, 0.8)',
  },

  loadingText: {
    fontSize: ArenaTypography.size.md,
    fontWeight: ArenaTypography.weight.medium,
    color: ArenaColors.neutral.light,
    marginTop: ArenaSpacing.lg,
  },

  footer: {
    marginTop: 'auto',
    alignItems: 'center',
  },

  footerText: {
    fontSize: ArenaTypography.size.sm,
    fontWeight: ArenaTypography.weight.light,
    color: ArenaColors.neutral.medium,
    textAlign: 'center',
    opacity: 0.7,
  },
});
