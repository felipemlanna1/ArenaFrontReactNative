import { StyleSheet, Platform } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaElevations } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: ArenaSpacing.xl,
    left: '50%',
    marginLeft: -ArenaSpacing['3xl'],
    width: ArenaSpacing['6xl'],
    height: ArenaSpacing['6xl'],
    borderRadius: ArenaSpacing['3xl'],
    backgroundColor: ArenaColors.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: ArenaElevations.elevation3,
      android: ArenaElevations.elevation3,
      default: ArenaElevations.elevation3,
    }),
  },
});
