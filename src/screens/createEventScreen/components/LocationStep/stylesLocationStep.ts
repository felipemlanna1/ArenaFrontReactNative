import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaTypography } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing['2xl'],
  },
  section: {
    gap: ArenaSpacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },
  toggleLabel: {
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.neutral.light,
  },
  helpText: {
    fontSize: ArenaTypography.size.xs,
    color: ArenaColors.neutral.medium,
    marginTop: ArenaSpacing.xs,
  },
});
