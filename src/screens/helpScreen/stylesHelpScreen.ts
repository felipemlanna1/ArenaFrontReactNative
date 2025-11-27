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
    marginBottom: ArenaSpacing.sm,
  },
  subtitle: {
    textAlign: 'center',
  },
  section: {
    marginBottom: ArenaSpacing['2xl'],
  },
  sectionTitle: {
    marginBottom: ArenaSpacing.lg,
  },
  faqItem: {
    marginBottom: ArenaSpacing.lg,
  },
  question: {
    marginBottom: ArenaSpacing.xs,
  },
  answer: {},
  contactText: {
    marginBottom: ArenaSpacing.sm,
  },
  email: {
    marginTop: ArenaSpacing.xs,
  },
});
