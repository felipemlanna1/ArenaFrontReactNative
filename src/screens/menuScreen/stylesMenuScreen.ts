import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  avatarContainer: {
    width: ArenaSpacing['6xl'],
    height: ArenaSpacing['6xl'],
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.dark,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  userTextContainer: {
    flex: 1,
    gap: ArenaSpacing.xs,
  },
  menuContent: {
    flex: 1,
    paddingVertical: ArenaSpacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.md,
  },
  menuItemPressed: {
    backgroundColor: ArenaColors.neutral.darkest,
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  menuItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: ArenaSpacing['2xl'],
    height: ArenaSpacing['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.dark,
    marginVertical: ArenaSpacing.sm,
    marginHorizontal: ArenaSpacing.lg,
  },
  badgeContainer: {
    minWidth: ArenaSpacing.xl,
    height: ArenaSpacing.xl,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.xs,
  },
  logoutText: {
    color: ArenaColors.semantic.error,
  },
});
