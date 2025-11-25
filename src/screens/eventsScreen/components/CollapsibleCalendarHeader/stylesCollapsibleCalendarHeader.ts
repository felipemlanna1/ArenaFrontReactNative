import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  leftContent: {
    flex: 1,
    gap: ArenaSpacing.xs,
  },
  dateText: {
    textAlign: 'left',
  },
  countText: {
    textAlign: 'left',
  },
  chevronContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
