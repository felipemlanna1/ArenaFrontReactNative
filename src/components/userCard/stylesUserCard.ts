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
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: ArenaSpacing['5.75xl'],
    height: ArenaSpacing['5.75xl'],
    borderRadius: ArenaBorders.radius.circle,
  },
  avatarFallback: {
    width: ArenaSpacing['5.75xl'],
    height: ArenaSpacing['5.75xl'],
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primarySubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: ArenaSpacing['5.75xl'],
    height: ArenaSpacing['5.75xl'],
    borderRadius: ArenaBorders.radius.circle,
  },
  avatarBorder: {
    borderWidth: ArenaSpacing.micro,
    borderColor: ArenaColors.brand.primary,
  },
  initialsText: {
    color: ArenaColors.brand.primary,
  },
  infoContainer: {
    flex: 1,
    gap: ArenaSpacing.micro,
  },
  infoContainerWithChevron: {
    paddingRight: ArenaSpacing.xs,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    flexWrap: 'wrap',
  },
  nameRowFull: {
    flex: 1,
  },
  chevronIcon: {
    marginLeft: ArenaSpacing.micro,
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: ArenaSpacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  locationIcon: {
    marginTop: ArenaSpacing.micro,
  },
  contextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    marginTop: ArenaSpacing.micro,
  },
  contextIcon: {
    marginTop: ArenaSpacing.micro / 2,
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
  },
  actionButton: {
    flex: 1,
  },
});
