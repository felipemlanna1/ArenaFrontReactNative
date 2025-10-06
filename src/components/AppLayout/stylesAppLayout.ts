import { StyleSheet } from 'react-native';
import { ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  content: {
    flex: 1,
  },
  bottomNavPlaceholder: {
    height: 0,
  },
});
