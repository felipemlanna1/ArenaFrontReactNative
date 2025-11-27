import { StyleSheet, Dimensions } from 'react-native';
import { ArenaColors } from '@/constants';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  logoContainer: {
    zIndex: ArenaSpacing.sm,
    width: width * 0.7,
    maxWidth: 400,
  },
  ball: {
    position: 'absolute',
    zIndex: 1,
  },
});
