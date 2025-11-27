import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkIntermediate,
    borderBottomWidth: ArenaSpacing.xxs,
    borderBottomColor: ArenaColors.neutral.darkSubtleBorder,
    minHeight: ArenaSpacing['5.75xl'],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: ArenaSpacing.sm,
  },
  badge: {
    height: ArenaSpacing.xl,
    minWidth: ArenaSpacing['2xl'],
    paddingHorizontal: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.pill,
    backgroundColor: ArenaColors.interaction.hover.neutral,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: ArenaSpacing.sm,
  },
  badgeText: {
    textAlign: 'center',
  },
});
