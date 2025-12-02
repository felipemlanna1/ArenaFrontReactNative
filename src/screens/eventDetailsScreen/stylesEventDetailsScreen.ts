import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  scrollContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing['4xl'],
  },
  content: {
    gap: ArenaSpacing['2xl'],
  },
  titleSection: {
    gap: ArenaSpacing.md,
  },
  title: {},
  titleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sportName: {
    color: ArenaColors.brand.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: ArenaSpacing['2xl'],
    gap: ArenaSpacing.lg,
  },
  errorText: {
    textAlign: 'center',
  },
  inviteContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing.lg,
  },
});
