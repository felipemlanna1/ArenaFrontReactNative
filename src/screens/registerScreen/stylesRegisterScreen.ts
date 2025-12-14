import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing['4xl'],
    paddingBottom: ArenaSpacing.md,
  },
});
