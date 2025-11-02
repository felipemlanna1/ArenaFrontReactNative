import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: 1,
    borderColor: ArenaColors.neutral.darkest,
  },
  avatar: {
    width: ArenaSpacing['4xl'],
    height: ArenaSpacing['4xl'],
    borderRadius: ArenaSpacing['2xl'],
    backgroundColor: ArenaColors.neutral.darkest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    gap: ArenaSpacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: ArenaSpacing.xs,
  },
  iconButton: {
    padding: ArenaSpacing.xs,
  },
});
