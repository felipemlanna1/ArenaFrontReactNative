import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ArenaSpacing.lg,
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
  helpText: {
    color: ArenaColors.neutral.medium,
    marginTop: ArenaSpacing.xs,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: ArenaSpacing.xxs,
  },
});
