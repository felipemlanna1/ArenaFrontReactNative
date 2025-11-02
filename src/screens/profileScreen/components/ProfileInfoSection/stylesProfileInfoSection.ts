import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaBorders, ArenaColors } from '@/constants';

const PROFILE_INFO_TOP_MARGIN = 75;

export const styles = StyleSheet.create({
  container: {
    marginTop: PROFILE_INFO_TOP_MARGIN,
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  nameWithBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },
  nameText: {
    textAlign: 'center',
  },
  usernameText: {
    textAlign: 'center',
  },
  memberSinceText: {
    textAlign: 'center',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
    marginTop: ArenaSpacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  sportsSection: {
    marginTop: ArenaSpacing['2xl'],
    width: '100%',
  },
  sportsTitle: {
    marginBottom: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
  },
  sportsScrollContainer: {},
  sportsContent: {
    paddingHorizontal: ArenaSpacing.lg,
    gap: ArenaSpacing.md,
  },
  sportCard: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.md,
    gap: ArenaSpacing.sm,
    minWidth: ArenaSpacing['2xl'] * 5,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkSubtleBorder,
  },
  sportCardPrimary: {
    borderColor: ArenaColors.brand.primary,
    borderWidth: ArenaBorders.width.medium,
  },
  sportCardHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: ArenaSpacing['2xl'] * 2.5,
    position: 'relative',
  },
  sportIconImage: {
    width: ArenaSpacing['2xl'] * 2,
    height: ArenaSpacing['2xl'] * 2,
  },
  primaryBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: ArenaColors.neutral.darkest,
    borderRadius: ArenaBorders.radius.circle,
    padding: ArenaSpacing.micro,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.brand.primary,
  },
  sportCardContent: {
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  sportName: {
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
    gap: ArenaSpacing.sm,
  },
  emptyText: {
    textAlign: 'center',
  },
  emptyHint: {
    textAlign: 'center',
  },
});
