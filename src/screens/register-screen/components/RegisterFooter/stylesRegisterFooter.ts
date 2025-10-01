import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaTypography } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: ArenaSpacing.xl,
    alignItems: 'center',
  },
  loginText: {
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.neutral.medium,
  },
});
