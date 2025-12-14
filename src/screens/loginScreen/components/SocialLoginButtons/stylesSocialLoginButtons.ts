import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: ArenaSpacing.md,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.md,
    width: '100%',
  },
  socialButton: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
