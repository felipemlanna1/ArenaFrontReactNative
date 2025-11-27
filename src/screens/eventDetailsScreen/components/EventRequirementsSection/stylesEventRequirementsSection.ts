import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.md,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },

  listContainer: {
    gap: ArenaSpacing.sm,
  },

  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
  },

  checkbox: {
    width: ArenaSpacing.xl,
    height: ArenaSpacing.xl,
    borderRadius: ArenaBorders.radius.sm,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: ArenaSpacing.xxs,
  },

  requirementText: {
    flex: 1,
  },
});
