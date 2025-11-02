import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

const FAB_SIZE = 56;
const FAB_POSITION = 24;
const BACK_BUTTON_SIZE = 40;
const BACK_BUTTON_TOP = 48;
const CONTENT_BOTTOM_PADDING = 100;
const SHADOW_OFFSET_HEIGHT = 4;
const SHADOW_RADIUS = 8;
const SHADOW_OPACITY = 0.3;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: ArenaSpacing.lg,
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
});
