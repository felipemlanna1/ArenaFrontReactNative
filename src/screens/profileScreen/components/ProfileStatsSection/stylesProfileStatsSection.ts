import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    marginTop: ArenaSpacing['2xl'],
    paddingHorizontal: ArenaSpacing.lg,
  },
  sectionTitle: {
    marginBottom: ArenaSpacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkSubtleBorder,
    padding: ArenaSpacing.md,
    gap: ArenaSpacing.xs,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  statValue: {},
  statLabel: {},
  loadingContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
  },
});
