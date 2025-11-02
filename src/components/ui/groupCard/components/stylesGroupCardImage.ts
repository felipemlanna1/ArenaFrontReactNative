import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ArenaSpacing['10xl'],
    borderTopLeftRadius: ArenaBorders.radius.md,
    borderTopRightRadius: ArenaBorders.radius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: ArenaColors.neutral.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sportIcon: {
    width: ArenaSpacing['7xl'],
    height: ArenaSpacing['7xl'],
  },
  privacyBadge: {
    position: 'absolute',
    top: ArenaSpacing.sm,
    left: ArenaSpacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArenaColors.neutral.darkPressed,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.sm,
    gap: ArenaSpacing.xs,
  },
  privacyText: {},
  capacityBadge: {
    position: 'absolute',
    top: ArenaSpacing.sm,
    right: ArenaSpacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArenaColors.neutral.darkPressed,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.sm,
    gap: ArenaSpacing.xs,
  },
  capacityBadgeWarning: {
    backgroundColor: ArenaColors.semantic.warning,
  },
  capacityBadgeFull: {
    backgroundColor: ArenaColors.semantic.error,
  },
  capacityText: {
    marginLeft: ArenaSpacing.xs,
  },
});
