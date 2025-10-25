import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  sectionTitle: {
    marginBottom: ArenaSpacing.md,
  },
  loadingContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
  groupsList: {
    gap: ArenaSpacing.sm,
  },
  groupCardWrapper: {
    marginBottom: ArenaSpacing.sm,
  },
  separator: {
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.dark,
    marginVertical: ArenaSpacing.sm,
  },
});
