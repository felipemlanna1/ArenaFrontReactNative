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
    fontFamily: 'Inter-Regular',
    includeFontPadding: false,
  },
  checkIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  cardContainer: {
    width: '100%',
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLabel: {
    textAlign: 'center',
    includeFontPadding: false,
    fontFamily: 'Inter-Regular',
  },
});
