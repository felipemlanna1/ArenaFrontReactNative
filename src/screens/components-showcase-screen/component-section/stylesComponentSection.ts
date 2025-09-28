import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: ArenaSpacing['3xl'],
  },

  sectionHeader: {
    marginBottom: ArenaSpacing.lg,
  },

  sectionTitle: {
    // Styles will be defined by the Text component variant
  },

  sectionContent: {
    gap: ArenaSpacing.lg,
  },
});