import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

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

  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
  },

  bullet: {
    width: ArenaSpacing.xs,
    height: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.medium,
    marginTop: ArenaSpacing.sm,
  },

  ruleText: {
    flex: 1,
  },
});
