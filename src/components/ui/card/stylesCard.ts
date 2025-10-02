import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaBorders,
  ArenaSpacing,
  ArenaShadows,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  default: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    padding: ArenaSpacing.md,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
    borderRadius: ArenaBorders.radius.md,
    padding: ArenaSpacing.md,
  },
  elevated: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    padding: ArenaSpacing.md,
    ...ArenaShadows.elevated,
  },
});
