import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaOpacity,
  ArenaSizes,
} from '@/constants';

export const styles = StyleSheet.create({
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${ArenaColors.neutral.darkest}${Math.round(
      ArenaOpacity.strong * 255
    )
      .toString(16)
      .padStart(2, '0')}`,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  fullscreenOverlay: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdropContainer: {
    backgroundColor: ArenaColors.neutral.dark,
    paddingHorizontal: ArenaSpacing['2xl'],
    paddingVertical: ArenaSpacing.xl,
    borderRadius: ArenaBorders.radius.lg,
    minWidth: ArenaSizes.loadingCardMinWidth,
  },
  fullscreenContainer: {
    paddingHorizontal: ArenaSpacing['2xl'],
  },
  messageText: {
    marginTop: ArenaSpacing.md,
    textAlign: 'center',
  },
  progressContainer: {
    marginTop: ArenaSpacing.md,
    width: ArenaSizes.progressBarWidth,
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: ArenaSizes.progressBarHeight,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.pill,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: ArenaColors.brand.primary,
    borderRadius: ArenaBorders.radius.pill,
  },
  progressText: {
    marginTop: ArenaSpacing.xs,
  },
  cancelButton: {
    marginTop: ArenaSpacing.md,
  },
});
