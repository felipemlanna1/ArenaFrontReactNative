import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderTopLeftRadius: ArenaBorders.radius['2xl'],
    borderTopRightRadius: ArenaBorders.radius['2xl'],
    paddingTop: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing.xl,
    paddingHorizontal: ArenaSpacing.md,
    gap: ArenaSpacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ArenaSpacing.sm,
  },
  section: {
    gap: ArenaSpacing.sm,
  },
  sectionLabel: {
    marginBottom: ArenaSpacing.xs,
  },
  footer: {
    marginTop: ArenaSpacing.none,
    marginBottom: ArenaSpacing.lg,
  },
});
