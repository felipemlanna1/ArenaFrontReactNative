import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing['2xl'],
  },
  section: {
    gap: ArenaSpacing.lg,
  },
  durationContainer: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  toggleButton: {
    alignSelf: 'flex-start',
    paddingVertical: ArenaSpacing.sm,
  },
  toggleText: {
    color: ArenaColors.brand.primary,
  },
  errorText: {
    color: ArenaColors.semantic.error,
    marginTop: ArenaSpacing.xs,
  },
  editModeText: {
    marginTop: ArenaSpacing.sm,
    textAlign: 'center',
  },
});
