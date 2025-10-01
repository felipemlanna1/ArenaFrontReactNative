import { StyleSheet } from 'react-native';
import { ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
});
