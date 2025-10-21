import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: ArenaSpacing['2xl'],
  },
  section: {
    marginBottom: ArenaSpacing.lg,
  },
  optionsGrid: {
    gap: ArenaSpacing.md,
  },
  privacyOptionCard: {
    backgroundColor: ArenaColors.neutral.dark,
    borderWidth: 2,
    borderColor: ArenaColors.neutral.darkSubtleBorder,
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing.md,
  },
  privacyOptionCardSelected: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
  },
  privacyOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ArenaSpacing.sm,
  },
  privacyOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.darkIntermediate,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: ArenaBorders.radius.circle,
    borderWidth: 2,
    borderColor: ArenaColors.neutral.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primary,
  },
  privacyOptionContent: {
    gap: ArenaSpacing.xs,
  },
  privacyOptionLabel: {
    marginBottom: ArenaSpacing.xs,
  },
  privacyOptionDescription: {
    lineHeight: 18,
  },
  groupSection: {
    marginTop: ArenaSpacing.md,
  },
  helperText: {
    marginTop: ArenaSpacing.xs,
  },
  errorText: {
    marginTop: ArenaSpacing.xs,
  },
});
