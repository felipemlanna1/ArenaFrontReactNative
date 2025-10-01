import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  topSymbol: {
    position: 'absolute',
    top: ArenaSpacing.xl,
    left: ArenaSpacing.lg,
    zIndex: 10,
  },
});
