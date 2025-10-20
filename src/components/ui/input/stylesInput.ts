import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaShadows,
  ArenaOpacity,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  containerFullWidth: {
    position: 'relative',
    alignSelf: 'stretch',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: ArenaColors.neutral.dark,
    borderWidth: ArenaBorders.width.thin,
    borderColor: `${ArenaColors.neutral.medium}4D`,
  },

  inputContainerFocused: {
    borderColor: ArenaColors.brand.primary,
    borderWidth: ArenaBorders.width.medium,
  },

  inputContainerError: {
    borderColor: ArenaColors.semantic.error,
    borderWidth: ArenaBorders.width.medium,
  },

  inputContainerSuccess: {
    borderColor: ArenaColors.semantic.success,
    borderWidth: ArenaBorders.width.medium,
  },

  inputContainerWarning: {
    borderColor: ArenaColors.semantic.warning,
    borderWidth: ArenaBorders.width.medium,
  },

  inputContainerDisabled: {
    backgroundColor: ArenaColors.disabled.surface,
    borderColor: ArenaColors.disabled.border,
    opacity: ArenaOpacity.strong,
  },

  inputContainerReadonly: {
    backgroundColor: `${ArenaColors.neutral.dark}80`,
    borderColor: `${ArenaColors.neutral.medium}30`,
  },

  input: {
    flex: 1,
    color: ArenaColors.neutral.light,
    includeFontPadding: false,
    textAlignVertical: 'center',
    paddingHorizontal: ArenaSpacing.none,
    paddingVertical: ArenaSpacing.none,
    margin: ArenaSpacing.none,
  },

  inputDisabled: {
    color: ArenaColors.disabled.text,
  },

  inputReadonly: {
    color: `${ArenaColors.neutral.light}CC`,
  },

  placeholder: {
    color: `${ArenaColors.neutral.medium}99`,
  },

  label: {
    color: ArenaColors.neutral.light,
    includeFontPadding: false,
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
  },

  labelFloating: {
    backgroundColor: ArenaColors.neutral.dark,
    paddingHorizontal: ArenaSpacing.xs,
    zIndex: 1,
  },

  labelFocused: {
    color: ArenaColors.brand.primary,
  },

  labelError: {
    color: ArenaColors.semantic.error,
  },

  labelSuccess: {
    color: ArenaColors.semantic.success,
  },

  labelWarning: {
    color: ArenaColors.semantic.warning,
  },

  labelDisabled: {
    color: ArenaColors.disabled.text,
  },

  labelRequired: {},

  requiredAsterisk: {
    color: ArenaColors.semantic.error,
  },

  helperText: {
    color: `${ArenaColors.neutral.medium}CC`,
    includeFontPadding: false,
  },

  helperTextError: {
    color: ArenaColors.semantic.error,
  },

  helperTextSuccess: {
    color: ArenaColors.semantic.success,
  },

  helperTextWarning: {
    color: ArenaColors.semantic.warning,
  },

  helperTextDisabled: {
    color: ArenaColors.disabled.text,
  },

  leftIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ArenaSpacing.sm,
  },

  rightIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: ArenaSpacing.sm,
  },

  clearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ArenaSpacing['2xl'],
    height: ArenaSpacing['2xl'],
    borderRadius: ArenaBorders.radius.md,
    marginLeft: ArenaSpacing.sm,
  },

  clearButtonPressed: {
    backgroundColor: `${ArenaColors.neutral.medium}66`,
  },

  focusRing: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderWidth: 2,
    borderColor: ArenaColors.interaction.focus.primary,
    opacity: 0,
    pointerEvents: 'none',
  },

  loadingContainer: {
    position: 'absolute',
    right: ArenaSpacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  xsContainer: {
    height: ArenaSpacing['3xl'],
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.md,
    overflow: 'hidden',
  },

  smContainer: {
    height: ArenaSpacing['3.5xl'],
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.md,
    overflow: 'hidden',
  },

  mdContainer: {
    height: ArenaSpacing['4.5xl'],
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.lg,
    overflow: 'hidden',
  },

  lgContainer: {
    height: ArenaSpacing['5.5xl'],
    paddingHorizontal: ArenaSpacing.xl,
    paddingVertical: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.xl,
    overflow: 'hidden',
  },

  xlContainer: {
    height: ArenaSpacing['6.5xl'],
    paddingHorizontal: ArenaSpacing['2xl'],
    paddingVertical: ArenaSpacing.xl,
    borderRadius: ArenaBorders.radius.xl,
    overflow: 'hidden',
  },

  xsInput: {},
  smInput: {},
  mdInput: {},
  lgInput: {},
  xlInput: {},

  xsLabel: {
    marginBottom: ArenaSpacing.xs,
  },

  smLabel: {
    marginBottom: ArenaSpacing.xs,
  },

  mdLabel: {
    marginBottom: ArenaSpacing.sm,
  },

  lgLabel: {
    marginBottom: ArenaSpacing.sm,
  },

  xlLabel: {
    marginBottom: ArenaSpacing.md,
  },

  xsHelperText: {
    marginTop: ArenaSpacing.xs,
  },

  smHelperText: {
    marginTop: ArenaSpacing.xs,
  },

  mdHelperText: {
    marginTop: ArenaSpacing.sm,
  },

  lgHelperText: {
    marginTop: ArenaSpacing.sm,
  },

  xlHelperText: {
    marginTop: ArenaSpacing.md,
  },

  xsIcon: {},
  smIcon: {},
  mdIcon: {},
  lgIcon: {},
  xlIcon: {},

  shadow: {
    boxShadow: ArenaShadows.input,
  },

  shadowFocused: {
    boxShadow: ArenaShadows.inputFocused,
  },

  shadowError: {
    boxShadow: ArenaShadows.errorGlow,
  },
});
