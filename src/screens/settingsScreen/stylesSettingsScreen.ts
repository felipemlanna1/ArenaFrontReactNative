import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
    gap: ArenaSpacing.lg,
  },
  section: {
    gap: ArenaSpacing.sm,
  },
  sectionTitle: {
    marginBottom: ArenaSpacing.xs,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaSpacing.sm,
    gap: ArenaSpacing.sm,
  },
  settingLabel: {
    flex: 1,
  },
  destructive: {
    color: ArenaColors.semantic.error,
  },
});
