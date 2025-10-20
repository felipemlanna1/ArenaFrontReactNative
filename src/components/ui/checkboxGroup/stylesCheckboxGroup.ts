import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    marginBottom: ArenaSpacing.sm,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxWrapper: {
    marginBottom: ArenaSpacing.md,
  },
  helperText: {
    color: `${ArenaColors.neutral.medium}CC`,
    marginTop: ArenaSpacing.sm,
  },
  errorText: {
    color: ArenaColors.semantic.error,
    marginTop: ArenaSpacing.sm,
  },
  requiredAsterisk: {
    color: ArenaColors.brand.primary,
  },
});
