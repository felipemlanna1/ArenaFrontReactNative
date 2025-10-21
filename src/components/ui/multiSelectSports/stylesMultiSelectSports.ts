import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.md,
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
    borderRadius: ArenaBorders.radius['3xl'],
    borderWidth: 1.5,
    gap: ArenaSpacing.xs,
  },
  sportChipSelected: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
  },
  sportChipUnselected: {
    borderColor: ArenaColors.neutral.dark,
    backgroundColor: 'transparent',
  },
  sportChipIcon: {
    width: ArenaTypography.size.lg,
    height: ArenaTypography.size.lg,
  },
  levelIcon: {
    marginLeft: ArenaSpacing.xs,
  },
  starButton: {
    marginLeft: ArenaSpacing.xs,
    padding: ArenaSpacing.micro,
  },
  loadingContainer: {
    paddingVertical: ArenaSpacing.lg,
    alignItems: 'center',
  },
});
