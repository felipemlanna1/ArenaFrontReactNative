import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    height: ArenaSpacing['5.75xl'],
    backgroundColor: ArenaColors.neutral.darkest,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
  },
  leftSection: {
    minWidth: ArenaSpacing['8xl'],
    height: ArenaSpacing['5xl'],
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerSectionLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: ArenaSpacing.xs,
  },
  rightSection: {
    minWidth: ArenaSpacing['8xl'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: ArenaSpacing['5xl'],
  },
  backButton: {
    width: ArenaSpacing['5xl'],
    height: ArenaSpacing['5xl'],
    justifyContent: 'center',
    alignItems: 'center',
  },
});
