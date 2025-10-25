import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: ArenaSpacing['4xl'],
  },
  contentContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    gap: ArenaSpacing.lg,
  },
  section: {
    gap: ArenaSpacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  membersList: {
    gap: ArenaSpacing.sm,
  },
  actions: {
    padding: ArenaSpacing.lg,
    gap: ArenaSpacing.sm,
  },
});
