import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.lg,
    backgroundColor: ArenaColors.neutral.dark,
    borderTopWidth: ArenaBorders.width.thin,
    borderBottomWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkIntermediate,
  },
  sectionTitle: {
    marginBottom: ArenaSpacing.md,
  },
  descriptionContainer: {
    position: 'relative',
  },
  content: {
    paddingTop: ArenaSpacing.sm,
  },
  text: {
    color: ArenaColors.neutral.light,
  },
  fadeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: ArenaSpacing['3xl'],
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ArenaSpacing.sm,
    gap: ArenaSpacing.xs,
  },
  toggleText: {
    color: ArenaColors.brand.primary,
  },
});
