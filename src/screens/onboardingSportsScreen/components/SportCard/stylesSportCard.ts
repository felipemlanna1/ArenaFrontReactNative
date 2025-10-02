import { StyleSheet, Dimensions } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

const { width } = Dimensions.get('window');
const cardWidth = (width - ArenaSpacing.lg * 2 - ArenaSpacing.md * 2) / 3;
const iconSize = cardWidth * 0.5; // 50% do card para o ícone

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
    opacity: 0.6,
  },
  icon: {
    width: iconSize,
    height: iconSize,
  },
  label: {
    textAlign: 'center',
    fontSize: 11,
    color: ArenaColors.neutral.light,
    numberOfLines: 2,
  },
  labelSelected: {
    color: ArenaColors.brand.primary,
    fontWeight: '600',
  },
});
