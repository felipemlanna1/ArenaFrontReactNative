import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  topSymbol: {
    position: 'absolute',
    top: ArenaSpacing['3xl'] + 20,
    left: ArenaSpacing.lg,
    zIndex: 10,
  },
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing['4xl'],
    paddingBottom: ArenaSpacing.md,
  },
});
