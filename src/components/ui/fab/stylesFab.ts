import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaOpacity } from '@/constants';

export const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: ArenaSpacing.sm,
    shadowColor: ArenaColors.neutral.darkest,
    shadowOffset: { width: ArenaSpacing.none, height: ArenaSpacing.xs },
    shadowOpacity: ArenaOpacity.light,
    shadowRadius: ArenaSpacing.sm,
  },
});
