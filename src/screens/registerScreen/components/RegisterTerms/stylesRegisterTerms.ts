import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ArenaSpacing.md,
    marginBottom: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
  },
  textRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: ArenaColors.neutral.medium,
  },
  link: {
    color: ArenaColors.brand.primary,
  },
});
