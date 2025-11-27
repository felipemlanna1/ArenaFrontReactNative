import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: ArenaSpacing.lg,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  icon: {
    marginTop: ArenaSpacing.xxs,
  },
  content: {
    flex: 1,
    gap: ArenaSpacing.xs,
  },
  label: {
    color: ArenaColors.neutral.medium,
    textTransform: 'uppercase',
  },
  value: {
    color: ArenaColors.neutral.light,
  },
  valueSecondary: {
    color: ArenaColors.neutral.medium,
  },
  progressContainer: {
    marginTop: ArenaSpacing.xxs,
  },
  spotsText: {
    color: ArenaColors.neutral.medium,
    marginTop: ArenaSpacing.xxs,
  },
  fullBadge: {
    backgroundColor: ArenaColors.semantic.error,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xxs,
    borderRadius: ArenaBorders.radius.sm,
    alignSelf: 'flex-start',
  },
  fullBadgeText: {
    color: ArenaColors.neutral.light,
  },
  addressText: {},
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
});
