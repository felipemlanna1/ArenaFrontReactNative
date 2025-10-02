import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';
export const styles = StyleSheet.create({
  header: {
    paddingBottom: ArenaSpacing.xl,
    marginBottom: ArenaSpacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: `${ArenaColors.neutral.medium}20`,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ArenaSpacing.md,
  },
  headerContent: {
    alignItems: 'center',
  },
});
