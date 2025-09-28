import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

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
});