import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: ArenaSpacing.lg,
  },
  content: {
    flex: 1,
    paddingVertical: ArenaSpacing['3xl'],
    justifyContent: 'center',
  },
  contentTop: {
    justifyContent: 'flex-start',
    paddingTop: ArenaSpacing['4xl'],
  },
});
