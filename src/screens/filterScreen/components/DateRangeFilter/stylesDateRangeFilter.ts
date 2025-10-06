import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaTypography } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    alignItems: 'flex-start',
  },
  inputWrapper: {
    flex: 1,
  },
  errorText: {
    fontSize: ArenaTypography.size.xs,
    color: ArenaColors.semantic.error,
    marginTop: ArenaSpacing.xs,
  },
  shortcutsContainer: {
    gap: ArenaSpacing.xs,
  },
  shortcutsTitle: {
    marginBottom: ArenaSpacing.xs,
  },
  shortcutsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.xs,
  },
  clearButtonWrapper: {
    marginTop: ArenaSpacing.xs,
  },
});
