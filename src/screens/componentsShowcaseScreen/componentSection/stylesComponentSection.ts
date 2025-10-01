import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaBorders, ArenaColors } from '@/constants';
export const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: ArenaSpacing['3xl'],
  },
  sectionHeader: {
    marginBottom: ArenaSpacing.lg,
  },
  sectionTitle: {},
  sectionContent: {
    gap: ArenaSpacing.lg,
  },
  descriptionText: {
    marginTop: ArenaSpacing.xs,
  },
  copyCodeButton: {
    marginTop: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.sm,
    backgroundColor: ArenaColors.interaction.hover.neutral,
    borderRadius: ArenaBorders.radius.sm,
  },
});
