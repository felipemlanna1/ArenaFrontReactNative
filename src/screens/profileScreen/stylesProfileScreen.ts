import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaSizes,
  ArenaOpacity,
} from '@/constants';

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
  },
  backButton: {
    position: 'absolute',
    top: ArenaSpacing['5xl'],
    left: ArenaSpacing.lg,
    width: ArenaSizes.buttonSize,
    height: ArenaSizes.buttonSize,
    borderRadius: ArenaBorders.radius['3xl'],
    backgroundColor: ArenaColors.neutral.darkMedium,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: ArenaSpacing.sm,
  },
  fab: {
    position: 'absolute',
    right: ArenaSpacing['2xl'],
    bottom: ArenaSpacing['2xl'],
    width: ArenaSizes.fabSize,
    height: ArenaSizes.fabSize,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: ArenaSpacing.sm,
    shadowColor: ArenaColors.neutral.darkest,
    shadowOffset: {
      width: 0,
      height: ArenaSpacing.xs,
    },
    shadowOpacity: ArenaOpacity.moderate,
    shadowRadius: ArenaSpacing.sm,
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
    height: ArenaSizes.gradientHeight,
    zIndex: -1,
  },
  reputationContainer: {
    display: 'none',
  },
});
