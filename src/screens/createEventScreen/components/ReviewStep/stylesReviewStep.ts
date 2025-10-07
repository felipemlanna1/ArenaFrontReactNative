import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders, ArenaTypography } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing['2xl'],
  },
  previewCard: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing.lg,
    gap: ArenaSpacing.md,
  },
  previewTitle: {
    fontSize: ArenaTypography.size.xl,
    fontWeight: ArenaTypography.weight.bold,
    color: ArenaColors.neutral.light,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },
  previewLabel: {
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.neutral.medium,
  },
  previewValue: {
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.neutral.light,
    fontWeight: ArenaTypography.weight.semibold,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  accordionTitle: {
    fontSize: ArenaTypography.size.md,
    fontWeight: ArenaTypography.weight.semibold,
    color: ArenaColors.neutral.light,
  },
  accordionContent: {
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: ArenaColors.neutral.dark,
    marginVertical: ArenaSpacing.sm,
  },
});
