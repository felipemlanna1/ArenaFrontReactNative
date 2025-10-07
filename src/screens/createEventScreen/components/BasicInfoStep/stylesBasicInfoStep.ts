import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders, ArenaTypography } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing['2xl'],
  },
  section: {
    gap: ArenaSpacing.lg,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.sm,
  },
  sportChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.pill,
    borderWidth: 2,
    borderColor: ArenaColors.neutral.medium,
    backgroundColor: ArenaColors.neutral.darkest,
    gap: ArenaSpacing.xs,
  },
  sportChipSelected: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
  },
  sportIcon: {
    fontSize: ArenaTypography.size.xl,
  },
  sportName: {
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.neutral.light,
  },
  sportNameSelected: {
    color: ArenaColors.brand.primary,
    fontWeight: ArenaTypography.weight.semibold,
  },
  durationContainer: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  durationChip: {
    flex: 1,
    paddingVertical: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: 2,
    borderColor: ArenaColors.neutral.medium,
    backgroundColor: ArenaColors.neutral.darkest,
    alignItems: 'center',
  },
  durationChipSelected: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
  },
  durationText: {
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.neutral.light,
  },
  durationTextSelected: {
    color: ArenaColors.brand.primary,
    fontWeight: ArenaTypography.weight.semibold,
  },
  toggleButton: {
    alignSelf: 'flex-start',
    paddingVertical: ArenaSpacing.sm,
  },
  toggleText: {
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.brand.primary,
    fontWeight: ArenaTypography.weight.semibold,
  },
  errorText: {
    fontSize: ArenaTypography.size.xs,
    color: ArenaColors.semantic.error,
    marginTop: ArenaSpacing.xs,
  },
});
