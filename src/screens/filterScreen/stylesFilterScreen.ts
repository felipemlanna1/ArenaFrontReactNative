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
    padding: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkest,
    borderTopWidth: 1,
    borderTopColor: ArenaColors.neutral.dark,
    gap: ArenaSpacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  footerButton: {
    flex: 1,
  },
  checkboxContainer: {
    marginVertical: ArenaSpacing.sm,
  },
  locationInputs: {
    gap: ArenaSpacing.sm,
  },
});
