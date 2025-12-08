import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.semantic.warningSubtle,
    borderRadius: ArenaBorders.radius.xl,
    padding: ArenaSpacing.md,
    marginHorizontal: ArenaSpacing.lg,
    marginVertical: ArenaSpacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  iconContainer: {
    width: ArenaSpacing['3xl'] + ArenaSpacing.sm,
    height: ArenaSpacing['3xl'] + ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius['3xl'],
    backgroundColor: ArenaColors.semantic.warning,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    gap: ArenaSpacing.xs,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
