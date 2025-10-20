import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

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
    width: ArenaSpacing.sm,
    height: ArenaSpacing.sm,
    borderRadius: ArenaSpacing.xs,
    backgroundColor: ArenaColors.neutral.medium,
    marginHorizontal: ArenaSpacing.xs,
  },
  dotActive: {
    backgroundColor: ArenaColors.brand.primary,
    width: ArenaSpacing['2xl'],
  },
  dotCompleted: {
    backgroundColor: ArenaColors.brand.primary,
  },
  numberContainer: {
    width: ArenaSpacing['3xl'],
    height: ArenaSpacing['3xl'],
    borderRadius: ArenaSpacing.lg,
    backgroundColor: ArenaColors.neutral.dark,
    borderWidth: ArenaSpacing.micro,
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
    color: ArenaColors.neutral.medium,
  },
  numberTextActive: {
    color: ArenaColors.neutral.darkest,
  },
  numberTextCompleted: {
    color: ArenaColors.neutral.darkest,
  },
  connector: {
    width: ArenaSpacing['2xl'],
    height: ArenaSpacing.micro,
    backgroundColor: ArenaColors.neutral.medium,
    marginHorizontal: ArenaSpacing.xs,
  },
  connectorCompleted: {
    backgroundColor: ArenaColors.brand.primary,
  },
  label: {
    color: ArenaColors.neutral.medium,
    marginTop: ArenaSpacing.xs,
    textAlign: 'center',
  },
  labelActive: {
    color: ArenaColors.brand.primary,
  },
  labelCompleted: {
    color: ArenaColors.neutral.light,
  },
});
