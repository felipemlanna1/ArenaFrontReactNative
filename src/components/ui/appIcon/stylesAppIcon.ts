import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaBorders, ArenaSpacing } from '@/constants';
export const appIconSizes = {
  xs: { size: ArenaSpacing['3xl'] },
  sm: { size: ArenaSpacing['4xl'] },
  md: { size: ArenaSpacing['5xl'] + ArenaSpacing.xs },
  lg: { size: ArenaSpacing['5xl'] + ArenaSpacing['4xl'] },
  xl: { size: ArenaSpacing['5xl'] * 2 },
  xxl: { size: ArenaSpacing['5xl'] * 3 },
};
export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ArenaBorders.radius.xl,
  },
});
