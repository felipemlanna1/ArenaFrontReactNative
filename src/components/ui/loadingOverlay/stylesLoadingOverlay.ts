import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

const BACKDROP_OPACITY = 0.8;
const LOADING_CARD_MIN_WIDTH = 200;
const PROGRESS_BAR_WIDTH = 200;
const PROGRESS_BAR_HEIGHT = 4;

export const styles = StyleSheet.create({
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `${ArenaColors.neutral.darkest}${Math.round(
      BACKDROP_OPACITY * 255
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
    minWidth: LOADING_CARD_MIN_WIDTH,
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
    width: PROGRESS_BAR_WIDTH,
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: PROGRESS_BAR_HEIGHT,
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
