import { StyleSheet } from 'react-native';
import { ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: ArenaColors.backdrop.moderate,
    zIndex: 1,
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
});
