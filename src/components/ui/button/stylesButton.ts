import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaShadows, ArenaOpacity } from '@/constants';
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
    opacity: ArenaOpacity.medium,
    boxShadow: ArenaShadows.none,
  },
  buttonDisabled: {
    opacity: ArenaOpacity.medium,
  },
  text: {
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
    boxShadow: ArenaShadows.button,
  },
  secondaryContainer: {
    overflow: 'hidden',
    borderWidth: 2,
    boxShadow: ArenaShadows.soft,
  },
  subtleContainer: {
    overflow: 'hidden',
    boxShadow: ArenaShadows.none,
  },
  destructiveContainer: {
    overflow: 'hidden',
    boxShadow: ArenaShadows.button,
  },
  successContainer: {
    overflow: 'hidden',
    boxShadow: ArenaShadows.button,
  },
  ghostContainer: {
    overflow: 'hidden',
    boxShadow: ArenaShadows.none,
  },
  'outline-lightContainer': {
    overflow: 'hidden',
    borderWidth: 2,
    boxShadow: ArenaShadows.soft,
  },
  'outline-primaryContainer': {
    overflow: 'hidden',
    borderWidth: 2,
    boxShadow: ArenaShadows.soft,
  },
  xsContainer: {
    minHeight: ArenaSpacing['3xl'],
    paddingHorizontal: ArenaSpacing.md,
  },
  smContainer: {
    minHeight: ArenaSpacing['3xl'] + ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.lg,
  },
  mdContainer: {
    minHeight: ArenaSpacing['4xl'] + ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.xl,
  },
  lgContainer: {
    minHeight: ArenaSpacing['5xl'] + ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing['2xl'],
  },
  xlContainer: {
    minHeight: ArenaSpacing['5xl'] + ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing['3xl'],
  },
  xsText: {},
  smText: {},
  mdText: {},
  lgText: {},
  xlText: {},
});
