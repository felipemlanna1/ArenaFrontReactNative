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
    width: ArenaSpacing['4xl'],
    height: ArenaSpacing['4xl'],
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.darkIntermediate,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuter: {
    width: ArenaSpacing['2xl'],
    height: ArenaSpacing['2xl'],
    borderRadius: ArenaBorders.radius.circle,
    borderWidth: 2,
    borderColor: ArenaColors.neutral.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: ArenaSpacing.md,
    height: ArenaSpacing.md,
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
    marginBottom: ArenaSpacing.xs,
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
