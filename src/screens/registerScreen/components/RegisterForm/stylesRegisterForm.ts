import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.md,
    width: '100%',
  },
  customInput: {
    borderRadius: ArenaBorders.radius.xl,
    backgroundColor: ArenaColors.backdrop.light,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.light,
    paddingHorizontal: ArenaSpacing.lg,
  },
});
