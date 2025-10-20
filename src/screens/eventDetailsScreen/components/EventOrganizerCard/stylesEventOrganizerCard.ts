import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing.lg,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkSubtleBorder,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  avatar: {
    width: ArenaSpacing['4.5xl'],
    height: ArenaSpacing['4.5xl'],
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: ArenaSpacing['4.5xl'],
    height: ArenaSpacing['4.5xl'],
    borderRadius: ArenaBorders.radius.circle,
  },
  info: {
    flex: 1,
    gap: ArenaSpacing.micro,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  label: {
    color: ArenaColors.neutral.light,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    color: ArenaColors.neutral.light,
    letterSpacing: -0.3,
  },
  username: {
    color: ArenaColors.neutral.medium,
  },
  badge: {
    backgroundColor: ArenaColors.brand.primarySubtle,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.micro,
    borderRadius: ArenaBorders.radius.sm,
  },
  badgeText: {
    color: ArenaColors.brand.primary,
  },
  chevron: {
    marginLeft: 'auto',
  },
});
