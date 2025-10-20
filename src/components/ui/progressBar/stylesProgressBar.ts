import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaBorders, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    width: '100%',
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: ArenaColors.brand.primary,
    borderRadius: ArenaBorders.radius.pill,
  },
  percentageContainer: {
    alignItems: 'flex-end',
    marginTop: ArenaSpacing.xs,
  },
  percentageText: {
    color: ArenaColors.neutral.medium,
  },
});
