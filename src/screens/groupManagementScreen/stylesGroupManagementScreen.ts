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
  header: {
    padding: ArenaSpacing.lg,
  },
  list: {
    flex: 1,
    paddingHorizontal: ArenaSpacing.lg,
  },
  listContent: {
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.sm,
  },
});
