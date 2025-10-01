import { StyleSheet, Dimensions } from 'react-native';
import { ArenaColors } from '@/constants';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  backgroundImage: {
    opacity: 0.4,
    height: height * 0.9,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});
