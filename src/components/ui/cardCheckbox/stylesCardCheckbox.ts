import { StyleSheet } from 'react-native';
import {
  ArenaSpacing,
  ArenaColors,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

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
  },
  containerChecked: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
  },
  label: {
    fontSize: ArenaTypography.size.sm,
    fontWeight: ArenaTypography.weight.medium,
    color: ArenaColors.neutral.light,
    textAlign: 'center',
  },
});
