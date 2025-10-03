import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';
export const symbolSizes = {
  xs: { width: ArenaSpacing.lg, height: ArenaSpacing.lg },
  sm: { width: ArenaSpacing['2xl'], height: ArenaSpacing['2xl'] },
  md: { width: ArenaSpacing['3xl'], height: ArenaSpacing['3xl'] },
  lg: { width: ArenaSpacing['5xl'], height: ArenaSpacing['5xl'] },
  xl: { width: ArenaSpacing['6xl'], height: ArenaSpacing['6xl'] },
  xxl: { width: ArenaSpacing['8xl'], height: ArenaSpacing['8xl'] },
};
export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
