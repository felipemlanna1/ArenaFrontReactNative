import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing.lg,
    marginBottom: ArenaSpacing.md,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: ArenaSpacing.md,
  },
  avatarSkeleton: {
    width: 56,
    height: 56,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.dark,
  },
  infoContainer: {
    flex: 1,
    gap: ArenaSpacing.xs,
  },
  nameSkeleton: {
    width: '60%',
    height: 18,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  usernameSkeleton: {
    width: '40%',
    height: 14,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    marginTop: ArenaSpacing.xs,
  },
  iconSkeleton: {
    width: ArenaSpacing.lg,
    height: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.dark,
  },
  locationTextSkeleton: {
    width: 100,
    height: 14,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  sportsRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.xs,
    marginTop: ArenaSpacing.xs,
  },
  sportBadgeSkeleton: {
    width: 60,
    height: ArenaSpacing['2xl'],
    borderRadius: ArenaBorders.radius.pill,
    backgroundColor: ArenaColors.neutral.dark,
  },
  sportBadgeSmall: {
    width: 40,
    height: ArenaSpacing['2xl'],
    borderRadius: ArenaBorders.radius.pill,
    backgroundColor: ArenaColors.neutral.dark,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    marginTop: ArenaSpacing.md,
  },
  buttonSkeleton: {
    flex: 1,
    height: 36,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.dark,
  },
});
