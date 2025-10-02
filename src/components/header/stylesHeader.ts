import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    paddingTop: ArenaSpacing['4xl'] + 10,
    paddingBottom: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.lg,
    shadowColor: ArenaColors.neutral.darkest,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
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
    padding: ArenaSpacing.sm,
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
    width: 32,
    height: 32,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: ArenaColors.text.inverse,
    fontWeight: ArenaTypography.weight.semibold,
    fontSize: ArenaTypography.size.sm,
  },
  menuTrigger: {
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.lg,
  },
  menuIconContainer: {
    gap: ArenaSpacing.xs,
  },
  menuIconBar: {
    width: 20,
    height: 2,
    backgroundColor: ArenaColors.text.inverse,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.md,
  },
  menuButtonText: {
    color: ArenaColors.text.inverse,
  },
});
