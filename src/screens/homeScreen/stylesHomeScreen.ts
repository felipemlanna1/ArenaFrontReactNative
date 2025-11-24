import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

interface Styles {
  filterBarContainer: ViewStyle;
  content: ViewStyle;
  listWrapper: ViewStyle;
  list: ViewStyle;
  listContainer: ViewStyle;
  loadingContainer: ViewStyle;
  emptyContainer: ViewStyle;
  emptyIcon: ViewStyle;
  emptyTitle: TextStyle;
  emptyText: TextStyle;
  footer: ViewStyle;
  errorContainer: ViewStyle;
  errorText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  filterBarContainer: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  content: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  loadingContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing['2xl'],
    paddingVertical: ArenaSpacing['4xl'],
  },
  emptyIcon: {
    marginBottom: ArenaSpacing.lg,
  },
  emptyTitle: {
    color: ArenaColors.neutral.light,
    marginBottom: ArenaSpacing.md,
    textAlign: 'center',
  },
  emptyText: {
    color: ArenaColors.neutral.medium,
    textAlign: 'center',
  },
  footer: {
    paddingVertical: ArenaSpacing.lg,
    alignItems: 'center',
  },
  errorContainer: {
    position: 'absolute',
    bottom: ArenaSpacing.lg,
    left: ArenaSpacing.lg,
    right: ArenaSpacing.lg,
    backgroundColor: ArenaColors.semantic.error,
    padding: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.md,
  },
  errorText: {
    color: ArenaColors.text.inverse,
    textAlign: 'center',
  },
});
