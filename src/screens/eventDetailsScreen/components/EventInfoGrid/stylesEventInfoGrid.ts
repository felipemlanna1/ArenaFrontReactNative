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
    marginTop: ArenaSpacing.micro,
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
    marginTop: ArenaSpacing.micro,
  },
  spotsText: {
    color: ArenaColors.neutral.medium,
    marginTop: ArenaSpacing.micro,
  },
  fullBadge: {
    backgroundColor: ArenaColors.semantic.error,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.micro,
    borderRadius: ArenaBorders.radius.sm,
    alignSelf: 'flex-start',
  },
  fullBadgeText: {
    color: ArenaColors.neutral.light,
  },
});
