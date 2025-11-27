import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders, ArenaSizes } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ArenaSizes.gradientHeight,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  placeholderIcon: {
    width: ArenaSpacing['10xl'],
    height: ArenaSpacing['10xl'],
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: ArenaSizes.avatarMedium,
  },
  privacyBadge: {
    position: 'absolute',
    top: ArenaSpacing.lg,
    left: ArenaSpacing.lg,
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    backgroundColor: ArenaColors.neutral.darkMedium,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.lightSubtle15,
  },
  privacyBadgeText: {
    color: ArenaColors.neutral.light,
  },
});
