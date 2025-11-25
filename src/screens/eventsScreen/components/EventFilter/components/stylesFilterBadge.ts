import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  badge: {
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.sm,
    minWidth: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeInactive: {
    backgroundColor: ArenaColors.neutral.darkIntermediate,
  },
  badgeActive: {
    backgroundColor: ArenaColors.neutral.lightMedium,
  },
  badgeTextInactive: {
    color: ArenaColors.neutral.medium,
  },
  badgeTextActive: {
    color: ArenaColors.neutral.light,
  },
});
