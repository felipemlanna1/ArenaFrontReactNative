import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors } from '@/constants';

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
    color: ArenaColors.brand.primary,
    textAlign: 'center',
  },
  subtitle: {
    color: ArenaColors.neutral.light,
    textAlign: 'center',
  },
});
