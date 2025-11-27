import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  sectionTitle: {
    marginBottom: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
  },
  loadingContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    paddingHorizontal: ArenaSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    paddingHorizontal: ArenaSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
  groupsList: {
    gap: ArenaSpacing.sm,
  },
  groupsScrollContainer: {
    marginTop: ArenaSpacing.sm,
    position: 'relative',
  },
  groupsScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
  },
  groupCardWrapper: {
    width: ArenaSpacing['13xl'],
  },
  divider: {
    width: ArenaBorders.width.thin,
    height: ArenaSpacing['8xl'],
    backgroundColor: ArenaColors.neutral.dark,
    marginHorizontal: ArenaSpacing.md,
  },
  scrollGradient: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: ArenaSizes.imageShowcaseSmall,
    pointerEvents: 'none',
  },
  separator: {
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.dark,
    marginVertical: ArenaSpacing.sm,
  },
});
