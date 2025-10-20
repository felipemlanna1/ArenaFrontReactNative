import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ArenaSpacing['13xl'],
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
  placeholderText: {
    color: ArenaColors.neutral.light,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: ArenaColors.neutral.overlay,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing['5xl'],
  },
  headerButtons: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  headerButton: {
    width: ArenaSpacing['4.5xl'],
    height: ArenaSpacing['4.5xl'],
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.darkMedium,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.lightSubtle15,
  },
  sportBadgeContainer: {
    position: 'absolute',
    bottom: ArenaSpacing.lg,
    left: ArenaSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArenaColors.neutral.darkPressed,
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.pill,
    gap: ArenaSpacing.xs,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.lightMedium,
  },
  sportBadgeText: {
    color: ArenaColors.neutral.light,
    textTransform: 'uppercase',
  },
});
