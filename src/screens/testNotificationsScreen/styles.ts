import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  content: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
  },
  title: {
    marginBottom: ArenaSpacing.md,
  },
  description: {
    marginBottom: ArenaSpacing['2xl'],
  },
  section: {
    marginBottom: ArenaSpacing['2xl'],
  },
  sectionTitle: {
    marginBottom: ArenaSpacing.md,
  },
  button: {
    marginBottom: ArenaSpacing.md,
  },
  note: {
    marginTop: ArenaSpacing.lg,
    textAlign: 'center',
  },
});
