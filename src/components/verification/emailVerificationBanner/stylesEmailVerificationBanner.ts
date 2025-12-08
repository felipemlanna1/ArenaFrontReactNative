import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.semantic.warningLight,
    borderRadius: 12,
    padding: ArenaSpacing.md,
    marginHorizontal: ArenaSpacing.lg,
    marginVertical: ArenaSpacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
