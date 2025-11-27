import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: ArenaSpacing['2xl'],
  },
  title: {
    textAlign: 'center',
    marginTop: ArenaSpacing.md,
    marginBottom: ArenaSpacing.xs,
  },
  date: {
    textAlign: 'center',
  },
  section: {
    marginBottom: ArenaSpacing.xl,
  },
  sectionTitle: {
    marginBottom: ArenaSpacing.sm,
  },
  paragraph: {},
  footer: {
    marginTop: ArenaSpacing['2xl'],
    paddingTop: ArenaSpacing.xl,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.xs,
  },
  email: {
    textAlign: 'center',
  },
});
