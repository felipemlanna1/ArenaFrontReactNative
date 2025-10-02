import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  scrollContent: {
    paddingBottom: ArenaSpacing.xl,
  },
  section: {
    marginBottom: ArenaSpacing.md,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: ArenaColors.neutral.dark,
    marginVertical: ArenaSpacing.sm,
  },
  footer: {
    paddingHorizontal: ArenaSpacing.md,
    paddingBottom: ArenaSpacing.md,
    marginBottom: ArenaSpacing.lg,
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
