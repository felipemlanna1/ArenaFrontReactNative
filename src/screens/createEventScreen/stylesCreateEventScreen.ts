import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  header: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: ArenaBorders.width.thin,
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
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.lg,
  },
  footer: {
    paddingTop: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing.md,
    gap: ArenaSpacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  loadingContainer: {
    marginTop: ArenaSpacing.md,
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
