import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    marginBottom: ArenaSpacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: ArenaSpacing['5xl'],
    paddingHorizontal: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.dark,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
    borderRadius: ArenaBorders.radius.md,
  },
  inputContainerError: {
    borderColor: ArenaColors.semantic.error,
  },
  inputContainerDisabled: {
    opacity: 0.5,
    backgroundColor: ArenaColors.neutral.dark,
  },
  placeholder: {
    flex: 1,
  },
  iconContainer: {
    marginLeft: ArenaSpacing.xs,
  },
  errorText: {
    marginTop: ArenaSpacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    maxHeight: '85%',
    backgroundColor: ArenaColors.neutral.darkest,
    borderTopLeftRadius: ArenaBorders.radius.xl,
    borderTopRightRadius: ArenaBorders.radius.xl,
    overflow: 'hidden',
  },
  modalHeader: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.dark,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.darkSubtleBorder,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: ArenaSpacing.sm,
  },
  closeButton: {
    padding: ArenaSpacing.xs,
  },
  searchContainer: {
    marginTop: ArenaSpacing.sm,
  },
  statesList: {
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.lg,
  },
  stateItem: {
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.md,
    marginBottom: ArenaSpacing.xs,
  },
  stateItemPressed: {
    backgroundColor: ArenaColors.neutral.dark,
  },
  stateItemSelected: {
    backgroundColor: ArenaColors.brand.primarySubtle,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.brand.primary,
  },
  stateInfo: {
    flex: 1,
  },
  checkIcon: {
    marginLeft: ArenaSpacing.sm,
  },
  loadingContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    paddingHorizontal: ArenaSpacing.lg,
    alignItems: 'center',
  },
  emptyIcon: {
    marginBottom: ArenaSpacing.md,
  },
});
