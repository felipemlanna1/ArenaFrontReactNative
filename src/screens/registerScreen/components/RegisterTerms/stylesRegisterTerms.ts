import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaTypography } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
  },
  text: {
    textAlign: 'center',
    color: ArenaColors.neutral.medium,
    fontSize: ArenaTypography.size.sm,
    fontFamily: ArenaTypography.family.body,
    lineHeight: ArenaTypography.size.sm * ArenaTypography.lineHeight.sm,
  },
});
