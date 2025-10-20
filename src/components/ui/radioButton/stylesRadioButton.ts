import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaSizes,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.sm,
  },
  radioOuter: {
    width: ArenaSizes.radioOuter,
    height: ArenaSizes.radioOuter,
    borderRadius: ArenaBorders.radius.circle,
    borderWidth: ArenaBorders.width.thick,
    borderColor: ArenaColors.neutral.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ArenaSpacing.md,
  },
  radioInner: {
    width: ArenaSizes.radioInner,
    height: ArenaSizes.radioInner,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primary,
  },
  label: {
    color: ArenaColors.neutral.medium,
    flex: 1,
  },
  labelSelected: {
    color: ArenaColors.neutral.light,
  },
});
