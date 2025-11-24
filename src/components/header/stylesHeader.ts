import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
    paddingTop: ArenaSpacing.xl,
    paddingBottom: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.lg,
    shadowColor: ArenaColors.neutral.darkest,
    shadowOffset: { width: ArenaSpacing.none, height: ArenaSpacing.micro / 2 },
    shadowOpacity: 0.15,
    shadowRadius: ArenaSpacing.xs,
    elevation: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: ArenaSpacing['5xl'],
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  centerSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  logoContainer: {
    marginRight: ArenaSpacing.xl,
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
    flex: 1,
    justifyContent: 'flex-end',
  },
  notificationButton: {
    padding: ArenaSpacing.md,
    minWidth: ArenaSpacing['4.5xl'],
    minHeight: ArenaSpacing['4.5xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.pill,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  avatar: {
    width: ArenaSpacing['3xl'],
    height: ArenaSpacing['3xl'],
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTrigger: {
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.lg,
  },
  menuIconContainer: {
    gap: ArenaSpacing.xs,
  },
  menuIconBar: {
    width: ArenaSpacing.xl,
    height: ArenaSpacing.micro,
    backgroundColor: ArenaColors.text.inverse,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.md,
    minWidth: ArenaSpacing['4.5xl'],
    minHeight: ArenaSpacing['4.5xl'],
  },
  backButton: {
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.md,
    marginLeft: -ArenaSpacing.sm,
    minWidth: ArenaSpacing['4.5xl'],
    minHeight: ArenaSpacing['4.5xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
