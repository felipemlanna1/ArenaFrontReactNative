import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: ArenaSpacing['5xl'],
    height: ArenaSpacing['5xl'],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: ArenaSpacing.xs,
  },
  disabled: {
    opacity: 0.5,
  },
});
