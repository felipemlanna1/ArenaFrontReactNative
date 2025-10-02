import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  barContainer: {
    flex: 1,
    height: 4,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.pill,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: ArenaBorders.radius.pill,
  },
  text: {
    color: ArenaColors.text.inverse,
    fontSize: ArenaTypography.size.sm,
    fontWeight: ArenaTypography.weight.semibold,
    minWidth: 40,
    textAlign: 'right',
  },
});
