import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaTypography } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepWrapper: {
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ArenaColors.neutral.medium,
    marginHorizontal: ArenaSpacing.xs,
  },
  dotActive: {
    backgroundColor: ArenaColors.brand.primary,
    width: 24,
  },
  dotCompleted: {
    backgroundColor: ArenaColors.brand.primary,
  },
  numberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: ArenaColors.neutral.dark,
    borderWidth: 2,
    borderColor: ArenaColors.neutral.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: ArenaSpacing.xs,
  },
  numberContainerActive: {
    backgroundColor: ArenaColors.brand.primary,
    borderColor: ArenaColors.brand.primary,
  },
  numberContainerCompleted: {
    backgroundColor: ArenaColors.brand.primary,
    borderColor: ArenaColors.brand.primary,
  },
  numberText: {
    fontSize: ArenaTypography.size.sm,
    fontWeight: ArenaTypography.weight.semibold,
    color: ArenaColors.neutral.medium,
  },
  numberTextActive: {
    color: ArenaColors.neutral.darkest,
  },
  numberTextCompleted: {
    color: ArenaColors.neutral.darkest,
  },
  connector: {
    width: 24,
    height: 2,
    backgroundColor: ArenaColors.neutral.medium,
    marginHorizontal: ArenaSpacing.xs,
  },
  connectorCompleted: {
    backgroundColor: ArenaColors.brand.primary,
  },
  label: {
    fontSize: ArenaTypography.size.xs,
    color: ArenaColors.neutral.medium,
    marginTop: ArenaSpacing.xs,
    textAlign: 'center',
  },
  labelActive: {
    color: ArenaColors.brand.primary,
    fontWeight: ArenaTypography.weight.semibold,
  },
  labelCompleted: {
    color: ArenaColors.neutral.light,
  },
});
