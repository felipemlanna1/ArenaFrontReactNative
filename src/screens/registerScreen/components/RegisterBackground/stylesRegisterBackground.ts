import { StyleSheet, Dimensions } from 'react-native';
import { ArenaColors, ArenaShadows } from '@/constants';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
    position: 'relative',
  },
  backgroundImage: {
    opacity: 0.4,
    height: height * 1.05,
    width: '135%',
    position: 'absolute',
    bottom: -30,
    boxShadow: ArenaShadows.backgroundImage,
  },
});
