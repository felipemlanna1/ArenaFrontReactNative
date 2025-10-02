import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: ArenaSpacing.xl,
  },
  title: {
    marginBottom: ArenaSpacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  selectedList: {
    marginTop: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,
    borderTopWidth: 1,
    borderTopColor: `${ArenaColors.neutral.medium}33`,
  },
  selectedTitle: {
    marginBottom: ArenaSpacing.sm,
    color: ArenaColors.neutral.medium,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.sm,
  },
  loading: {
    paddingVertical: ArenaSpacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: ArenaSpacing.md,
  },
});
