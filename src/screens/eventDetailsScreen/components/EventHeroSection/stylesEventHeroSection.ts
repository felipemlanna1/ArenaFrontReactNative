import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaSizes,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: ArenaSizes.eventHeroHeight,
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
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: ArenaSpacing['8.5xl'],
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
  statusBadge: {
    position: 'absolute',
    left: ArenaSpacing.lg,
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  statusBadgeText: {
    color: ArenaColors.neutral.light,
  },
  categoryChipsContainer: {
    position: 'absolute',
    bottom: ArenaSpacing.lg,
    right: ArenaSpacing.lg,
    flexDirection: 'row',
    gap: ArenaSpacing.xs,
  },
  categoryChip: {
    backgroundColor: ArenaColors.neutral.darkPressed,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.pill,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.lightMedium,
  },
  categoryChipText: {
    color: ArenaColors.neutral.light,
  },
});
