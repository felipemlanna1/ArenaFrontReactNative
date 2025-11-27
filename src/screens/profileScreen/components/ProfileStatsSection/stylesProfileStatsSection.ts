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
  statsContainer: {
    gap: ArenaSpacing.lg,
  },
  statsGroup: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing.md,
    gap: ArenaSpacing.sm,
  },
  groupLabel: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    flex: 1,
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
