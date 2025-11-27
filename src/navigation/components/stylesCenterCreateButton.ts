import { StyleSheet, Platform } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaElevations,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: ArenaSpacing.xl,
    width: ArenaSpacing['6xl'],
    height: ArenaSpacing['6xl'],
    borderRadius: ArenaBorders.radius['2xl'],
    backgroundColor: ArenaColors.brand.primary,
    borderWidth: ArenaBorders.width.thick,
    borderColor: ArenaColors.neutral.light,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: ArenaElevations.elevation3,
      android: ArenaElevations.elevation3,
      default: ArenaElevations.elevation3,
    }),
  },
});
