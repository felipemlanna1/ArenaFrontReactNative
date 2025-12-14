import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

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
  registerButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: ArenaSpacing.lg,
  },
});
