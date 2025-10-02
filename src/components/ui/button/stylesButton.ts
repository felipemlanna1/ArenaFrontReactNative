import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaTypography, ArenaShadows } from '@/constants';
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerFullWidth: {
    alignSelf: 'stretch',
  },
  containerDisabled: {
    opacity: 0.5,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: ArenaTypography.family.ui,
    fontWeight: ArenaTypography.weight.medium,
    textAlign: 'center',
    includeFontPadding: false,
  },
  textWithLeftIcon: {
    marginLeft: ArenaSpacing.sm,
  },
  textWithRightIcon: {
    marginRight: ArenaSpacing.sm,
  },
  leftIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingSpinner: {
    marginRight: ArenaSpacing.sm,
  },
  loadingText: {
    fontFamily: ArenaTypography.family.ui,
    fontWeight: ArenaTypography.weight.medium,
    textAlign: 'center',
    includeFontPadding: false,
  },
  focusRing: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderWidth: 2,
    opacity: 0,
  },
  primaryContainer: {
    overflow: 'hidden',
    ...ArenaShadows.button,
  },
  secondaryContainer: {
    overflow: 'hidden',
    borderWidth: 2,
    ...ArenaShadows.soft,
  },
  subtleContainer: {
    overflow: 'hidden',
    ...ArenaShadows.none,
  },
  destructiveContainer: {
    overflow: 'hidden',
    ...ArenaShadows.button,
  },
  successContainer: {
    overflow: 'hidden',
    ...ArenaShadows.button,
  },
  ghostContainer: {
    overflow: 'hidden',
    ...ArenaShadows.none,
  },
  xsContainer: {
    minHeight: 32,
    paddingHorizontal: ArenaSpacing.md,
  },
  smContainer: {
    minHeight: 36,
    paddingHorizontal: ArenaSpacing.lg,
  },
  mdContainer: {
    minHeight: 44,
    paddingHorizontal: ArenaSpacing.xl,
  },
  lgContainer: {
    minHeight: 52,
    paddingHorizontal: ArenaSpacing['2xl'],
  },
  xlContainer: {
    minHeight: 60,
    paddingHorizontal: ArenaSpacing['3xl'],
  },
  xsText: {
    fontSize: ArenaTypography.size.xs,
    lineHeight: ArenaTypography.size.xs * ArenaTypography.lineHeight.tight,
  },
  smText: {
    fontSize: ArenaTypography.size.sm,
    lineHeight: ArenaTypography.size.sm * ArenaTypography.lineHeight.tight,
  },
  mdText: {
    fontSize: ArenaTypography.size.md,
    lineHeight: ArenaTypography.size.md * ArenaTypography.lineHeight.tight,
  },
  lgText: {
    fontSize: ArenaTypography.size.lg,
    lineHeight: ArenaTypography.size.lg * ArenaTypography.lineHeight.tight,
  },
  xlText: {
    fontSize: ArenaTypography.size.xl,
    lineHeight: ArenaTypography.size.xl * ArenaTypography.lineHeight.tight,
  },
});
