import { StyleSheet, Platform } from 'react-native';
import { ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: ArenaColors.brand.primary,
    borderWidth: 4,
    borderColor: ArenaColors.neutral.light,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: ArenaColors.neutral.darkest,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      default: {
        shadowColor: ArenaColors.neutral.darkest,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
    }),
  },
});
