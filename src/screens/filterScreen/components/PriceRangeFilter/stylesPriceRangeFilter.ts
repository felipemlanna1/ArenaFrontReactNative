import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    alignItems: 'flex-start',
  },
  inputWrapper: {
    flex: 1,
  },
  errorText: {
    color: ArenaColors.semantic.error,
    marginTop: ArenaSpacing.xs,
  },
});
