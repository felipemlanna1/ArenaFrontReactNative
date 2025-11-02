import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.xs,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBarContainer: {
    height: ArenaSpacing.sm,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.sm,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: ArenaBorders.radius.sm,
  },
  progressBarNormal: {
    backgroundColor: ArenaColors.brand.primary,
  },
  progressBarWarning: {
    backgroundColor: ArenaColors.semantic.warning,
  },
  progressBarFull: {
    backgroundColor: ArenaColors.semantic.error,
  },
  warningText: {
    color: ArenaColors.semantic.warning,
  },
});
