import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    borderRadius: ArenaBorders.radius.md,
    borderWidth: 2,
    borderColor: ArenaColors.neutral.dark,
    backgroundColor: ArenaColors.neutral.dark,
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.xs,
  },
  containerChecked: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
  },
  label: {
    color: ArenaColors.neutral.light,
    textAlign: 'center',
  },
});
