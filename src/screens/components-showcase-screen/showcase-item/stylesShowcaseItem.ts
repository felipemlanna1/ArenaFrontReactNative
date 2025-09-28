import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  showcaseItem: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    padding: ArenaSpacing.lg,
    marginBottom: ArenaSpacing.md,
  },

  showcaseHeader: {
    marginBottom: ArenaSpacing.md,
  },

  showcaseContent: {
    gap: ArenaSpacing.sm,
  },
});