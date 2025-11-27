import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  topSymbol: {
    position: 'absolute',
    top: ArenaSpacing['3xl'] + 20,
    left: ArenaSpacing.lg,
    zIndex: ArenaSpacing.sm,
  },
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing['4xl'],
    paddingBottom: ArenaSpacing.md,
  },
});
