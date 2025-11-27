import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,

    backgroundColor: ArenaColors.neutral.darkest,
    borderTopWidth: ArenaBorders.width.thin,
    borderTopColor: ArenaColors.neutral.darkSubtleBorder,
  },
});
