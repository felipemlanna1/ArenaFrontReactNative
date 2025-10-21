import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    marginTop: ArenaSpacing['2xl'],
    paddingHorizontal: ArenaSpacing.lg,
  },
  card: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkSubtleBorder,
    padding: ArenaSpacing.lg,
    gap: ArenaSpacing.md,
  },
  titleText: {
    marginBottom: ArenaSpacing.xs,
  },
  bioText: {},
  emptyState: {
    alignItems: 'center',
    paddingVertical: ArenaSpacing.lg,
    gap: ArenaSpacing.sm,
  },
  emptyText: {
    textAlign: 'center',
  },
  emptyHint: {
    textAlign: 'center',
  },
  showMoreButton: {
    alignSelf: 'flex-start',
    marginTop: ArenaSpacing.xs,
  },
});
