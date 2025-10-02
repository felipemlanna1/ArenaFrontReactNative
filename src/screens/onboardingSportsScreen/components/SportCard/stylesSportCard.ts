import { StyleSheet, Dimensions } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

const { width } = Dimensions.get('window');
const cardWidth = (width - ArenaSpacing.lg * 2 - ArenaSpacing.md * 2) / 3;

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ArenaSpacing.xs,
  },
  iconUnselected: {
    opacity: 0.6,
  },
  icon: {
    width: '70%',
    height: '70%',
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
    color: ArenaColors.neutral.light,
  },
  labelSelected: {
    color: ArenaColors.brand.primary,
  },
});
