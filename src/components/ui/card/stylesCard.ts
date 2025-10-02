import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaBorders,
  ArenaSpacing,
  ArenaShadows,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {},
  default: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    padding: ArenaSpacing.md,
    overflow: 'hidden',
    boxShadow: ArenaShadows.card,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
    borderRadius: ArenaBorders.radius.md,
    padding: ArenaSpacing.md,
    overflow: 'hidden',
    boxShadow: ArenaShadows.soft,
  },
  elevated: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    padding: ArenaSpacing.md,
    overflow: 'hidden',
    boxShadow: ArenaShadows.elevated,
  },
});
