import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaBorders, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    backgroundColor: ArenaColors.brand.primary,
    borderRadius: ArenaBorders.radius.circle,
    borderWidth: ArenaBorders.width.medium,
    borderColor: ArenaColors.neutral.darkest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeSm: {
    width: ArenaSpacing.sm,
    height: ArenaSpacing.sm,
    top: -ArenaSpacing.xxs,
    right: -ArenaSpacing.xxs,
  },
  badgeMd: {
    minWidth: ArenaSpacing.lg,
    height: ArenaSpacing.lg,
    paddingHorizontal: ArenaSpacing.xs,
    top: -ArenaSpacing.xs,
    right: -ArenaSpacing.xs,
  },
});
