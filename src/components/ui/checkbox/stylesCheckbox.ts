import { StyleSheet } from 'react-native';
import { ArenaBorders, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    borderRadius: ArenaBorders.radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    includeFontPadding: false,
  },
  checkIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLabel: {
    textAlign: 'center',
    includeFontPadding: false,
  },
});
