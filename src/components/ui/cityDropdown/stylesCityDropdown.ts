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
    height: 48,
    paddingHorizontal: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.dark,
    borderWidth: 1,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    overflow: 'hidden',
  },
  modalHeader: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.medium,
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
  citiesList: {
    paddingVertical: ArenaSpacing.xs,
  },
  cityItem: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  cityItemPressed: {
    backgroundColor: ArenaColors.neutral.dark,
  },
  cityItemSelected: {
    backgroundColor: ArenaColors.brand.primary,
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
