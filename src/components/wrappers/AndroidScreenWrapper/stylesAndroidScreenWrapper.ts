import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: ArenaSpacing['2xl'],
  },
});
