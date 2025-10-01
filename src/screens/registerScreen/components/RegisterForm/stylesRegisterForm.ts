import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: ArenaSpacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  nameInput: {
    flex: 1,
  },
});
