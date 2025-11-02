import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing.xl,
  },
  section: {
    marginBottom: ArenaSpacing.md,
  },
  sectionDivider: {
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.dark,
    marginVertical: ArenaSpacing.sm,
  },
  footer: {
    paddingHorizontal: ArenaSpacing.md,
    paddingBottom: ArenaSpacing.md,
    marginTop: ArenaSpacing.md,
    marginBottom: ArenaSpacing.xl,
    marginHorizontal: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkest,
    borderTopWidth: 1,
    borderTopColor: ArenaColors.neutral.dark,
  },
  checkboxContainer: {
    marginVertical: ArenaSpacing.sm,
  },
  locationInputs: {
    gap: ArenaSpacing.sm,
  },
});
