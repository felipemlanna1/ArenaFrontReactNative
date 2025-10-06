import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaTypography,
  ArenaBorders,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.sm,
  },
  radioOuter: {
    width: 24, // eslint-disable-line arena/arena-design-tokens
    height: 24, // eslint-disable-line arena/arena-design-tokens
    borderRadius: ArenaBorders.radius.circle,
    borderWidth: ArenaBorders.width.thick,
    borderColor: ArenaColors.neutral.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ArenaSpacing.md,
  },
  radioInner: {
    width: 12, // eslint-disable-line arena/arena-design-tokens
    height: 12, // eslint-disable-line arena/arena-design-tokens
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primary,
  },
  label: {
    fontSize: ArenaTypography.size.md,
    color: ArenaColors.neutral.medium,
    flex: 1,
  },
  labelSelected: {
    color: ArenaColors.neutral.light,
    fontWeight: ArenaTypography.weight.semibold,
  },
});
