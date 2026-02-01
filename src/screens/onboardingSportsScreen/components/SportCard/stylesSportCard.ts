import { StyleSheet, Dimensions } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaShadows,
} from '@/constants';
import {
  CARDS_PER_ROW,
  ICON_SIZE_RATIO,
} from '@/screens/onboardingSportsScreen/constants';

const { width } = Dimensions.get('window');
const cardWidth =
  (width - ArenaSpacing.lg * 2 - ArenaSpacing.md * 2) / CARDS_PER_ROW;
const iconSize = cardWidth * ICON_SIZE_RATIO;
export const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    aspectRatio: 1,
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ArenaSpacing.md,
    position: 'relative',
  },
  unselectedContainer: {
    backgroundColor: ArenaColors.neutral.dark,
    borderWidth: 1,
    borderColor: ArenaColors.neutral.medium,
  },
  selectedContainer: {
    backgroundColor: ArenaColors.brand.primary,
    borderWidth: 0,
    boxShadow: ArenaShadows.card,
  },
  checkmarkBadge: {
    position: 'absolute',
    top: ArenaSpacing.xs,
    right: ArenaSpacing.xs,
    width: 20,
    height: 20,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.semantic.success,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  primaryBadge: {
    position: 'absolute',
    top: ArenaSpacing.xs,
    left: ArenaSpacing.xs,
    width: 18,
    height: 18,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.darkest,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  iconContainer: {
    width: iconSize,
    height: iconSize,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ArenaSpacing.xs,
  },
  iconUnselected: {
    opacity: 0.5,
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
  label: {
    textAlign: 'center',
  },
  labelSelected: {
    color: ArenaColors.neutral.light,
  },
});
