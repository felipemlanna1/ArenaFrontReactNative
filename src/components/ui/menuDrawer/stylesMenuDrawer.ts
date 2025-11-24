import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
    width: '80%',
    maxWidth: 320,
  },
  header: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  userInfo: {
    gap: ArenaSpacing.xs,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
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
    backgroundColor: ArenaColors.neutral.dark,
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
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: ArenaColors.neutral.dark,
    marginVertical: ArenaSpacing.sm,
    marginHorizontal: ArenaSpacing.lg,
  },
  badgeContainer: {
    minWidth: 20,
    height: 20,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.xs,
  },
  footer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing['2xl'],
    borderTopWidth: 1,
    borderTopColor: ArenaColors.neutral.dark,
  },
});
