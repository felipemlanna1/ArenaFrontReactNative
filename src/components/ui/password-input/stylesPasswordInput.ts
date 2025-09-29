import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArenaColors.neutral.light,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
    paddingHorizontal: ArenaSpacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: ArenaSpacing.sm,
    fontSize: ArenaTypography.size.md,
    color: ArenaColors.text.primary,
    fontFamily: 'Inter-Regular',
  },
  toggleButton: {
    padding: ArenaSpacing.xs,
    marginLeft: ArenaSpacing.sm,
  },
  toggleIcon: {
    color: ArenaColors.neutral.medium,
  },
  focusedWrapper: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
  },
  errorWrapper: {
    borderColor: ArenaColors.semantic.error,
    backgroundColor: ArenaColors.semantic.errorSubtle,
  },
  disabledWrapper: {
    backgroundColor: ArenaColors.disabled.background,
    borderColor: ArenaColors.disabled.border,
  },
  disabledInput: {
    color: ArenaColors.disabled.text,
  },
  strengthContainer: {
    marginTop: ArenaSpacing.xs,
  },
  strengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ArenaSpacing.xs,
  },
  strengthBarContainer: {
    height: 4,
    backgroundColor: ArenaColors.neutral.light,
    borderRadius: ArenaBorders.radius.xs,
    overflow: 'hidden',
  },
  strengthBar: {
    height: '100%',
    borderRadius: ArenaBorders.radius.xs,
  },
  strengthTextXs: {
    fontSize: ArenaTypography.size.xs - 1,
  },
  strengthTextSm: {
    fontSize: ArenaTypography.size.xs,
  },
  strengthTextMd: {
    fontSize: ArenaTypography.size.sm - 1,
  },
  strengthLabel: {
    fontWeight: ArenaTypography.weight.semibold,
  },
  suggestionsContainer: {
    marginTop: ArenaSpacing.xs,
  },
  suggestionText: {
    fontSize: ArenaTypography.size.xs - 1,
    marginBottom: ArenaSpacing.xs / 2,
  },
  suggestionTextXs: {
    fontSize: ArenaTypography.size.xs - 2,
  },
  suggestionTextSm: {
    fontSize: ArenaTypography.size.xs - 1,
  },
  suggestionTextMd: {
    fontSize: ArenaTypography.size.xs,
  },
  suggestionSpacing: {
    marginTop: ArenaSpacing.xs / 3,
  },
  toggleButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonDisabled: {
    opacity: 0.5,
  },
  eyeIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIconBorder: {
    borderWidth: ArenaBorders.width.medium,
  },
  eyeIconPupil: {
    position: 'absolute',
  },
  eyeIconStrike: {
    position: 'absolute',
    height: ArenaBorders.width.medium,
  },
});
