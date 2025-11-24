import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.darkest,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  filterButton: {
    flex: 1,
    paddingVertical: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.pill,
    borderWidth: 1,
    borderColor: ArenaColors.neutral.medium,
    backgroundColor: ArenaColors.neutral.darkest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: ArenaColors.brand.primary,
    borderColor: ArenaColors.brand.primary,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  badge: {
    minWidth: ArenaSpacing['2xl'],
    height: ArenaSpacing.xl,
    paddingHorizontal: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.pill,
    backgroundColor: ArenaColors.interaction.hover.neutral,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeActive: {
    backgroundColor: ArenaColors.neutral.lightSubtlePressed,
  },
  badgeText: {
    textAlign: 'center',
  },
});
