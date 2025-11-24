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
    gap: ArenaSpacing.none,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.sm,
    gap: ArenaSpacing.xs,
  },
  statDivider: {
    width: ArenaBorders.width.thin,
    height: '100%',
    backgroundColor: `${ArenaColors.neutral.dark}33`,
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
