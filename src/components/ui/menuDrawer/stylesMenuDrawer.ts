import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.overlay,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
    width: '80%',
    maxWidth: ArenaSpacing['15xl'],
  },
  header: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  userInfo: {
    gap: ArenaSpacing.xs,
  },
  avatarContainer: {
    width: ArenaSpacing['6xl'],
    height: ArenaSpacing['6xl'],
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ArenaSpacing.sm,
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
  footer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing['2xl'],
    borderTopWidth: ArenaBorders.width.thin,
    borderTopColor: ArenaColors.neutral.dark,
  },
  modalContainer: {
    flex: 1,
  },
  logoutText: {
    color: ArenaColors.semantic.error,
  },
});
