import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

const FAB_SIZE = 56;
const FAB_POSITION = 24;
const BACK_BUTTON_SIZE = 44;
const BACK_BUTTON_TOP = 48;
const CONTENT_BOTTOM_PADDING = 100;
const SHADOW_OFFSET_HEIGHT = 4;
const SHADOW_RADIUS = 8;
const SHADOW_OPACITY = 0.3;
const GRADIENT_HEIGHT = 200;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ArenaColors.neutral.darkest,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
    backgroundColor: ArenaColors.neutral.darkest,
    gap: ArenaSpacing.lg,
  },
  errorText: {
    textAlign: 'center',
  },
  contentContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingBottom: CONTENT_BOTTOM_PADDING,
  },
  backButton: {
    position: 'absolute',
    top: BACK_BUTTON_TOP,
    left: ArenaSpacing.lg,
    width: BACK_BUTTON_SIZE,
    height: BACK_BUTTON_SIZE,
    borderRadius: ArenaBorders.radius['3xl'],
    backgroundColor: ArenaColors.neutral.darkMedium,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  fab: {
    position: 'absolute',
    right: FAB_POSITION,
    bottom: FAB_POSITION,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: ArenaColors.neutral.darkest,
    shadowOffset: {
      width: 0,
      height: SHADOW_OFFSET_HEIGHT,
    },
    shadowOpacity: SHADOW_OPACITY,
    shadowRadius: SHADOW_RADIUS,
  },
  friendshipActionsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkest,
    borderTopWidth: 1,
    borderTopColor: ArenaColors.neutral.dark,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: GRADIENT_HEIGHT,
    zIndex: -1,
  },
});
