import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: ArenaSpacing.lg,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
});
