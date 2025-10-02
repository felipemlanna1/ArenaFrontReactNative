import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    padding: ArenaSpacing.lg,
    marginBottom: ArenaSpacing.md,
    minHeight: 100,
  },
  selectedContainer: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: `${ArenaColors.brand.primary}15`,
  },
  iconContainer: {
    marginRight: ArenaSpacing.lg,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  label: {
    marginBottom: ArenaSpacing.xs,
  },
  labelSelected: {
    color: ArenaColors.brand.primary,
  },
  description: {
    fontSize: 14,
  },
  descriptionSelected: {
    color: ArenaColors.brand.primary,
    opacity: 0.8,
  },
});
