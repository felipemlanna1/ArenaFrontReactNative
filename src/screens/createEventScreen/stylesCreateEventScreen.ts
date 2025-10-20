import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  header: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: ArenaSpacing.sm,
  },
  headerTitle: {
    color: ArenaColors.neutral.light,
  },
  placeholder: {
    width: ArenaSpacing['4xl'],
  },
  progressContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.md,
  },
  content: {
    flex: 1,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  footer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderTopWidth: 1,
    borderTopColor: ArenaColors.neutral.dark,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  loadingContainer: {
    marginTop: ArenaSpacing.lg,
    alignItems: 'center',
  },
  loadingText: {
    color: ArenaColors.neutral.medium,
    marginTop: ArenaSpacing.sm,
  },
  flex1: {
    flex: 1,
  },
});
