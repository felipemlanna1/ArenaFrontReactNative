import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingBottom: ArenaSpacing['2xl'],
  },
  section: {
    marginBottom: ArenaSpacing.xl,
  },
  sectionHeader: {
    marginBottom: ArenaSpacing.sm,
  },
  sectionTitle: {
    marginBottom: ArenaSpacing.md,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.darkSubtleBorder,
  },
  optionContent: {
    flex: 1,
    marginRight: ArenaSpacing.md,
  },
  button: {
    marginTop: ArenaSpacing.xl,
  },
  warningText: {
    marginBottom: ArenaSpacing.lg,
    textAlign: 'center',
  },
  testSection: {
    marginTop: ArenaSpacing.xl,
  },
  emptyContainer: {
    padding: ArenaSpacing.xl,
    alignItems: 'center',
  },
  errorText: {
    marginTop: ArenaSpacing.md,
    textAlign: 'center',
  },
});
