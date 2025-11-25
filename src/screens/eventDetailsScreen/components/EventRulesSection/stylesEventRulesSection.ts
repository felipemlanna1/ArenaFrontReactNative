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

  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
  },

  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ArenaColors.neutral.medium,
    marginTop: 8, // Align with text baseline
  },

  ruleText: {
    flex: 1,
  },
});
