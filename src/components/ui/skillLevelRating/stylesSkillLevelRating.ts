import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.sm,
  },
  card: {
    width: ArenaSpacing['7xl'],
    height: ArenaSpacing['6xl'],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ArenaBorders.radius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: ArenaColors.neutral.darkest,
    gap: ArenaSpacing.xs,
  },
  cardSelected: {
    borderWidth: 2,
  },
  cardDisabled: {
    opacity: 0.5,
  },
  labelContainer: {
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
});
