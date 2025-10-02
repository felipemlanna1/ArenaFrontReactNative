import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaBorders, ArenaTypography } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.pill,
    gap: ArenaSpacing.xs,
  },
  text: {
    color: '#FFFFFF',
    fontSize: ArenaTypography.size.xs,
    fontWeight: ArenaTypography.weight.bold,
    letterSpacing: 0.5,
  },
});
