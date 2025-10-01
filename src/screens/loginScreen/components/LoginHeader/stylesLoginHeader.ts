import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: ArenaSpacing['3xl'],
  },
  textContainer: {
    alignItems: 'center',
  },
  subtitleOverride: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.sm,
  },
});
