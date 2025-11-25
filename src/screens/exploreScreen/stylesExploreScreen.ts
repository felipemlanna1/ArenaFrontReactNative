import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

interface Styles {
  content: ViewStyle;
  listWrapper: ViewStyle;
  list: ViewStyle;
  listContainer: ViewStyle;
  loadingContainer: ViewStyle;
  emptyContainer: ViewStyle;
  emptyIcon: ViewStyle;
  emptyTitle: TextStyle;
  emptyText: TextStyle;
  emptyActionsContainer: ViewStyle;
  emptySocialProof: TextStyle;
  footer: ViewStyle;
  errorContainer: ViewStyle;
  errorText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
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
    flex: 1,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.lg,
  },
  emptyContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing['2xl'],
    paddingVertical: ArenaSpacing['2xl'],
  },
  emptyIcon: {
    opacity: 0.6,
    marginBottom: ArenaSpacing.md,
  },
  emptyTitle: {
    color: ArenaColors.neutral.light,
    textAlign: 'center',
    marginBottom: ArenaSpacing.sm,
  },
  emptyText: {
    color: ArenaColors.neutral.medium,
    textAlign: 'center',
    marginBottom: ArenaSpacing.md,
  },
  emptyActionsContainer: {
    width: '100%',
    gap: ArenaSpacing.md,
    marginTop: ArenaSpacing.md,
  },
  emptySocialProof: {
    color: ArenaColors.neutral.medium,
    textAlign: 'center',
    marginTop: ArenaSpacing.lg,
    opacity: 0.7,
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
