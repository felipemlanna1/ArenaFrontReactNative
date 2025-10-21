import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    borderWidth: 1,
    borderColor: ArenaColors.neutral.medium,
    padding: ArenaSpacing.md,
  },
  cardPressed: {
    opacity: 0.7,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: ArenaSpacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ArenaColors.neutral.darker,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  infoContainer: {
    flex: 1,
    gap: ArenaSpacing.xs,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
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
  actionsContainer: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    marginTop: ArenaSpacing.md,
  },
  actionButton: {
    flex: 1,
  },
});
