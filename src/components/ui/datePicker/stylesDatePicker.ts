import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaOpacity,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ArenaColors.neutral.dark,
    borderWidth: ArenaBorders.width.thin,
    borderColor: `${ArenaColors.neutral.medium}4D`,
    borderRadius: ArenaBorders.radius.md,
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
    minHeight: ArenaSpacing['5xl'],
  },
  inputContainerFocused: {
    borderColor: ArenaColors.brand.primary,
    borderWidth: ArenaBorders.width.medium,
  },
  inputContainerDisabled: {
    backgroundColor: ArenaColors.disabled.surface,
    borderColor: ArenaColors.disabled.border,
    opacity: ArenaOpacity.strong,
  },
  inputContainerError: {
    borderColor: ArenaColors.semantic.error,
    borderWidth: ArenaBorders.width.medium,
  },
  value: {
    color: ArenaColors.neutral.light,
    flex: 1,
  },
  placeholder: {
    color: ArenaColors.neutral.medium,
    flex: 1,
  },
  icon: {
    marginLeft: ArenaSpacing.sm,
  },
  iconActive: {
    marginLeft: ArenaSpacing.sm,
  },
  error: {
    color: ArenaColors.semantic.error,
    marginTop: ArenaSpacing.xs,
  },
  helperText: {
    color: ArenaColors.neutral.medium,
    marginTop: ArenaSpacing.xs,
  },
});
