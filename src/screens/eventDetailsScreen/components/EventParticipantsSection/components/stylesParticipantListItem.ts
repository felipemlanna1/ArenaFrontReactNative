import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: ArenaColors.brand.primary,
  },
  info: {
    flex: 1,
    gap: ArenaSpacing.micro,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    flexWrap: 'wrap',
  },
  name: {
    color: ArenaColors.neutral.light,
  },
  username: {
    color: ArenaColors.neutral.medium,
  },
  organizerBadge: {
    backgroundColor: ArenaColors.brand.primary,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.micro,
    borderRadius: ArenaBorders.radius.sm,
  },
  organizerBadgeText: {
    color: ArenaColors.neutral.light,
  },
  statusBadge: {
    backgroundColor: ArenaColors.neutral.dark,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.micro,
    borderRadius: ArenaBorders.radius.sm,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkSubtleBorder,
  },
  statusBadgeText: {
    color: ArenaColors.neutral.medium,
  },
});
