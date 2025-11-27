import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderBottomWidth: ArenaBorders.width.thin,
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
    width: ArenaSpacing['3xl'],
    height: ArenaSpacing['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
