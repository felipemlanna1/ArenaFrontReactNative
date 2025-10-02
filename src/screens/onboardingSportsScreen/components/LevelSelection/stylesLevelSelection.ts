import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: ArenaSpacing.xl,
  },
  title: {
    marginBottom: ArenaSpacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
});
