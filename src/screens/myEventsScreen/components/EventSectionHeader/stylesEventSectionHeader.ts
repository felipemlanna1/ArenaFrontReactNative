import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.dark,
    borderBottomWidth: 2,
    borderBottomColor: ArenaColors.neutral.darkSubtleBorder,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },
  icon: {
    marginRight: ArenaSpacing.xs,
  },
  badge: {
    height: ArenaSpacing.xl,
    paddingHorizontal: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.pill,
    backgroundColor: ArenaColors.interaction.hover.neutral,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    textAlign: 'center',
  },
});
