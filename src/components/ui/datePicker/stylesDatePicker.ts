import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaTypography,
  ArenaBorders,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ArenaColors.neutral.darkest,
    borderWidth: 1.5,
    borderColor: `${ArenaColors.brand.primary}66`,
    borderRadius: ArenaBorders.radius.md,
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
    minHeight: 48,
  },
  inputContainerFilled: {
    backgroundColor: ArenaColors.neutral.darkIntermediate,
  },
  inputContainerFocused: {
    borderColor: ArenaColors.brand.primary,
    borderWidth: 2,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  inputContainerDisabled: {
    opacity: 0.5,
    backgroundColor: ArenaColors.neutral.darkest,
    borderColor: `${ArenaColors.neutral.medium}66`,
  },
  inputContainerError: {
    borderColor: ArenaColors.semantic.error,
    borderWidth: 2,
  },
  value: {
    fontSize: ArenaTypography.size.md,
    color: ArenaColors.neutral.light,
    fontWeight: ArenaTypography.weight.regular,
    flex: 1,
  },
  placeholder: {
    fontSize: ArenaTypography.size.md,
    color: ArenaColors.neutral.medium,
    fontWeight: ArenaTypography.weight.regular,
    flex: 1,
  },
  icon: {
    marginLeft: ArenaSpacing.sm,
  },
  iconActive: {
    marginLeft: ArenaSpacing.sm,
  },
  error: {
    fontSize: ArenaTypography.size.xs,
    color: ArenaColors.semantic.error,
    marginTop: ArenaSpacing.xs,
  },
  helperText: {
    fontSize: ArenaTypography.size.xs,
    color: ArenaColors.neutral.medium,
    marginTop: ArenaSpacing.xs,
  },
});
