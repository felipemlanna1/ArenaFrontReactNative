import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaTypography,
  ArenaBorders,
  ArenaShadows,
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
    overflow: 'hidden',
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
    opacity: 0.6,
  },

  inputContainerReadonly: {
    backgroundColor: `${ArenaColors.neutral.dark}80`,
    borderColor: `${ArenaColors.neutral.medium}30`,
  },

  input: {
    flex: 1,
    fontFamily: ArenaTypography.family.ui,
    fontWeight: ArenaTypography.weight.regular,
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
    fontFamily: ArenaTypography.family.ui,
    fontWeight: ArenaTypography.weight.medium,
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
    fontFamily: ArenaTypography.family.ui,
    fontWeight: ArenaTypography.weight.regular,
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
    width: 24,
    height: 24,
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
    height: 32,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.md,
  },

  smContainer: {
    height: 36,
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.md,
  },

  mdContainer: {
    height: 44,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.lg,
  },

  lgContainer: {
    height: 52,
    paddingHorizontal: ArenaSpacing.xl,
    paddingVertical: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.xl,
  },

  xlContainer: {
    height: 60,
    paddingHorizontal: ArenaSpacing['2xl'],
    paddingVertical: ArenaSpacing.xl,
    borderRadius: ArenaBorders.radius.xl,
  },

  xsInput: {
    fontSize: ArenaTypography.size.xs,
    lineHeight: ArenaTypography.size.xs * ArenaTypography.lineHeight.tight,
  },

  smInput: {
    fontSize: ArenaTypography.size.sm,
    lineHeight: ArenaTypography.size.sm * ArenaTypography.lineHeight.tight,
  },

  mdInput: {
    fontSize: ArenaTypography.size.md,
    lineHeight: ArenaTypography.size.md * ArenaTypography.lineHeight.tight,
  },

  lgInput: {
    fontSize: ArenaTypography.size.lg,
    lineHeight: ArenaTypography.size.lg * ArenaTypography.lineHeight.tight,
  },

  xlInput: {
    fontSize: ArenaTypography.size.xl,
    lineHeight: ArenaTypography.size.xl * ArenaTypography.lineHeight.tight,
  },

  xsLabel: {
    fontSize: ArenaTypography.size.xs * 0.85,
    lineHeight: ArenaTypography.size.xs * ArenaTypography.lineHeight.tight,
    marginBottom: ArenaSpacing.xs,
  },

  smLabel: {
    fontSize: ArenaTypography.size.sm * 0.85,
    lineHeight: ArenaTypography.size.sm * ArenaTypography.lineHeight.tight,
    marginBottom: ArenaSpacing.xs,
  },

  mdLabel: {
    fontSize: ArenaTypography.size.md * 0.85,
    lineHeight: ArenaTypography.size.md * ArenaTypography.lineHeight.tight,
    marginBottom: ArenaSpacing.sm,
  },

  lgLabel: {
    fontSize: ArenaTypography.size.lg * 0.85,
    lineHeight: ArenaTypography.size.lg * ArenaTypography.lineHeight.tight,
    marginBottom: ArenaSpacing.sm,
  },

  xlLabel: {
    fontSize: ArenaTypography.size.xl * 0.85,
    lineHeight: ArenaTypography.size.xl * ArenaTypography.lineHeight.tight,
    marginBottom: ArenaSpacing.md,
  },

  xsHelperText: {
    fontSize: ArenaTypography.size.xs * 0.9,
    lineHeight:
      ArenaTypography.size.xs * ArenaTypography.lineHeight.comfortable,
    marginTop: ArenaSpacing.xs,
  },

  smHelperText: {
    fontSize: ArenaTypography.size.sm * 0.9,
    lineHeight:
      ArenaTypography.size.sm * ArenaTypography.lineHeight.comfortable,
    marginTop: ArenaSpacing.xs,
  },

  mdHelperText: {
    fontSize: ArenaTypography.size.md * 0.9,
    lineHeight:
      ArenaTypography.size.md * ArenaTypography.lineHeight.comfortable,
    marginTop: ArenaSpacing.sm,
  },

  lgHelperText: {
    fontSize: ArenaTypography.size.lg * 0.9,
    lineHeight:
      ArenaTypography.size.lg * ArenaTypography.lineHeight.comfortable,
    marginTop: ArenaSpacing.sm,
  },

  xlHelperText: {
    fontSize: ArenaTypography.size.xl * 0.9,
    lineHeight:
      ArenaTypography.size.xl * ArenaTypography.lineHeight.comfortable,
    marginTop: ArenaSpacing.md,
  },

  xsIcon: {},
  smIcon: {},
  mdIcon: {},
  lgIcon: {},
  xlIcon: {},

  shadow: {
    ...ArenaShadows.input,
  },

  shadowFocused: {
    ...ArenaShadows.inputFocused,
  },

  shadowError: {
    shadowColor: ArenaColors.semantic.error,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
});
