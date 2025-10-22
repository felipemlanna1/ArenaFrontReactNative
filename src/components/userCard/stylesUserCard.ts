import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.md,
  },
  cardPressed: {
    opacity: 0.7,
  },
  touchableContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  avatar: {
    width: ArenaSpacing['4.5xl'],
    height: ArenaSpacing['4.5xl'],
    borderRadius: ArenaBorders.radius.circle,
  },
  avatarFallback: {
    width: ArenaSpacing['4.5xl'],
    height: ArenaSpacing['4.5xl'],
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: ArenaSpacing['4.5xl'],
    height: ArenaSpacing['4.5xl'],
    borderRadius: ArenaBorders.radius.circle,
  },
  initialsText: {
    color: ArenaColors.brand.primary,
  },
  infoContainer: {
    flex: 1,
    gap: ArenaSpacing.micro,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    flexWrap: 'wrap',
  },
  chevronIcon: {
    marginLeft: ArenaSpacing.micro,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  locationIcon: {
    marginTop: 2,
  },
  sportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.xs,
  },
  username: {
    color: ArenaColors.neutral.medium,
  },
  actionsContainer: {
    flexDirection: 'column',
    gap: ArenaSpacing.sm,
    minWidth: 100,
  },
  actionButton: {
    flex: 1,
  },
});
