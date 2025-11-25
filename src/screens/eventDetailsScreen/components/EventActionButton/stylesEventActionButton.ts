import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ArenaSpacing.lg, // 16px
    paddingTop: ArenaSpacing.md, // 12px
    // paddingBottom calculado dinamicamente com insets.bottom + 8
    backgroundColor: ArenaColors.neutral.darkest,
    borderTopWidth: ArenaBorders.width.thin,
    borderTopColor: ArenaColors.neutral.darkSubtleBorder,
  },
});
