import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  content: {
    paddingTop: ArenaSpacing.sm,
  },
  listContainer: {
    gap: ArenaSpacing.xs,
  },
  text: {
    color: ArenaColors.neutral.lighter,
  },
  emptyText: {
    color: ArenaColors.neutral.medium,
    fontStyle: 'italic',
  },
});
