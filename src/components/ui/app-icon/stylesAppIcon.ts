import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaBorders } from '@/constants';
export const appIconSizes = {
  xs: { size: 32 },
  sm: { size: 48 },
  md: { size: 64 },
  lg: { size: 96 },
  xl: { size: 128 },
  xxl: { size: 180 },
};
export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ArenaBorders.radius.xl,
  },
});
