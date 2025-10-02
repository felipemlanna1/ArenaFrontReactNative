import { StyleSheet, Dimensions } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
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
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: ArenaSpacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ArenaSpacing.md,
  },
  selectedContainer: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: `${ArenaColors.brand.primary}15`,
  },
  iconContainer: {
    width: iconSize,
    height: iconSize,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ArenaSpacing.xs,
  },
  iconUnselected: {
    opacity: 0.3,
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
  label: {
    textAlign: 'center',
    fontSize: ArenaTypography.size.xs,
    color: ArenaColors.neutral.light,
  },
  labelUnselected: {
    opacity: 0.3,
  },
  labelSelected: {
    color: ArenaColors.brand.primary,
    fontWeight: ArenaTypography.weight.semibold,
  },
});
