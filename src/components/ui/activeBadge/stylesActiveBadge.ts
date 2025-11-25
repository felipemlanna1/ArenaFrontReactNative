import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.sm,
    backgroundColor: `${ArenaColors.semantic.success}15`,
    borderRadius: ArenaBorders.radius.xl,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.semantic.success,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.semantic.success,
  },
  text: {
    color: ArenaColors.semantic.success,
  },
});
