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
  scrollContent: {
    paddingBottom: ArenaSpacing['4xl'],
  },
  coverImage: {
    width: '100%',
    height: ArenaSpacing['12xl'],
    backgroundColor: ArenaColors.neutral.darkest,
  },
  header: {
    padding: ArenaSpacing.lg,
    gap: ArenaSpacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  sportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.xs,
  },
  section: {
    padding: ArenaSpacing.lg,
    gap: ArenaSpacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  membersList: {
    gap: ArenaSpacing.sm,
  },
  actions: {
    padding: ArenaSpacing.lg,
    gap: ArenaSpacing.sm,
  },
});
