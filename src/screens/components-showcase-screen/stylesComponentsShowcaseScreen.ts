import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.xl,
  },
  flatListContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.xl,
  },
  sectionHeader: {
    marginBottom: ArenaSpacing.lg,
    marginTop: ArenaSpacing.xl,
  },
  section: {
    marginBottom: ArenaSpacing.xl,
    gap: ArenaSpacing.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ArenaSpacing['4xl'],
  },
  emptyIcon: {
    marginBottom: ArenaSpacing.xl,
    opacity: 0.5,
  },
  emptyContent: {
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandShowcase: {
    backgroundColor: ArenaColors.neutral.light,
    borderRadius: ArenaSpacing.md,
    padding: ArenaSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: ArenaSpacing.md,
    flexWrap: 'wrap',
  },
  brandColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.lg,
  },
  buttonShowcase: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaSpacing.md,
    padding: ArenaSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.md,
    flexWrap: 'wrap',
  },
  buttonColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.md,
    width: '100%',
  },
});
