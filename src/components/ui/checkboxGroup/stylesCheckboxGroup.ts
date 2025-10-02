import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaTypography } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    marginBottom: ArenaSpacing.sm,
  },
  label: {
    fontFamily: ArenaTypography.family.ui,
    fontWeight: ArenaTypography.weight.medium,
    fontSize: ArenaTypography.size.md,
    color: ArenaColors.neutral.light,
    includeFontPadding: false,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxWrapper: {
    marginBottom: ArenaSpacing.md,
  },
  helperText: {
    fontFamily: ArenaTypography.family.ui,
    fontWeight: ArenaTypography.weight.regular,
    fontSize: ArenaTypography.size.sm,
    color: `${ArenaColors.neutral.medium}CC`,
    includeFontPadding: false,
    marginTop: ArenaSpacing.sm,
  },
  errorText: {
    fontFamily: ArenaTypography.family.ui,
    fontWeight: ArenaTypography.weight.regular,
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.semantic.error,
    includeFontPadding: false,
    marginTop: ArenaSpacing.sm,
  },
  requiredAsterisk: {
    color: ArenaColors.brand.primary,
  },
});
