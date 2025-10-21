import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.darkest,
  },
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    gap: ArenaSpacing.sm,
  },
  filterButton: {
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.pill,
    borderWidth: 1,
    borderColor: ArenaColors.neutral.medium,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  filterButtonActive: {
    backgroundColor: ArenaColors.brand.primary,
    borderColor: ArenaColors.brand.primary,
  },
});
