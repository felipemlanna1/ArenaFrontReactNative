import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderRadius: ArenaBorders.radius.lg,
    overflow: 'hidden',
  },
  imageSkeleton: {
    width: '100%',
    height: 180,
    backgroundColor: ArenaColors.neutral.dark,
  },
  divider: {
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.dark,
    opacity: 0.1,
  },
  contentContainer: {
    padding: ArenaSpacing.lg,
  },
  titleSkeleton: {
    width: '80%',
    height: ArenaSpacing.xl,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
    marginBottom: ArenaSpacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    marginBottom: ArenaSpacing.sm,
  },
  iconSkeleton: {
    width: ArenaSpacing.xl,
    height: ArenaSpacing.xl,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.dark,
  },
  locationSkeleton: {
    flex: 1,
    height: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    marginBottom: ArenaSpacing.sm,
  },
  dateTimeSkeleton: {
    flex: 1,
    height: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    marginTop: ArenaSpacing.md,
    marginBottom: ArenaSpacing.xs,
  },
  avatarsContainer: {
    flexDirection: 'row',
  },
  avatarSkeleton: {
    width: ArenaSpacing['3xl'],
    height: ArenaSpacing['3xl'],
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.dark,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkest,
  },
  avatarOffset: {
    marginLeft: -ArenaSpacing.sm,
  },
  participantsTextSkeleton: {
    width: 100,
    height: 14,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  progressContainer: {
    marginTop: ArenaSpacing.md,
    marginBottom: ArenaSpacing.md,
  },
  progressSkeleton: {
    width: '100%',
    height: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  buttonSkeleton: {
    flex: 1,
    height: 44,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.dark,
  },
});
