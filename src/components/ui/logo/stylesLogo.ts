import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';
export const logoSizes = {
  xs: { width: ArenaSpacing['6xl'] - ArenaSpacing.xs, height: ArenaSpacing.lg },
  sm: {
    width: ArenaSpacing['8xl'] - ArenaSpacing.xs,
    height: ArenaSpacing['2xl'],
  },
  md: { width: ArenaSpacing['9xl'], height: ArenaSpacing['3xl'] },
  lg: {
    width: ArenaSpacing['10xl'] + ArenaSpacing.xl,
    height: ArenaSpacing['5xl'],
  },
  xl: { width: ArenaSpacing['12xl'], height: ArenaSpacing['6xl'] },
  xxl: {
    width: ArenaSpacing['15xl'] + ArenaSpacing['4xl'],
    height: ArenaSpacing['8xl'],
  },
};
export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
