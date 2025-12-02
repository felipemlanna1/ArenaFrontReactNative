import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.xs,
  },
  starsRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.xs,
  },
  label: {
    textAlign: 'center',
  },
});
