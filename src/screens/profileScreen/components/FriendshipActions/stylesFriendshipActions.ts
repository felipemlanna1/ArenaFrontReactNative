import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    marginBottom: ArenaSpacing.md,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  buttonContainer: {
    flex: 1,
  },
});
