import { StyleSheet } from 'react-native';
import {
  ArenaSpacing,
  ArenaColors,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.dark,
    paddingVertical: ArenaSpacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.md,
    marginBottom: ArenaSpacing.xs,
  },
  chipsContainer: {
    paddingHorizontal: ArenaSpacing.md,
  },
  chipsScrollView: {
    flexGrow: 0,
  },
  chipsContent: {
    flexDirection: 'row',
    gap: ArenaSpacing.xs,
    paddingVertical: ArenaSpacing.xs,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.pill,
    paddingVertical: ArenaSpacing.xs,
    paddingLeft: ArenaSpacing.sm,
    paddingRight: ArenaSpacing.xs,
    borderWidth: 1,
    borderColor: ArenaColors.neutral.medium,
    gap: ArenaSpacing.xs,
  },
  chipLabel: {
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.neutral.light,
  },
  chipCloseButton: {
    width: 20,
    height: 20,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipCloseIcon: {
    fontSize: 12,
    lineHeight: 20,
    color: ArenaColors.neutral.darkest,
    fontWeight: '700',
    textAlign: 'center',
  },
  clearAllButton: {
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.sm,
  },
});
