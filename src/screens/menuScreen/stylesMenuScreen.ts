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
    paddingHorizontal: ArenaSpacing.lg,
    gap: ArenaSpacing.xs,
  },
  menuItemWrapper: {
    position: 'relative',
  },
  divider: {
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.dark,
    marginVertical: ArenaSpacing.sm,
  },
  badgeContainer: {
    position: 'absolute',
    right: ArenaSpacing.md,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
});
