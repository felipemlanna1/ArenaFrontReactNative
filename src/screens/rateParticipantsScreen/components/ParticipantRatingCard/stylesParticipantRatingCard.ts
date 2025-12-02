import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  cardContent: {
    gap: ArenaSpacing.md,
  },
  cardDisabled: {
    opacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },
  avatar: {
    width: ArenaSpacing['5xl'],
    height: ArenaSpacing['5xl'],
    borderRadius: ArenaSpacing['2xl'],
    backgroundColor: ArenaColors.neutral.medium,
  },
  nameContainer: {
    flex: 1,
    gap: ArenaSpacing.xxs,
  },
  overallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xxs,
  },
  ratingSection: {
    gap: ArenaSpacing.xs,
  },
  divider: {
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.medium,
    opacity: 0.2,
  },
});
