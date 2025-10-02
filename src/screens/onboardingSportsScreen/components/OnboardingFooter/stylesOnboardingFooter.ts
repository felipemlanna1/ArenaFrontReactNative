import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    paddingBottom: ArenaSpacing.md + 15,
    backgroundColor: ArenaColors.neutral.dark,
    borderTopWidth: 1,
    borderTopColor: `${ArenaColors.neutral.medium}22`,
  },
});
