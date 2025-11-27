import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.xs,
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: 1,
    borderColor: ArenaColors.neutral.darkest,
    minHeight: ArenaSpacing['4xl'],
  },
  triggerDisabled: {
    opacity: 0.5,
  },
  triggerError: {
    borderColor: ArenaColors.semantic.error,
  },
  triggerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },
  iconContainer: {
    width: ArenaSpacing['2xl'],
    height: ArenaSpacing['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: ArenaColors.neutral.dark,
    borderTopLeftRadius: ArenaBorders.radius.lg,
    borderTopRightRadius: ArenaBorders.radius.lg,
    paddingTop: ArenaSpacing.md,
    maxHeight: '70%',
  },
  modalHeader: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing.md,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.darkest,
  },
  modalList: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.sm,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.sm,
  },
  groupItemSelected: {
    backgroundColor: ArenaColors.neutral.darkest,
  },
  groupItemContent: {
    flex: 1,
  },
  emptyState: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
